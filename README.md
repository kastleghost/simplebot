# Simplebot
This is a simple introductory Discord bot leveraging AWS free-tier services.

# To get started:
## Pre-reqs:
- AWS account for setting up Lambda  
-  Discord Developer Portal  
-  Node.js

### 1. Setup of AWS Lambda:
- Create a Lambda function
- Runtime set to **Node.js**
- Architecture set to **x86_64**
- Open Advanced Settings and check **Enable function URL**
  - Auth type: NONE
  - check Configure cross-origin resource sharing (CORS)
  - leave the rest default

### 2. Setup of Nodejs:
> **NOTE:**<br>
> Discord security verification requires [tweetnacl](https://discord.com/developers/docs/interactions/receiving-and-responding#security-and-authorization).
- On local machine, create a new directory i.e. lambda_files to store **node_modules** as well as **.js** files for Lambda
  - run `npm i tweetnacl`
- Setup your **index.js** and any other files
- Zip within the folder, including node_modules, and upload to Lambda function

### 3. Setup of Discord Application:
> **NOTE:**<br>
> Assign permissions based on the needs of your function; DO NOT grant Administrator
- Create a new Application on the Discord Developer Portal
- In the Application's settings, navigate to the "OAuth2" section, and generate the URL with the following Scopes:
  - application.commands
  - bot
- Bot Permissions
    - use slash commands
- Copy the Public Key from the Discord Application and set it as an Environment Variable named "PUBLIC_KEY" in the Lambda configuration
- Copy the function URL from Lambda and use it as the Discord Interactions Endpoint URL

### 4. Registering Commands:
> **NOTE:**<br>
> To register commands we use [axios](https://axios-http.com/docs/intro) to query and post to Discord API<br>
> Secrets are stored in .env which uses [dotenv](https://www.npmjs.com/package/dotenv)<br>
> [!TIP]
> Global commands could take up to 1 hour to create, delete or modify on guilds. If you need to update a command quickly for testing you can create it as a guild command.
- On local machine, create a new directory separate from lambda_files
  - run `npm i axios dotenv`
- update the **.env** file with your BOT TOKEN, APP ID, and GUILD ID
- run `node register.js` script

## Optionals:
If you plan on using DynamoDB run `npm i @aws-sdk/client-dynamodb`

# Addt. Resources:
- https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html#welcome_whats_new_v3
- https://discord.com/developers/docs/interactions/application-commands#slash-commands