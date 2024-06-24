# Electronics World
Backend component of the application
## Notes
- This backend code base is configured with github actions to deploy inside a docker within an EC2 container. Please check .github/workflows/cicd.yml for further details
- It is integrated with MongoDB Atlas Cluster for database
- Minimum Node.JS version required : V18.20.2
- To install dependencies use `npm install`
- To successfully run the application, use  the command is `npm start`
- A .env file is needed for secrets such as MONGO_PASSWORD , STRIPE_SECRET_KEY


[![Deploy Node Application](https://github.com/manojtatipamula/electronics-world-backend/actions/workflows/cicd.yml/badge.svg?branch=main)](https://github.com/manojtatipamula/electronics-world-backend/actions/workflows/cicd.yml)
