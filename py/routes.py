from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from model import Ingredient

router = APIRouter()
@router.post("/", response_description="Create a new ingredient", status_code=status.HTTP_201_CREATED, response_model=Ingredient)
def create_ingredient(request: Request, ingredient: ingredient = Body(...)):
    ingredient = jsonable_encoder(ingredient)
    new_ingredient = request.app.database["ingredients"].insert_one(ingredient)
    created_ingredient = request.app.database["ingredients"].find_one(
        {"_id": new_ingredient.inserted_id}
    )

    return created_ingredient

@router.get("/", response_description="List all ingredients", response_model=List[ingredient])
def list_ingredients(request: Request):
    ingredients = list(request.app.database["ingredients"].find(limit=100))
    return ingredients