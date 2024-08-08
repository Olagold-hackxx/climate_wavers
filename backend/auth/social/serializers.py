from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from .utils import Google, register_social_user
from django.conf import settings

class GoogleSignInSerializer(serializers.Serializer):
    access_token = serializers.CharField(min_length=6)

    def validate_access_token(self, access_token):
        # Validate the Google access token
        google_user_data = Google.validate(access_token)

        # Debugging: Print the type and value of google_user_data
        print(f"google_user_data type: {type(google_user_data)}")
        print(f"google_user_data value: {google_user_data}")

        # Ensure google_user_data is a dictionary
        if not isinstance(google_user_data, dict):
            raise serializers.ValidationError("This token is invalid or has expired")

        try:
            user_id = google_user_data["sub"]
        except KeyError:
            raise serializers.ValidationError("This token is invalid or has expired")
        
        if google_user_data.get("aud") != settings.GOOGLE_CLIENT_ID:
            raise AuthenticationFailed("Could not verify user")

        email = google_user_data.get('email')
        first_name = google_user_data.get('given_name')
        last_name = google_user_data.get('family_name')
        provider = 'google'

        # Register or retrieve the user from the database
        user = register_social_user(provider, email, first_name, last_name)

        return user
