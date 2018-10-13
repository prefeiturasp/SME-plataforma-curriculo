Pra você que tá chegando agora e veio por conta do hacktoberfest, esse é o repositório central e as issues estão nele, mas ele é basicamente infra. O repositório em rails é esse:  [plataforma curriculo API](https://github.com/prefeiturasp/SME-plataforma-curriculo-API) issues com a tag API viram PRs nele.
e o react é esse aqui:  [plataforma curriculo interface](https://github.com/prefeiturasp/SME-plataforma-curriculo-interface) issues com a tag interface viram PRs nele.

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
Para que docentes e comunidade tenham acesso as orientações didáticas e materiais de apoio propostos nas escolas Municipais da Cidade de São Paulo atraves de uma platafoma informatizada, a Secretária Municipal de educação, por meio da iniciativa de governo aberto [Pátio Digital](http://patiodigital.prefeitura.sp.gov.br/), está em processo de implantação digital do curriculo da cidade.

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

1) Clone este repositório, entre na pasta e rode `git submodule init` e `git submodule update` para clonar também os outros repositórios envolvidos no projeto.
2) [Instale](https://docs.docker.com/compose/install/) `docker` e `docker compose`.
3) Existem 3 arquivos de ambiente que devem ser configurados.  
  a) `.env.postgresql`, com arquivo de exemplo em `sample.env.postgresql`. Nele você vai definir as configurações de banco de dados. Você pode escolher estes dados.
  b) `.env.api`, com arquivo de exemplo em `sample.env.api`. Você também pode escolher uma `SECRECT_KEY` qualquer.
  c) `.env.interface`, com arquivo de exemplo em `sample.env.interface`.
4) Você ainda vai precisar exportar duas variáveis de ambiente, da pasta raíz deste repositório, de um terminal bash, execute

```bash
export APP_ROOT=$(pwd)
export APP_ENV=development " Pode ser production também
```

5) Construa as imagens com `docker-compose build`.
6) Suba os containers com `docker-compose up`.
7) Acesse a aplicação em `0.0.0.0` pelo browser. A URL da API está em `interface/src/constants.js`.
8) Execute as migrações com `docker-compose exec api bundle exec rake db:migrate`.
9) Alimente o banco de dados com `docker-compose exec api bundle exec rake db:seed`.

## Testando

Os testes são feitos com `rspec` que é instalado no container do `docker`. Para rodar os testes:

```docker-compose exec api bundle exec rspec```

---

Baseado no Readme do [i-educar](https://github.com/portabilis/i-educar)

