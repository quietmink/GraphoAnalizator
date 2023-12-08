from flask import Flask
from ctypes import *

app = Flask(__name__)

lib = cdll.LoadLibrary(r'./example.dll') # g++ -shared -o example.dll -fPIC example.cpp

result = lib.myFunction()

@app.route('/')
def index():
    return f'Numba: {result}'

if __name__ == '__main__':
    app.run(debug=True)