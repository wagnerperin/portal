from django.shortcuts import render

def index(request):
    return render(request, 'home/index.html', {})

def register(request):
    return render(request, 'home/register.html', {})

def editor(request):
    return render(request, 'home/editor.html', {})

def login(request):
    return render(request, 'home/login.html', {})

def profile(request):
    return render(request, 'home/profile.html', {})
