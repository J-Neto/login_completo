## Dependencies Used
    - typescript -D
    - @types/node -D
    - ts-node-dev -D (equal to nodemon, but with integration to - typescript)
    - express (deal with routes)
    - @types/express -D
    - mongoose
    - dotenv -D
    - bcryptjs
    - @types/bcryptjs
    - jsonwebtoken
    - @types/jsonwebtoken -D
    - nodemailer (mails sending)
    - @types/nodemailer -D
    
## Useful comands
    * To push mongo database, use:
    "prisma generate"
    * In my case im using yarn so ... "yarn prisma generate"

## Interesting
    - I'm using mailtrap for emails in dev
    - To use in deploy, don't use SMTP, I recommend:
        - sparkpost
        - mailchimp
        - sendgrip
        - mandrill