from flask import Flask, render_template
import ctypes

app = Flask(__name__)

lib = ctypes.CDLL('./library/example.dll')

addVertex = lib.addVertexCPP
removeVertex = lib.removeVertexCPP
addEdge = lib.addEdgeCPP
removeEdge = lib.removeEdgeCPP

addVertex.argtypes = [ctypes.c_int, ctypes.c_int]
# removeVertex.argtypes = [ctypes.c_int]
addEdge.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int]
removeEdge.argtypes = [ctypes.c_int, ctypes.c_int]

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)