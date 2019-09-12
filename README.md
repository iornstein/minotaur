# Minotaur
Minotaur will display helpful information about your project! Right now the documented behavior is 
- it displays the days since you have last deployed since production. Hopefully this can remind you to keep that number
as low as possible `:)`.
- it displays the tracker project name and current velocity and volatility. Admittedly, These are not incredibly helpful.

## configure the app
This application needs to communicate to tracker. You will need to find your `projectId` and your `trackerToken`.
To find the `projectId`, simply look in the url. For example, the url for the minotaur tracker project is 
`https://www.pivotaltracker.com/n/projects/2383136` and therefore the projectId is `2383136`.

You can find your tracker token in your tracker account profile. [Read this link](https://www.pivotaltracker.com/help/articles/api_token/) for more details.
This is a private token per user. 

Make sure you set both of those values in the indicated places within `backend/src/main/resources/application.yml`.
## how to run
You can run this with [docker](https://docs.docker.com/docker-for-mac/install/). Simply run `docker-compose up --build`. 
You can visit the front-end at `http:localhost:3000`