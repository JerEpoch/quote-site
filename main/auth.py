from functools import wraps
from google.appengine.api import users
from flask import g, request, redirect, url_for

def admin_required(f):
	@wraps(f)
	def decorated_function(*args, **kwargs):
		user = users.get_current_user()
		if user:
			if users.is_current_user_admin():
				return f(*args, **kwargs)
			else:
				return redirect(url_for('index'))
		else:
			return redirect(url_for('index'))
	return decorated_function