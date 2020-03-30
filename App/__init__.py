from werkzeug.contrib.fixers import ProxyFix
from flask import Flask
import json


# Initialize the application
app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, num_proxies=1)


# Determine the type of slash this OS uses
from App.modules.helpers.helpers import determine_slash_type
slash = determine_slash_type()


# Register application routes
from App.routes.routes import main
app.register_blueprint(main)


# Initialize error handler
from App.routes.error_handler import worthless_var
