from google.appengine.ext import ndb
import model

class Quote(model.Base):
	body = ndb.StringProperty(require=True)
	source = ndb.StringProperty(require=True)