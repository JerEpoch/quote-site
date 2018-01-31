from model import quotes

new_quotes = dict([
    ('This is a test', 'source'),
    ('Another test quote', 'source2')
])

def seed_base():
    for k, v in new_quotes.iteritems():
        # print k, v
        body = k
        source = v
        newq = quotes.Quote(body=body, source=source)
        newq.put()

# if __name__ == '__main__':
#     seed_base()
