import json
from flask import Flask, jsonify
from markupsafe import escape
from flask_db2 import DB2
import sys
from flask_cors import CORS;

app = Flask(__name__)

# APLICAR CONFIG DE DB2
app.config['DB2_DATABASE'] = 'tsalbums'
app.config['DB2_HOSTNAME'] = 'localhost'
app.config['DB2_PORT'] = 50000
app.config['DB2_PROTOCOL'] = 'TCPIP'
app.config['DB2_USER'] = 'db2inst1'
app.config['DB2_PASSWORD'] = 'hola'

db = DB2(app)

CORS(app)

@app.route("/")
def servicio_default():

    cur = db.connection.cursor()
    cur.execute("SELECT * FROM albums")

    data = cur.fetchall()

    cur.close()

    #print(data, file=sys.stdout)

    resultado = []
    for current in data:
        actual = {
            "id" : current[0],
            "name" : current[1],
            "year" : current[2],
            "color": current[3]
        }
        resultado.append(actual)

    return jsonify(resultado)

@app.route("/<int:album_id>")
def album_detail(album_id):

    cur = db.connection.cursor()
    cur.execute(f"SELECT * FROM albums WHERE id={album_id}")

    data = cur.fetchall()

    cur.close()

    resultado = [{"id": data[0][0], "name": data[0][1], "year": data[0][2], "color": data[0][3]}]
    print(data)

    return jsonify(resultado)

