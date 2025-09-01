from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
import re
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for frontend communication
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Sample Data (from your prompt) ---
creators_db = [
  {
    "_id": "c1", "handle": "@fitwithria", "verticals": ["Fitness","Lifestyle"], "platforms": ["Instagram","YouTube"],
    "audienceGeo": {"Mumbai": 0.42, "Delhi": 0.2}, "audienceAge": {"18-24": 0.55, "25-34": 0.35}, "avgViews": 120000,
    "engagementRate": 0.047, "pastBrandCategories": ["Fashion","Wellness"], "contentTone": ["energetic","fun"],
    "safetyFlags": {"adult": False}, "basePriceINR": 80000
  },
  {
    "_id": "c2", "handle": "@techbyraj", "verticals": ["Technology","Education"], "platforms": ["YouTube","LinkedIn"],
    "audienceGeo": {"Bengaluru": 0.5, "Hyderabad": 0.2}, "audienceAge": {"18-24": 0.25, "25-34": 0.5}, "avgViews": 95000,
    "engagementRate": 0.032, "pastBrandCategories": ["EdTech","Fintech"], "contentTone": ["informative","serious"],
    "safetyFlags": {"adult": False}, "basePriceINR": 60000
  },
  {
    "_id": "c3", "handle": "@foodiesneha", "verticals": ["Food","Lifestyle"], "platforms": ["Instagram","Reels"],
    "audienceGeo": {"Delhi": 0.6, "Mumbai": 0.25}, "audienceAge": {"18-24": 0.6, "25-34": 0.3}, "avgViews": 150000,
    "engagementRate": 0.056, "pastBrandCategories": ["Food","Hospitality"], "contentTone": ["fun","casual"],
    "safetyFlags": {"adult": False}, "basePriceINR": 70000
  }
]

# --- Pydantic Models ---

class BrandBrief(BaseModel):
    category: str
    budget: float
    locations: List[str]
    ageRange: str  # e.g., "18-30"
    tone: List[str]
    platforms: List[str]

class BrandBilling(BaseModel):
    company: str
    gstin: str
    address: str
    email: str
    phone: str

class CreatorPayout(BaseModel):
    name: str
    pan: str
    upi: str
    ifsc: str

# --- Helper Functions for Scoring ---

def calculate_overlap_score(brand_list: List[str], creator_list: List[str]) -> float:
    """Calculates a simple overlap score between two lists."""
    overlap = len(set(brand_list) & set(creator_list))
    return overlap / len(brand_list) if brand_list else 0.0

def calculate_geo_score(brand_locations: List[str], creator_geo: Dict[str, float]) -> float:
    """Calculates score based on brand's target locations present in creator's audience."""
    score = 0.0
    for loc in brand_locations:
        score += creator_geo.get(loc, 0.0)
    return score

def calculate_age_score(brand_age_range: str, creator_age: Dict[str, float]) -> float:
    """Calculates overlap between brand target age and creator audience age."""
    try:
        min_brand_age, max_brand_age = map(int, brand_age_range.split('-'))
        total_overlap = 0.0
        for age_key, percentage in creator_age.items():
            min_creator_age, max_creator_age = map(int, age_key.split('-'))
            # Find overlapping age range
            overlap_min = max(min_brand_age, min_creator_age)
            overlap_max = min(max_brand_age, max_creator_age)
            if overlap_max > overlap_min:
                total_overlap += percentage
        return total_overlap
    except:
        return 0.0

def calculate_performance_score(brand_budget: float, creator_price: float, creator_er: float) -> float:
    """Simple performance score based on budget fit and engagement."""
    if creator_price > brand_budget:
        return 0.0
    # Higher score for creators well within budget and with high engagement
    budget_fit = 1 - (creator_price / brand_budget)
    return (budget_fit * 0.5) + (min(creator_er / 0.05, 1.0) * 0.5) # Normalize ER score

# --- API Endpoints ---

@app.post("/api/match")
async def match_creators(brief: BrandBrief):
    scored_creators = []

    for creator in creators_db:
        # 1. Relevance Score (40%)
        category_score = 1.0 if brief.category in creator["pastBrandCategories"] or brief.category in creator["verticals"] else 0.0
        tone_score = calculate_overlap_score(brief.tone, creator["contentTone"])
        platform_score = calculate_overlap_score(brief.platforms, creator["platforms"])
        relevance_score = (category_score * 0.5 + tone_score * 0.25 + platform_score * 0.25) * 40

        # 2. Audience Fit (30%)
        geo_score = calculate_geo_score(brief.locations, creator["audienceGeo"])
        age_score = calculate_age_score(brief.ageRange, creator["audienceAge"])
        audience_fit_score = (geo_score * 0.5 + age_score * 0.5) * 30

        # 3. Performance/Price (20%)
        performance_score = calculate_performance_score(brief.budget, creator["basePriceINR"], creator["engagementRate"]) * 20

        # 4. Constraints (10%)
        constraints_score = 10 if not creator["safetyFlags"]["adult"] else 0

        # Final Score
        total_score = relevance_score + audience_fit_score + performance_score + constraints_score
        
        reasons = []
        if geo_score > 0.4: reasons.append("Audience Fit")
        if tone_score > 0.4: reasons.append("Tone Match")
        if category_score > 0: reasons.append("Category Match")
        if performance_score > 10: reasons.append("Good Value")

        scored_creators.append({
            "creator": creator,
            "score": round(total_score),
            "reasons": reasons
        })

    # Sort by score descending
    ranked_creators = sorted(scored_creators, key=lambda x: x['score'], reverse=True)
    return ranked_creators

@app.post("/api/billing/validate")
async def validate_billing(data: BrandBilling):
    # Basic regex validation
    if not re.match(r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$", data.gstin):
        raise HTTPException(status_code=400, detail="Invalid GSTIN format.")
    if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", data.email):
         raise HTTPException(status_code=400, detail="Invalid Email format.")

    return {"status": "success", "message": "Brand details are valid."}


@app.post("/api/payout/validate")
async def validate_payout(data: CreatorPayout):
     # Basic regex validation
    if not re.match(r"[A-Z]{5}[0-9]{4}[A-Z]{1}", data.pan):
        raise HTTPException(status_code=400, detail="Invalid PAN format.")
    if not re.match(r"^[A-Z]{4}0[A-Z0-9]{6}$", data.ifsc):
        raise HTTPException(status_code=400, detail="Invalid IFSC format.")
    if not re.match(r"^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$", data.upi):
        raise HTTPException(status_code=400, detail="Invalid UPI format.")

    return {"status": "success", "message": "Creator details are valid."}