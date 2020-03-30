from App import app
import flask
import json
import glob
import time
import re
import os


def determine_slash_type():
    """
    Gets the right type of slash for compatibility between linux/mac/windows

    Returns:
        slash_type

    """
    current_path = os.path.dirname(__file__)

    if '\\' in current_path:
        slash_type = '\\'
    elif '/' in current_path:
        slash_type = '/'
    else:
        slash_type = '/'

    return slash_type
