# Friendworld is currently in read-only mode
- The original version of friendworld included a backend, built in postgresql with postgraphile used to generate a graphql api. A small node service was used to handle chat and post bots.


# Development
(Using node v10.2.1)
## DB
- Run all of the files in `./api/sql` against a postgres db

## API
- Add a `.env` file to `./api` with the following environment variabels set: `SQL_PASSWORD`, `JWT_SECRET`, `STEVE_JWT`, `DUMBO_JWT`, `FUCKFACE_JWT`, `VINCE_JWT`, `HEATHER_JWT`. The JWT variables should be the login JWTs for users `steve`, `DumboTheClown`, `vinceslickson`, and `heatherhot6`. These must be set for the chat bots to work properly.
- `cd ./api && npm install && npm run dev:start`

## API
- `cd ./ui && npm start`

# Deployment
## setup
### General
- Revert commit `e7eb21e`, which made the site read-only

### GCP
- (I already have a `friendworld` gcp project set up for this with a closed billing account)
- Create a new gcp project for friendworld.
- Create a bucket called `envvars-<PROJECT NAME>`
- Create App Engine and Cloud SQL instances
- update the `cloud_sql_instances` property in `./api/app.yaml`
- Run all of the files in `./api/sql` against a postgres db. To ssh into the db, run `gcloud sql connect <DB NAME> --user=postgres --quiet`
- See `Cloud_SQL_Export...` in the root directory for the latest db dump
- install: https://cloud.google.com/sdk/docs/quickstart-macos
- `gcloud init` in friendworld directory

### API
- Add a `.env` file to `./api` with the following environment variabels set: `SQL_PASSWORD`, `JWT_SECRET`, `STEVE_JWT`, `DUMBO_JWT`, `FUCKFACE_JWT`, `VINCE_JWT`, `HEATHER_JWT`. The JWT variables should be the login JWTs for users `steve`, `DumboTheClown`, `vinceslickson`, and `heatherhot6`. These must be set for the chat bots to work properly.
- upload `.env` to the `envvars-<PROJECT NAME>` bucket
- Update the prod DB_URL `host` property in `./api/src/config.ts`
- `cd api`
- `npm run build && npm run deploy`

#### Debugging
- `gcloud app logs tail -s default`

### UI
- Update the prod api url in`./ui/src/index.tsx`
- `cd ui`
- `npm run build && npm run deploy`

### Websites
- There probably needs to be some setup for firebase in here
- (from root) `firebase deploy`




