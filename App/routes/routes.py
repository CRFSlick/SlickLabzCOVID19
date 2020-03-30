from App.modules.api.api import get_confirmed, get_countries
from flask import render_template
from flask import Blueprint
from flask import abort
from flask import request
from App import app
from flask import jsonify
import flask

main = Blueprint('main', __name__)


@main.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@main.route('/api/country', methods=['GET'])
def api_country():
    return jsonify(get_confirmed(request.args.get('name')))


@main.route('/api/countries', methods=['GET'])
def api_countries():
    return jsonify(get_countries())
