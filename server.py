from flask import Flask, jsonify, render_template
import ctypes

app = Flask(__name__)

lib = ctypes.CDLL('./example.dll')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/result')
def get_result():
    result = lib.myFunction()
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)