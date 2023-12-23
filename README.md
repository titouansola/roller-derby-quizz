# Roller Derby Quizz Application

## Introduction
This project is based on Next.js + TypeScript.

It imports [shadcn/ui](https://ui.shadcn.com/docs) components, please use as much as possible the lib.

Data are stored using `@vercel/postgres` which is based on [Neon serverless Postgres](https://neon.tech/).


## Installation
### Database
In order to run locally this project, you will have to use Neon.

Once your serverless DB is created, create a file `.env.development.local` and put your own credentials in it.

- **Do not commit these information**.
- *Make sure you're using **pooled** connection.*

#### .env example
```dotenv
# Feel free to use your own database name
POSTGRES_DATABASE='roller_derby_quizz'
POSTGRES_USER='[username]'
POSTGRES_PASSWORD='[password]'
POSTGRES_URL="postgres://[username]:[password]@[url]/roller_derby_quizz"
```

Then import `arch.sql` (find it in `database` folder) using your favorite SQL GUI or directly in Neon SQL Editor (copy and paste content).

### Codebase
Checkout `dev` branch before any branch creation.

Nothing complicated here, run these commands in your terminal :
```shell
npm install
npm run dev
```

## Participation
Please make sure your *Pull Requests* are targeting the `dev` branch, never `main`.
