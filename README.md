# Recipe Generator

# MongoDb Data Install

Here is a set of instructions for you to follow in order to load the data into your local MongoDb Database.

The file containing the data will be stored in the git repository, it will be called 'recipes.json'.

## Download and Save the 'recipes.json' file

Follow this link to downnload the file.

Make sure you save it to your local project directory (recipe-generator)

```
https://drive.google.com/file/d/1d7BcFiKVPYsTxansa8Ux1SCbrsXCDQhO/view?usp=share_link
```

## Using your CLI (terminal), navigate to the projects repository

```
cd <filePath>/recipe-generator
```

## Ensure that you have MongoDb installed on your machine

```
brew install mongodb-community@6.0
```
[^1]: If you already know that MongoDb is installed, skip this step
## Importing the file to MongoDb

Run this command in the project repository on your local machine (recipe-generator)

```
mongoimport --host localhost --port 27017 --db Makers_Academy --collection Recipe_Generator --type json --headerline --file recipes.json
```

## Checking the data is imported

Once the above steps have been completed, open up your TablePlus.

Create a new Mongo (Beta) connection.

Fill the form out with the information below...

```
Name: Makers Academy - Recipe Generator

URL: localhost:27017

SSL Mode: NO SSL
```

Click the 'Test' button and make sure the 'URL' field turns green, if it does then click 'Connect'.

Once in the MongoDb Server, locate to the 'Makers_Academy' database/collection and you should be able to see the imported data.

## Video Demonstration

.....
