from fastapi import APIRouter, Depends, HTTPException
from ... import crud, schemas, dependencies

router = APIRouter()

@router.post("/messages/", response_model=schemas.MessageCreate)
def create_message(message: schemas.MessageCreate, db: Depends(dependencies.get_db)):
    return crud.create_message(db=db, message=message)
