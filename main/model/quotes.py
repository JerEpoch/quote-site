from google.appengine.ext import ndb


class Quote(ndb.Model):
	body = ndb.StringProperty(required=True)
	source = ndb.StringProperty(required=True)

	# @classmethod
	# def quoteJson(cls):
	# 	quoteList = Quote.query().get()
	# 	return json.dumps([k.to_dict() for k in quoteList.body])

	# @classmethod
	# def query_quotes(cls):
	# 	return cls.query()