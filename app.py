from flask import Flask, render_template, request, jsonify
from chatbot import buscar_respuesta
from quiz import QUIZ

app = Flask(__name__)


@app.route("/")
def inicio():
    return render_template("index.html")



# -------------------------
# CHATBOT
# -------------------------

@app.route("/chat", methods=["POST"])
def chat():

    datos = request.get_json()

    mensaje = datos.get("mensaje", "")

    respuesta = buscar_respuesta(mensaje)

    return jsonify({

        "respuesta": respuesta

    })



# -------------------------
# QUIZ
# -------------------------

@app.route("/quiz")
def obtener_quiz():

    return jsonify(QUIZ)



if __name__ == "__main__":

    app.run(debug=True)