from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
import jwt
from frontend.models import *
import os
import hashlib
import json
from frontend.functions.emailFunctions import send_email

# variables
private_key = open('frontend/private.key', 'r').read()
public_key = open('frontend/public.key', 'r').read()

# Create your views here.
def index(request):
  response = render(request, "frontend/index.html")
  return response

def login(request: HttpRequest):
  # when they login set some session token - probably with a jwt...
  if request.method != 'POST':
    return HttpResponse(status=405)
  
  body = json.loads(request.body.decode())
  if not body['email'] or not body['password']:
    return HttpResponse(status=422)
  
  if not Users.objects.filter(email=body['email']).exists():
    return HttpResponse(status=404)
  # check database for user existence, if they're there ensure they verified if they are, create JWT cookie and respond. Then on the frontend redirect to the homepage
  user = Users.objects.get(email=body['email'])
  encoded = jwt.encode({"id": user.id}, private_key, algorithm="RS256")
  response = HttpResponse(status=200)
  response.set_cookie('userAuthJwt', encoded)
  return response

def signUp(request: HttpRequest):
  # when they login set some session token - probably with a jwt...
  if request.method != 'POST':
    return HttpResponse(status=405)
    # check and ensure that the user is not already in the database, if they are return that the user already exists. If they aren't insert them into the database and set the verified field to false. Then, using the yagmail function, send them an email with a link to verify at. as the extension on the email set a jwt that can be authenticated and associated with the user
  body = json.loads(request.body.decode())
  print(body)
  if not body['name'] or not body['email'] or not body['password']:
    HttpResponse(status=422)
  
  # return 409 if the user already exists
  if Users.objects.filter(email=body['email']).exists():
    return HttpResponse(status=409)

  salt = os.urandom(32)
  plaintext = 'password'.encode()
  digest = (hashlib.pbkdf2_hmac('sha256', plaintext, salt, 1000))
  auth = Authentication.objects.create(salt=salt, hashedPassword=digest)
  user = Users.objects.create(name=body['name'], email=body['email'], authentication=auth)
  encoded = jwt.encode({"id": user.id}, private_key, algorithm="RS256")
  send_email(body['email'], 'Account Verification', ['Please click here to verify your account: http://localhost:8000/api/verify?auth={jwt}'.format(jwt=encoded)])
  return HttpResponse("Sent")

def verify(request: HttpRequest):
  if request.method != 'GET':
    return HttpResponse(status=405)
  print(request.GET.get('jwt', None))