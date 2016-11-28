"""
WSGI config for roomie_mcroom project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os
import dotenv

from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

dotenv.read_dotenv()

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "roomie_mcroom.settings")

application = get_wsgi_application()
application = WhiteNoise(application)
