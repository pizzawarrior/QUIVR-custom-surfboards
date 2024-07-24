from queries.client import MongoQueries
from fastapi import HTTPException, status, Body
from models.reviews import ReviewIn, ReviewUpdate, ReviewOut
from bson.objectid import ObjectId
from datetime import datetime, timezone


class ReviewQueries(MongoQueries):
    collection_name = "reviews"

    def create(self, review: ReviewIn, customer) -> ReviewOut:
        data = review.dict()
        data["customer"] = customer
        now = datetime.now(timezone.utc)
        data["date"] = now.strftime("%Y-%m-%d, %H:%M")
        self.collection.insert_one(data)
        data["id"] = str(data["_id"])
        return ReviewOut(**data)

    def get_all_reviews(self) -> ReviewOut:
        results = []
        for item in self.collection.find():
            item["id"] = str(item["_id"])
            results.append(item)
        return results

    def get_one_by_id(self, id: str) -> ReviewOut:
        # Note that ONLY THIS ONE is searchable by order_id, not id
        if (review := self.collection.find_one({"order_id": id})) is not None:
            review["id"] = str(review["_id"])
            return review
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with id {id} not found",
        )

    def update(self, id, review: ReviewUpdate = Body(...)):
        review = {k: v for k, v in review.dict().items() if v is not None}

        if len(review) >= 1:
            self.collection.update_one({"_id": ObjectId(id)}, {"$set": review})
            return {"message": "Review has been updated"}

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Error: Review with ID: {id} was not found",
        )

    def delete(self, id: str):
        delete_result = self.collection.delete_one({"_id": ObjectId(id)})

        if delete_result.deleted_count == 1:
            return {"message": "deleted"}

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Error: Review with id {id} was not found",
        )
