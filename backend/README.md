### Ejam API - Humble Superhero API

### Prerequisites
- Node.js (v22.13.1) ([fnm](https://github.com/Schniz/fnm) for managing node versions)
- Docker and Docker Compose
- Make (optional, for using docker commands)

### Environment Setup
The project uses two environment files:
- `.env` for production
- `.env.local` for development
- Setup `.env.local` file by running: `cp .env.example .env.local`

### Run locally
- Install all dependencies `fnm use && npm install`
-  Run `npm run start:dev` to start the server
-  Go to [http://localhost:8080](http://localhost:8080) to see the app
-  Go to [http://localhost:8080/api/docs](http://localhost:8080/api/docs) to see the swagger docs
* Note: If you want to seed the database with superheroes, run `npm run start:dev:seed`


### Run tests
-  Run test  `npm run test`
-  Run test and watch for changes `npm run test:watch`
-  Run test and generate a coverage report `npm run test:cov`
-  Run test and generate a coverage report and open in browser `npm run preview:coverage`


### Given more time, things I would have done
- Implement PostgreSQL with Prisma ORM, or TypeORM for better type safety and database migrations
- Add Redis caching layer to improve API response times
- Set up BullMQ for handling background jobs and queues
- Implement user authentication and authorization using AWS Cognito, or Clerk
- Add real-time updates using Socket.IO, websockets for superhero status changes
- Implement rate limiting and request throttling
- Set up CI/CD pipeline with automated testing and deployment
- Add monitoring and logging using tools like Winston/Pino, along with it's monitoring on Grafana
- Implement database indexing strategies for better query performance
- Set up automated database backups and disaster recovery
