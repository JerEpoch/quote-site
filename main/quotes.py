# from flask import Flask, render_template, request, url_for
import flask
from main import app
# app = Flask(__name__)

# https://tutorialzine.com/2016/03/5-practical-examples-for-learning-vue-js

@app.route('/')
def index():
	return flask.render_template('index.html')


# if __name__ == '__main__':
# 	app.debug= True
# 	app.run(host = '0.0.0.0', port = 5000)