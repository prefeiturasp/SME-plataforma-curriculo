# SME-plataforma-curriculo

Application uses docker and docker compose

Config:

API url is at: <br>
`interface/src/constants.js`

rename `sample.env.postgresql` to `.env.postgresql` and add database config <br>
example:
```POSTGRES_DB=db_name
POSTGRES_DB_TEST=test_db_name
POSTGRES_HOST=postgresql
POSTGRES_USER=someuser
POSTGRES_PASSWORD=somepass
```

rename `sample.env.api` to `.env.api` and add api config <br>
example:
```RAILS_MAX_THREADS=5
PUMA_PORT=8666
APP_PATH=/app
SECRET_KEY=secret_key
```

rename `sample.env.interface` to `.env.interface` and add interface environment <br>
example: <br>
```APP_ENV=production```

Build images: <br>
```docker-compose build```

Up containers: <br>
```docker-compose up```

run migrations <br>
```docker-compose exec api bundle exec rake db:migrate``` <br>
run seeds <br>
```docker-compose exec api bundle exec rake db:seed```

Running tests: <br>
```docker-compose exec api bundle exec rspec```
