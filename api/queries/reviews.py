from queries.client import MongoQueries
from fastapi import HTTPException, status, Body
from models.reviews import ReviewsIn, ReviewsUpdate, ReviewsOut
from bson.objectid import ObjectId
import datetime


class ReviewQueries(MongoQueries):
    collection_name = "reviews"

    def create(self, review: ReviewsIn, customer) -> ReviewsOut:
        data = review.dict()
        data["customer"] = customer
        now = datetime.datetime.utcnow()
        data["date"] = now.strftime("%Y-%m-%d, %H:%M")
        self.collection.insert_one(data)
        data["id"] = str(data["_id"])
        return ReviewsOut(**data)

    def get_all_reviews(self) -> ReviewsOut:
        results = []
        for item in self.collection.find():
            item["id"] = str(item["_id"])
            results.append(item)
        return results

    def get_one_by_id(self, id: str) -> ReviewsOut:
        if (review := self.collection.find_one({"order_id": id})) is not None:
            review["id"] = str(review["_id"])
            return review
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with id {id} not found",
        )

    def update(self, id, review: ReviewsUpdate = Body(...)):
        review = {k: v for k, v in review.dict().items() if v is not None}

        if len(review) >= 1:
            self.collection.update_one({"_id": ObjectId(id)}, {"$set": review})
            return {"message": "updated"}

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with id {id} not found",
        )

    def delete(self, id: str):
        delete_result = self.collection.delete_one({"_id": ObjectId(id)})

        if delete_result.deleted_count == 1:
            return {"message": "deleted"}

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Review with id {id} not found",
        )
