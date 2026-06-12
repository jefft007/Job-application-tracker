from rest_framework import viewsets
from .models import JobApplication
from .serializers import JobApplicationSerializer

class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all().order_by('-created_at')
    serializer_class = JobApplicationSerializer

    from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    token, created = Token.objects.get_or_create(user=user)

    return Response({
        'message': 'User registered successfully',
        'token': token.key,
        'username': user.username
    })


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({'error': 'Invalid username or password'}, status=400)

    token, created = Token.objects.get_or_create(user=user)

    return Response({
        'message': 'Login successful',
        'token': token.key,
        'username': user.username
    })