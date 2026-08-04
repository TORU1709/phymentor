import unicodedata
def quitar_tildes(texto):

    return ''.join(
        c for c in unicodedata.normalize('NFD', texto)
        if unicodedata.category(c) != 'Mn'
    )
from knowledge import KNOWLEDGE


def buscar_respuesta(mensaje):

    mensaje = quitar_tildes(mensaje.lower().strip())

    # ------------------------
    # SALUDOS
    # ------------------------

    saludos = [
        "hola",
        "buenas",
        "buenos dias",
        "buenas tardes",
        "buenas noches",
        "hey",
        "holi",
        "holii"
    ]

    if mensaje in saludos:

        return """
👋 ¡Hola!

Soy <b>PhyMentor</b>, tu asistente de Física.

Puedo ayudarte con:

🚗 Cinemática

⚙️ Mecánica

🌡️ Temperatura y Calor

Escribe tu pregunta y con gusto te ayudaré.
"""

    # ------------------------
    # DESPEDIDAS
    # ------------------------

    despedidas = [
        "adios",
        "bye",
        "nos vemos",
        "hasta luego"
    ]

    if mensaje in despedidas:

        return """
👋 ¡Hasta luego!

Fue un gusto ayudarte.

Mucho éxito en tus estudios.
"""

    # ------------------------
    # AGRADECIMIENTOS
    # ------------------------

    gracias = [
        "gracias",
        "muchas gracias",
        "thanks"
    ]

    if mensaje in gracias:

        return """
😊 ¡Con mucho gusto!

Si tienes otra duda sobre Física,
aquí estaré para ayudarte.
"""

    # ------------------------
    # QUIÉN ERES
    # ------------------------

    if "quien eres" in mensaje or "quién eres" in mensaje:

        return """
🤖 Soy PhyMentor.

Un chatbot educativo diseñado para responder preguntas sobre:

🚗 Cinemática

⚙️ Mecánica

🌡️ Temperatura y Calor

utilizando el material del curso.
"""

    # ------------------------
    # BUSCAR EN LA BASE DE DATOS
    # ------------------------

    coincidencias = []

    for tema in KNOWLEDGE.values():

        for contenido in tema.values():

            for palabra in contenido["keywords"]:

                palabra_normalizada = quitar_tildes(palabra)

                if palabra_normalizada in mensaje:

                    coincidencias.append({
                        "longitud": len(palabra_normalizada),
                        "contenido": contenido
                    })

    if coincidencias:

        mejor = max(coincidencias, key=lambda x: x["longitud"])

        contenido = mejor["contenido"]

        return f"{contenido['titulo']}\n\n{contenido['respuesta']}"

    # ------------------------
    # SI NO ENCUENTRA
    # ------------------------

    return """
🤔 No encontré información sobre esa pregunta.

Puedes intentar con consultas como:

• ¿Qué es el MRU?

• ¿Qué es la temperatura?

• Segunda ley de Newton

• Calor

• Fuerza
"""

