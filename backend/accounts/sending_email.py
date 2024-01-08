from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.models import User
from Reminder.models import UserProfile, Job

def send_jobs_email_to_users():
    # Get all users
    users = User.objects.all()

    for user in users:
        # Retrieve user profile
        try:
            user_profile = UserProfile.objects.get(user=user)
            job_type = user_profile.job_type
        except UserProfile.DoesNotExist:
            # Handle the case where user profile does not exist
            continue

        # Retrieve jobs based on user's job_type
        relevant_jobs = Job.objects.filter(job_type=job_type)

        # Send email to the user with relevant jobs details
        if relevant_jobs.exists():
            subject = f'Job Updates for {user.username}'
            message = f'Hi {user.username}, here are the latest jobs in your area of interest:\n\n'

            for job in relevant_jobs:
                message += f'Job Title: {job.job_title}\n'
                message += f'Job Detail URL: {job.job_detail_url}\n'
                message += f'Job Listed: {job.job_listed}\n'
                message += f'Company Name: {job.company_name}\n'
                message += f'Company Link: {job.company_link}\n'
                message += f'Company Location: {job.company_location}\n\n'

            email_from = settings.EMAIL_HOST_USER
            recipient_list = [user.email, ]

            send_mail(subject, message, email_from, recipient_list)

# Call the function to send emails
send_jobs_email_to_users()
