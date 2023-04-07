from django.shortcuts import render

# Create your views here.

def index(request):
  print(request.COOKIES['thisisacookie'])
  response = render(request, "frontend/index.html")
  response.set_cookie("thisisacookie", "thisisavalue")
  return response