# Pátio Digital

_“Recurso público retorna ao público”._

Nós somos o **pátio digital**, uma iniciativa da Secretaria Municipal de Educação de São Paulo que, por meio do fortalecimento da transparência, da participação social e do desenvolvimento de novas tecnologias, aproxima diferentes grupos da sociedade civil por um objetivo maior: a melhoria da educação na cidade de São Paulo. 

# Plataforma Currículo Digital

## Conteúdo

1. [Sobre o curriculo digital](#sobre-o-curriculo-digital)
2. [Comunicação](#comunicação)
3. [Como contribuir](#como-contribuir)
4. [Instalação](#instalação)


## Sobre o Curriculo Digital

### Nossos outros repositórios

1. [Plataforma curriculo](https://github.com/prefeiturasp/SME-plataforma-curriculo-interface)
2. [Plataforma curriculo API](https://github.com/prefeiturasp/SME-plataforma-curriculo-API)


## Comunicação

| Canal de comunicação | Objetivos |
|----------------------|-----------|
| [Issues do Github](https://github.com/prefeiturasp/SME-plataforma-curriculo/issues) | - Sugestão de novas funcionalidades<br> - Reportar bugs<br> - Discussões técnicas |
| [Telegram](https://t.me/patiodigital ) | - Comunicar novidades sobre os projetos<br> - Movimentar a comunidade<br>  - Falar tópicos que **não** demandem discussões profundas |

Qualquer outro grupo de discussão não é reconhecido oficialmente.

## Como contribuir

Contribuições são **super bem vindas**! Se você tem vontade de construir o
curriculo digital conosco, veja o nosso [guia de contribuição](./CONTRIBUTING.md)
onde explicamos detalhadamente como trabalhamos e de que formas você pode nos
ajudar a alcançar nossos objetivos. Lembrando que todos devem seguir 
nosso [código de conduta](./CODEOFCONDUCT.md).


## Instalação

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


---

Baseado no Readme do [i-educar](https://github.com/portabilis/i-educar)

