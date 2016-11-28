from .models import Booking, BookingSociety, UserProfile

from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

new_group, created = Group.objects.get_or_create(name='Group_3')
booking_society = ContentType.objects.get_for_model(BookingSociety)
society_booking = Permission.objects.create(
    codename='can_book_society_rooms', name='Can book society rooms', content_type=booking_society)
new_group.permissions.add(society_booking)
permission2 = Permission.objects.create(
    codename='can_book_21_days_in_advance', name='Can book rooms 21 days in advance', content_type=booking_society)
new_group.permissions.add(permission2)
normal_booking = ContentType.objects.get_for_model(Booking)
new_group, _ = Group.objects.get_or_create(name='Group_1')
booking = Permission.objects.create(
    codename='can_book_normal_rooms', name='Can book normal rooms', content_type=normal_booking)
permission2 = Permission.objects.create(
    codename='have_unlimited_quota', name='Have unlimited quota', content_type=normal_booking)
permission3 = Permission.objects.create(
    codename='can_book_90_days_in_advance', name='Can book 90 days in advance', content_type=normal_booking)
new_group.permissions.add(permission2, booking, permission3, society_booking)
new_group, _ = Group.objects.get_or_create(name='Group_2')
permission2 = Permission.objects.create(
    codename='can_book_7_days_in_advance', name='Can book 7 days in advance', content_type=normal_booking)
new_group.permissions.add(permission2, booking)
new_group, _ = Group.objects.get_or_create(name='Group_4')
people = ContentType.objects.get_for_model(UserProfile)
permission1 = Permission.objects.create(
    codename='can_add_new_people', name='Can add new people', content_type=people)
permission2 = Permission.objects.create(
    codename='can_add_and_remove_people_to_group_3', name='Can add or remove people to group 3', content_type=people)
# not really, check if the AuthenticationToken is a model
permission3 = Permission.objects.create(
    codename='can_generate_tokens', name='Can generate tokens', content_type=people)
new_group.permissions.add(permission1, permission2, permission3)
