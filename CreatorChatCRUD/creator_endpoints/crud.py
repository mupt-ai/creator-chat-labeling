from flask import Blueprint, request

from sql.models import Creators, db

creators_blueprint = Blueprint("creators", __name__)


@creators_blueprint.route("/creators", methods=["GET", "POST", "DELETE", "PUT"])
def creators():
    if request.method == "GET":
        creators_json = Creators.query.all()
        creators = []
        for creator in creators_json:
            creators.append(
                {
                    "id": creator.id,
                    "name": creator.name,
                    "date_created": creator.date_created,
                }
            )
        return {"creators": creators}
    elif request.method == "POST":
        creator_name = request.args.get("name")
        new_creator = Creators(name=creator_name)
        db.session.add(new_creator)
        db.session.commit()
        return {"message": "Creator added successfully!"}
    elif request.method == "DELETE":
        creator_id = request.args.get("id")
        creator = Creators.query.filter_by(id=creator_id).first()
        db.session.delete(creator)
        db.session.commit()
        return {"message": f"Deleted creator with id {creator_id} successfully!"}
    elif request.method == "PUT":
        creator_id = request.args.get("id")
        new_name = request.args.get("name")
        creator = Creators.query.filter_by(id=creator_id).first()
        creator.name = new_name
        db.session.commit()
        return {"message": "Creator name updated successfully!"}
