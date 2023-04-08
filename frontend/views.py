from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.middleware.csrf import get_token
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
  get_token(request)
  return render(request, "frontend/index.html")

def login(request: HttpRequest):
  # when they login set a jwt cookie
  if request.method != 'POST':
    return HttpResponse(status=405)
  
  body = json.loads(request.body.decode())
  if not body.get('email') or not body.get('password'):
    return HttpResponse(status=422)
  
  if not Users.objects.filter(email=body['email']).exists():
    return HttpResponse(status=404)
  # check database for user existence, if they're there ensure they're verified, if they are, create JWT cookie and respond. Then on the frontend redirect to the homepage
  user = Users.objects.get(email=body['email'])
  if not user.verified:
    return HttpResponse(status=401)
  encoded = jwt.encode({"id": user.id}, private_key, algorithm="RS256")
  response = HttpResponse("success")
  response.set_cookie('userAuth', encoded)
  return response

def signUp(request: HttpRequest):
  # when they login set some session token - probably with a jwt...
  if request.method != 'POST':
    return HttpResponse(status=405)
    # check and ensure that the user is not already in the database, if they are return that the user already exists. If they aren't insert them into the database and set the verified field to false. Then, using the yagmail function, send them an email with a link to verify at. as the extension on the email set a jwt that can be authenticated and associated with the user
  body = json.loads(request.body.decode())
  if not body.get('email') or not body.get('name') or not body.get('password'):
    return HttpResponse(status=422)
  
  # return 409 if the user already exists
  if Users.objects.filter(email=body['email']).exists():
    return HttpResponse(status=409)

  salt = os.urandom(32)
  plaintext = 'password'.encode()
  digest = (hashlib.pbkdf2_hmac('sha256', plaintext, salt, 1000))
  auth = Authentication.objects.create(salt=salt, hashedPassword=digest)
  user = Users.objects.create(name=body['name'], email=body['email'], authentication=auth)
  encoded = jwt.encode({"id": user.id}, private_key, algorithm="RS256")
  print(type(body['email']))
  send_email(body['email'], 'Account Verification', ['Please click here to verify your account: http://localhost:8000/api/verify/{token}'.format(token=encoded)])
  return HttpResponse('sent')

def verify(request: HttpRequest, auth):
  if request.method != 'GET':
    return HttpResponse(status=405)
  # verify jwt and if it is valid, verify to corresponding user in the database
  try:
    decoded = jwt.decode(auth.encode(), public_key, algorithms=["RS256"])
    if not decoded.get('id'):
      return HttpResponse(status=403)
    try :
      user = Users.objects.get(id=decoded.get('id'))
      user.verified = True
      user.save()
      response = render(request, "frontend/index.html")
      response.set_cookie('userAuth', auth)
      return response
    except:
      return HttpResponse(status=400)
  except:
    return HttpResponse(status=401)

def signOut(request: HttpRequest):
  if request.method != 'GET':
    return HttpResponse(status=405)
  response = HttpResponse('success')
  response.delete_cookie('userAuth')
  return response
