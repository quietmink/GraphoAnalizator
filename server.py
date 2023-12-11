from flask import Flask, jsonify, render_template
import ctypes

app = Flask(__name__)

lib = ctypes.CDLL('./library/example.dll')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)