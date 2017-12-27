# from flask import Flask, render_template, request, url_for
import flask
from main import app
from google.appengine.api import users
from flask import request, jsonify, json
import auth
from model import quotes
# app = Flask(__name__)

# https://tutorialzine.com/2016/03/5-practical-examples-for-learning-vue-js

@app.route('/')
def index():
	return flask.render_template('index.html')


@app.route('/about')
def about():
	return flask.render_template('about.html')

@app.route('/test')
def test():
  user = users.get_current_user()
  if user:
		nickname = user.nickname()
  return flask.render_template('test.html')

@app.route('/addquote', methods=['GET', 'POST'])
@auth.admin_required
def addquote():
  return flask.render_template('addquote.html')


@app.route('/api/newquote', methods=['POST'])
def newQuote():
  data = request.get_json()
  bodyText = data["text"]
  source = data["source"]
  newQuote_db = quotes.Quote(body=bodyText, source=source)
  if newQuote_db.put():
    flask.flash("Quote added!")
    return jsonify(bodyText, source), 201

@app.route('/api/quotes', methods=['GET'])
def allQuotes():
  allQuotes = quotes.Quote.query().fetch()
  allQuotes_json = json.dumps([q.to_dict() for q in allQuotes])
  return allQuotes_json

@app.route('/getquotes', methods=['GET'])
def getquotes():
  return flask.render_template('quotetest.html')