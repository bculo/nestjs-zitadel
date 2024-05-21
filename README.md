# NESTJS-ZITADEL

An demo app that shows integration between nestjs application and user management system Zitadel. NestJS application was created using Nx tooling. For integration with Zitadel, application relies on passport.js library. There are also some database communication samples (1-N, N-N relationship) implemented using TypeORM. DB stuff is placed in separated library and is responsible for defining entity types and migrations. Migrations scripts are located inside project.json file

## Project authentication / authorization configuration

- Start docker container instances using docker compose command

  ```
  docker-compose up -d
  ```

- Open your favorite browser and go to http://localhost:8080/ui/console/

- Login as owner and change default credentials

  - username: zitadel-admin@zitadel.localhost
  - password: Password1!

- Create new project

- create swagger app

  - add app for swagger UI client (generate user JWT token)
  - New, Web type, Auth method is Auth code with PKCE, redirect uri http://{host}/swagger/oauth2-redirect.html and Development mode ON
  - visit Token settings tab and select JWT option from 'Auth Token Type' dropdown. Also, check 'Add user roles to the acces token' checkbox
  - copy client ID and set 'ZITADEL_SWAGGER_CLIENT_ID' value in 'env' file

- create backend API app (API endpoint protection)

  - add app for backend API client
  - New, API, Auth method JWT
  - In configuration tab create new Keys. Copy generated/downloaded json and paste it into ZitadelAuthModule configuration inside app.module.ts

- create user service (usage of USER API)
  - add service user
  - assign 'ORG User Manager' role
  - generate service user secrets and fill ZITADEL*SERVICE_USER*\* values inside env file

## Project db configuration

- install all dependencies

  ```
  pnpm install
  ```

- create PostgreSQL database with name todo
- execute created migrations (located inside db library)

  ```
  pnpm run migration:run
  ```

## Start application

```
nx serve todo
```
