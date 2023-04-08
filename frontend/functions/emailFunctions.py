import yagmail
from decouple import config

user = 'budgetappnoreply@gmail.com'
app_password = config('app_password')
print(app_password)
yag = yagmail.SMTP(user, app_password)

def send_email(to: str, subject: str, content: list):
    yag.send(to, subject, content)
