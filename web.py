#!/usr/bin/env python3
"""
The Konpile web application provides a simple interface for uploading
excel, csv, and json data files and compiling them into one or more
configuration files.
"""

import os
import io
import pathlib

from flask import Flask, render_template, request, send_file

import konpile as kon

application = Flask(__name__)

with open('templates/default.j2', 'r') as f:
    default_template = f.read()

@application.route('/', methods=['GET'])
def index():
    return render_template('index.html', default=default_template)


@application.route('/process', methods=['POST'])
def process():
    """
    Accepts a file of type .xlsx, .csv, or .json and returns a JSON
    object containing the processed data. Processing is done by the
    konpile module which expects a file path as input.
    """
    try:
        # Get the file from the request
        file = request.files['file']
        # Save the file to a temporary location
        filepath = pathlib.Path(file.filename)
        file.save(filepath)
        # Process the file
        data = kon.process_file(filepath)
        # Delete the temporary file
        filepath.unlink()
        # Return the data as a JSON object
        return data
    except Exception as e:
        print(e)
        # Return a status code of 500
        return {'error': str(e)}, 500



@application.route('/compile', methods=['POST'])
def compile():
    """
    Accepts a JSON object containing a Jinja2 template and a
    JSON object containing the data to be rendered into the template.
    """
    try:
        # Get the template and data from the request
        template = request.json['template']
        data = request.json['data']
        # Render the template
        rendered = kon.render_string(template, data)
        # Create a file-like object in memory and convert the file-like
        # object to a BytesIO object
        print(rendered)
        file = io.BytesIO(rendered.encode('utf-8'))
        file.seek(0)
        # Return the file as an attachment
        return send_file(file, download_name='rendered.txt', as_attachment=True)
    except Exception as e:
        print(e)
        # Return a status code of 500
        return {'error': str(e)}, 500

def start():
    """
    Start the web server.
    """
    debugging = os.environ.get('DEBUG', True)
    application.run(host='0.0.0.0', port=8080, debug=debugging)


if __name__ == '__main__':
    start()
