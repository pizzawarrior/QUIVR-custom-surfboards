from queries.client import MongoQueries
from fastapi import HTTPException, status, Body
from bson.objectid import ObjectId
from datetime import datetime, timezone
from models.messages import MessageIn, MessageOut, MessagesOut, MessageUpdate


class MessageQueries(MongoQueries):
    collection_name = 'messages'

    def create_message(self, message: MessageIn, sender) -> MessageOut:
        data = message.dict()
        data["sender"] = sender
        now = datetime.now(timezone.utc)
        data["date"] = now.strftime("%Y-%m-%d, %H:%M")
        self.collection.insert_one(data)
        data["id"] = str(data["_id"])
        return MessageOut(**data)

    def get_all_messages(self) -> MessagesOut:
        messages = []
        for item in self.collection.find():
            item["id"] = str(item["_id"])
            messages.append(item)
        return messages

    def get_one_message(self, id: str) -> MessageOut:
        if (message := self.collection.findOne({"_id": ObjectId(id)})) is not None:
            message[id] = str(message["_id"])
            return message
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Message with id {id} not found",
        )

    def updateMessage(self, id: str, message: MessageUpdate = Body(...)):
        message = {k: v for k, v in message.dict().items() if v is not None}
        now = datetime.now(timezone.utc)
        message["date"] = now.strftime("%Y-%m-%d, %H:%M")

        if (len(message) >= 1):
            self.collection.update_one({"_id": ObjectId(id)}, {"$set": message})
            return {"message": "Your message has been updated"}
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Error: Message with ID: {id} was not found'
        )

    def delete(self, id: str):
        delete_message = self.collection.deleteOne(
            {"_id": ObjectId(id)}
        )
        if (delete_message.deleted_count == 1):
            return {"message": f'The message with ID {id} has been deleted'}
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Error: Message with {id} was not found'
        )
