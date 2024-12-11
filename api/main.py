from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import sqlite3
import random
import string

app = Flask(__name__)
CORS(app)

@app.route("/api/games", methods=["GET"])
@cross_origin()
def get_games():
    offset = request.args.get("offset")

    connection = sqlite3.connect("games.db")
    cursor = connection.cursor()
    cursor.execute(f"SELECT id, name, image, price, is_available FROM games LIMIT 10 OFFSET {offset}")
    games = cursor.fetchall()

    games_list = []

    for game in games:
        game_dict = {
            "id": game[0],
            "name": game[1],
            "image": game[2],
            "price": game[3],
            "is_available": game[4]
        }
        games_list.append(game_dict)

    cursor.close()
    connection.close()

    response = jsonify(games_list)

    return response

@app.route("/api/games/<int:game_id>", methods=["GET"])
@cross_origin()
def get_game_by_id(game_id):
    connection = sqlite3.connect("games.db")
    cursor = connection.cursor()
    cursor.execute(f"SELECT name, release_date, rating, image, description, price, is_available FROM games WHERE id = {game_id}")
    game = cursor.fetchone()

    game_dict = {
        "name": game[0],
        "release_date": game[1],
        "rating": game[2],
        "image": game[3],
        "description": game[4],
        "price": game[5],
        "is_available": game[6]
    }

    cursor.close()
    connection.close()

    response = jsonify(game_dict)

    return response

@app.route("/api/games/<game_name>", methods=["GET"])
@cross_origin()
def get_game_by_name(game_name):
    connection = sqlite3.connect("games.db")
    cursor = connection.cursor()
    cursor.execute(f"SELECT id, name, image, price, is_available FROM games WHERE name LIKE '%{game_name}%';")
    games = cursor.fetchall()

    games_list = []

    for game in games:
        game_dict = {
            "id": game[0],
            "name": game[1],
            "image": game[2],
            "price": game[3],
            "is_available": game[4]
        }
        games_list.append(game_dict)

    cursor.close()
    connection.close()

    response = jsonify(games_list)

    return response

if __name__ == "__main__":
    app.run()