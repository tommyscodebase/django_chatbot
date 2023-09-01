from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('chatbot/', views.chatbot, name='chatbot'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.register_user, name='register'),
    path('logout/', views.user_logout, name='logout'),
    path('save_chat/', views.save_chat, name='save_chat'),
    path('new_chat/', views.new_chat, name='new_chat'),
    path('history/<str:username>', views.history, name='history'),
    path('load/<str:session_id>', views.load_chats, name='load'),
    path('delete/<str:session_id>', views.delete_session, name='delete_session'),
    path('get_chatbot_response/', views.get_chatbot_response, name='get_chatbot_response'),

    ]

