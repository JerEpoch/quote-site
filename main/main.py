import logging
from flask import Flask
import flask
import os

# import flask

class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
      block_start_string='{%',
      block_end_string='%}',
      variable_start_string='((',
      variable_end_string='))',
      comment_start_string='{#',
      comment_end_string='#}',
    ))


app = CustomFlask(__name__)
app.config.from_object('config')
production_env = os.getenv('SERVER_SOFTWARE').startswith('Google App Engine/')
if not production_env:
  from werkzeug.debug import DebuggedApplication
  try:
    app.wsgi_app = DebuggedApplication(app.wsgi_app, evalex=True)
  except:
    app.wsgi_app = DebuggedApplication(app.wsgi_app, evalex=True)
  app.debug = True

import quotes
