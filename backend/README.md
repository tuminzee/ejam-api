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

### Setup & Run
1. Run `make up-watch` to start a container with watch mode
2. Go to [http://localhost:8080](http://localhost:8080) to see the app
3. Go to [http://localhost:8080/api/docs](http://localhost:8080/api/docs) to see the swagger docs

### Run tests

1. Run test  `npm run test`
2. Run test and watch for changes `npm run test:watch`
3. Run test and generate a coverage report `npm run test:cov`
4. Run test and generate a coverage report and open in browser `npm run preview:coverage`

