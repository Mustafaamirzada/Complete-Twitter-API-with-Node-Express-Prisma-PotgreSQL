# Complete-Twitter-API-with-Node-Express-Prisma-PotgreSQL  API with JWT Authentication


<img src="https://nodejs.org/static/logos/nodejsDark.svg" width="400" title="nodejs" alt="nodejs logo Logo" style="padding-left:30px"/>&emsp; 
<img  src="https://www.postgresql.org/media/img/about/press/elephant.png" width="150" title="PostgreSQL" alt="Pstgresql Logo" style="padding-left:30px"/>   &emsp; &emsp;   <space/> <img   src="https://raw.githubusercontent.com/prisma/presskit/main/Assets/Prisma-LightSymbol.svg" width="150" title="Prisma" alt="prisma Logo"/>


## Getting Started

clone the git repository with following command:

```shell
git clone https://github.com/Mustafaamirzada/Complete-Twitter-API-with-Node-Express-Prisma-PotgreSQL.git
```

change to that directory
```
cd Complete-Twitter-API-with-Node-Express-Prisma-PotgreSQL
```

Run the following command to install dependencies:

```shell
npm install
```

### Environment variables

This project depends on some environment variables.
If you are running this project locally, create a `.env` file at the root for these variables.
Your host provider should included a feature to set them there directly to avoid exposing them.

Here are the required ones:

```
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=
NODE_ENV=production
```

### Generate your Prisma client

Run the following command to generate the Prisma Client which will include types based on your database schema:

```shell
npx prisma generate
```

### Apply any SQL migration script

Run the following command to create/update your database based on existing sql migration scripts:

```shell
npx prisma migrate
```

### Run the project

Run the following command to run the project:

```shell
npm run dev
```

