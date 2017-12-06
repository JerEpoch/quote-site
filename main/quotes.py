# from flask import Flask, render_template, request, url_for
import flask
from main import app
from google.appengine.api import users
import auth

# app = Flask(__name__)

# https://tutorialzine.com/2016/03/5-practical-examples-for-learning-vue-js

@app.route('/')
def index():
	return flask.render_template('index.html')


@app.route('/about')
def about():
	return flask.render_template('about.html')

@app.route('/signin')
def sigin():
	user = users.get_current_user()
	logout_url = users.create_logout_url('/')
	login_url = users.create_login_url('/')
	if user:
		greeting = "hi " + user.nickname()
		
		return flask.render_template('login.html', greeting=greeting, logout_url=logout_url,)
	else:
		
		#flask.redirect(flask.url_for('login_url'))
		greeting = "Login to Continue."

	return flask.render_template('login.html', greeting=greeting,login_url=login_url)
	#return flask.redirect(flask.url_for('index'))

@app.route('/addquote')
@auth.admin_required
def addQuote():
	return flask.render_template('addquote.html')

@app.context_processor
def check_admin():
	user = users.get_current_user()
	if users.is_current_user_admin():
		isAdmin = 'admin'
	else:
		isAdmin = ''

	return dict(isAdmin=isAdmin)

# @app.route('/signin')
# def signin():
# 	return flask.render_template('login.html')