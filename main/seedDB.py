# coding: utf-8
from model import quotes

new_quotes = dict([
    ('“There is a cooling, and there’s a heating. I mean, look, it used to not be climate change, it used to be global warming. That wasn’t working too well because it was getting too cold all over the place.”' , 'http://www.independent.co.uk/news/world/americas/donald-trump-misunderstands-basic-facts-climate-change-piers-morgan-interview-a8181381.html'),
    ('"But we have to be extremely vigilant and extremely careful when it comes to nuclear. Nuclear changes the whole ball game. Frankly, I would have said get out of Syria; get out—if we didn’t have the power of weaponry today. The power is so massive that we can’t just leave areas that 50 years ago or 75 years ago we wouldn’t care. It was hand-to-hand combat. The biggest problem this world has today is not President Obama with global warming, which is inconceivable, this is what he’s saying. The biggest problem we have is nuclear—nuclear proliferation and having some maniac, having some madman go out and get a nuclear weapon. That’s in my opinion, that is the single biggest problem that our country faces right now. I think—I think, for me, nuclear is just the power, the devastation is very important to me."', 'https://www.motherjones.com/kevin-drum/2015/12/here-worst-answer-tonights-debate/')
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
