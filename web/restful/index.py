# -*- coding:utf-8 -*-
"""
    index action demo
    author cookmycode@gmail.com
"""
import tornado

from tornado import gen
from kpages import url, ContextHandler, LogicContext, get_context, service_async, mongo_conv

@url(r"/")
@url(r"/([\w]+)/?")
class IndexHandler(ContextHandler,tornado.web.RequestHandler):
    def get(self, *args):
        print args
        if len(args) == 0: 
            codename = 'huke' 
        else: 
            codename = args[0]
        db = get_context().get_mongoclient('my2048')['user']
        highscore = 0
        lastscore = 0
        highnum = 0
        password = ''
        lastboard = []

        user = db.find_one({"codename":codename})

        if user:
            name = user.get('name', '')
            highscore = user.get('highscore', 0)
            highnum = user.get('highnum', 0)
            lastscore = user.get('lastscore', highscore)
            password = user.get('password', '')
            lastboard = user.get('lastboard', '')
        else:
            db.insert({"codename":codename})
            name = ''
        print user

        db = get_context().get_mongoclient('my2048')['user']
        rank = list(db.find({}, {'_id': 0}).sort([('highnum', -1)]).limit(10))

        self.render('index.html', name = name,
            codename = codename,
            highscore = highscore,
            lastscore = lastscore,
            password = password,
            highnum = highnum,
            lastboard = lastboard,
            rank = rank)

@url(r"/get/highnum")
class GetHighnumHandler(ContextHandler,tornado.web.RequestHandler):
    def get(self):
        db = get_context().get_mongoclient('my2048')['user']
        data = list(db.find({}, {'_id': 0}).sort([('highnum', -1)]).limit(10))
        self.write(dict(status = True, data = data))


@url(r"/update/name")
class UpdateNameHandler(ContextHandler,tornado.web.RequestHandler):
    def post(self):
        codename = self.get_argument('codename')
        name = self.get_argument('name')

        db = get_context().get_mongoclient('my2048')['user']
        db.update({"codename": codename}, {"$set":{"name": name}})

        self.write(dict(status = True))

@url(r"/update/highnum")
class UpdateHighnumHandler(ContextHandler, tornado.web.RequestHandler):
    def post(self):
        codename = self.get_argument('codename')
        highnum = self.get_argument('highnum')
        
        db = get_context().get_mongoclient('my2048')['user']
        db.update({"codename": codename}, {"$set":{"highnum": float(highnum)}})

        self.write(dict(status = True))

@url(r"/update/lastscore")
class UpdateLastscoreHandler(ContextHandler, tornado.web.RequestHandler):
    def post(self):
        codename = self.get_argument('codename')
        lastscore = self.get_argument('lastscore')
        
        db = get_context().get_mongoclient('my2048')['user']
        db.update({"codename": codename}, {"$set":{"lastscore": lastscore}})

        self.write(dict(status = True))

@url(r"/update/highscore")
class UpdateHighScoreHandler(ContextHandler, tornado.web.RequestHandler):
    def post(self):
        codename = self.get_argument('codename')
        highscore = self.get_argument('highscore')
        
        db = get_context().get_mongoclient('my2048')['user']
        db.update({"codename": codename}, {"$set":{"highscore": highscore}})

        self.write(dict(status = True))

@url(r"/update/lastboard")
class UpdateHighScoreHandler(ContextHandler, tornado.web.RequestHandler):
    def post(self):
        codename = self.get_argument('codename')
        lastboard = self.get_argument('lastboard')
        
        db = get_context().get_mongoclient('my2048')['user']
        db.update({"codename": codename}, {"$set":{"lastboard": lastboard}})

        self.write(dict(status = True))

@url(r"/set/password")
class SetPassword(ContextHandler, tornado.web.RequestHandler):
    def post(self):
        codename = self.get_argument('codename')
        password = self.get_argument('password')

        db = get_context().get_mongoclient('my2048')['user']
        db.update({"codename": codename}, {"$set":{"password": password}})

        self.write(dict(status = True))

