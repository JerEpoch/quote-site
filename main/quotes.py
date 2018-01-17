# from flask import Flask, render_template, request, url_for
# coding: utf-8
import flask
from main import app
from google.appengine.api import users
from google.appengine.datastore.datastore_query import Cursor
from flask import request, jsonify, json
import auth
import random
from model import quotes
from flask_wtf import FlaskForm
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
    # flask.flash("Quote added!")
    return jsonify(bodyText, source), 201

# https://stackoverflow.com/questions/17975070/how-to-flip-to-previous-page-with-ndb-cursors?noredirect=1&lq=1
@app.route('/api/quotes', methods=['GET'])
def allQuotes():
  offSetPage = request.args.get('offset')
  cursor_page = request.args.get('cursor_page')
  
  cursor = None
  if cursor_page:
    cursor = Cursor(urlsafe=cursor_page)
  if offSetPage != None:
    offSetPage =  int(offSetPage)
  # cursor = Cursor(urlfsafe=self.request.get('cursor'))
  q = quotes.Quote.query()
  allQuotes, cursor, more = q.fetch_page(1, start_cursor=cursor)
  cursor_page = cursor.urlsafe() if more else None
  # q_forward = q.order(quotes.Quote.key)
  # q_reverse = q.order(-quotes.Quote.key)
 # allQuotes, cursor, more = q.fetch_page(1, offset=offSetPage)
  # allQuotes = q.fetch(10, offset=offSetPage)
  # r_allQuotes, r_cursor, r_more = q_reverse.fetch_page(1)
  # cursor = request.args.get('page')
  # allQuotes, cursor, more = quotes.Quote.query().fetch_page(1)
  allQuotes_json = json.dumps({'quotes':[q.to_dict() for q in allQuotes], 'cursor_page':cursor_page})
  return allQuotes_json

@app.route('/getquotes', methods=['GET'])
def getquotes():
  return flask.render_template('quotetest.html')