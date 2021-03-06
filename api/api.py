import time
from flask import Flask
from flask import request
from flask import jsonify
import switching as sw
app = Flask(__name__)
@app.route('/time')
def hello_world():
    return {'time': time.time()}
@app.route('/resultats',methods=['POST'])
def get_resultat():
    #get the request from frontend
    _req = request.get_json()
    res = (sw.switch((_req)))
    return (jsonify(res)) # return a json respecting the format of resultats.json
@app.route('/poisoned',methods=['POST'])
def get_fileName():
    #get the request from frontend
    _req = request.get_json()
    res = (sw.attaquer(_req))
    return (jsonify(res)) # return a json respecting the format of resultats.json
@app.route('/stream_viz',methods=['POST'])
def show():
    #get the request from frontend
    _req = request.get_json()
    res = (sw.visualize(_req))
    return (jsonify(res)) # return a json respecting the format of resultats.json

@app.route('/data_inf',methods=['POST'])
def get_inf():
    #get the request from frontend
    _req = request.get_json()
    res = (sw.get_dataset_infos(_req))
    return (jsonify(res)) # return a json respecting the format of resultats.json
