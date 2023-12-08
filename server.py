from flask import Flask, jsonify, render_template
from ctypes import *

app = Flask(__name__)

lib = cdll.LoadLibrary(r'./example.dll')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/result')
def get_result():
    result = lib.myFunction()
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)