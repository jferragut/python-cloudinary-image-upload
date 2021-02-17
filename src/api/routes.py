"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from cloudinary.uploader import upload

api = Blueprint('api', __name__)

@api.route('/user', methods=['POST'])
def create_user():
    
    # get email, password, and photo from request
    email = request.form.get('email', None)
    password = request.form.get('password', None)
    photo = request.files['photo']

    # if params are empty, return a 400
    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400
    
    try:
        if photo is not None:
            photo_url = upload(photo)
            user = User(email=email,password=password,photo=photo_url["secure_url"],is_active=True)
        else:
            user = User(email=email,password=password,is_active=True)
        
        db.session.add(user)
        db.session.commit()
        response_body = {
            "msg": "Successfully created account.",
            "user": user.serialize()
        }
        status_code = 200
    except Exception as e:
        response_body = {
            "msg": str(e)
        }
        status_code = 400

    return jsonify(response_body), status_code
    

@api.route('/user/<int:user_id>', methods=['GET','PUT'])
def user_profile(user_id):
    if request.method == "GET":
        try:
            # QUERY USER
            user = User.query.filter_by(id=user_id).first()
            if user is None:
                raise Exception("Could not find specified user. Check your ID and try again.")

            response_body = {
                "user": user.serialize()
            }
            status = 200
        except Exception as e:
            response_body = {
                "msg": str(e)
            }
            status = 404
        
    if request.method == "PUT":
        # CHECK IF RESP IS JSON
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400 
        
        # get email, password, and photo from request
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        photo = request.files['file']

        # if params are empty, return a 400
        if not email:
            return jsonify({"msg": "Missing email parameter"}), 400
        if not password:
            return jsonify({"msg": "Missing password parameter"}), 400

        user = User.query.filter_by(id=user_id).first()
        # if there is no photo, just create update
        user.email = email
        user.password = password
        
        if photo is not None:
            user.photo = upload(photo)
            
        db.session.commit()
    

    return jsonify(response_body), status_code