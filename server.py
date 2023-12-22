from flask import Flask, jsonify, render_template, request
import ctypes

app = Flask(__name__)

lib = ctypes.CDLL('./library/example.dll')

addVertex = lib.addVertexCPP
removeVertex = lib.removeVertexCPP
addEdge = lib.addEdgeCPP
removeEdge = lib.removeEdgeCPP

addVertex.argtypes = [ctypes.c_int, ctypes.c_int]
removeVertex.argtypes = [ctypes.c_int]
addEdge.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int]
removeEdge.argtypes = [ctypes.c_int, ctypes.c_int]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add-node-endpoint', methods=['POST'])
def add_node():
    data = request.get_json()
    result = addVertex(int(data['id']), int(data['value']))
    return jsonify(result)

@app.route('/remove-node-endpoint', methods=['POST'])
def remove_node():
    data = request.get_json()
    result = removeVertex(int(data['id']))
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)