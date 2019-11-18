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
4. [Instalação Local](#instalação-local-desenvolvimento)
5. [Instalação Remota](#instalação-remota-produção)
6. [Deploy](#deploy)


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

## Instalação Local (desenvolvimento)

1) Clone este repositório, entre na pasta e rode `git submodule init` e `git submodule update` para clonar também os outros repositórios envolvidos no projeto.
2) [Instale](https://docs.docker.com/compose/install/) `docker` e `docker compose`.
3) Existem 3 arquivos de ambiente que devem ser configurados.  
  a) `.env.postgresql`, com arquivo de exemplo em `sample.env.postgresql`. Nele você vai definir as configurações de banco de dados. Você pode escolher estes dados.
  b) `.env.api`, com arquivo de exemplo em `sample.env.api`. Você também pode escolher uma `SECRECT_KEY` qualquer.
  c) `.env.interface`, com arquivo de exemplo em `sample.env.interface`.
4) Para buscar informações da API desenvolvida localmente em vez da de produção, altere o arquivo `interface/src/constants.js` para que a variável exportada `API_URL = http://0.0.0.0`
5) Você ainda vai precisar exportar duas variáveis de ambiente, da pasta raíz deste repositório, de um terminal bash, execute

```bash
export APP_ROOT=$(pwd)
export APP_ENV=development " Pode ser production também
```

6) Construa as imagens com `docker-compose build`.
7) Suba os containers com `docker-compose up`.
8) Acesse a aplicação em `0.0.0.0` pelo browser.
9) Execute as migrações com `docker-compose exec api bundle exec rake db:migrate`.
10) Alimente o banco de dados com `docker-compose exec api bundle exec rake db:seed`.

## Instalação remota (produção)

1) Usando o projeto [openconnect](https://github.com/dlenski/openconnect) com suporte ao "palo alto globalprotect" é possivel conectar a vpn da pmsp com o comando:
```sh
$ sudo openconnect --protocol=gp vpn1.sme.prefeitura.sp.gov.br -u usuariovpn --servercert pin-sha256:tshIkwa9zrqyIwxzcH+KbtEE0YnsYijhHM1nVCI0Moo=
```
2) Conectar com o servidor interno no ip `10.50.0.147` com o usuario ssh forcenido pela prefeitura `ssh usuariossh@10.50.0.147`.
3) Criar swarm em produção:
```sh
$ sudo docker swarm init
> docker swarm join --token SWMTKN-1-5chx61bfz2e5e36alhzzv8sffz00080rrpp7bee8m2r15ytx9g-7vaym1i50bzh75f28rsgg53ab 10.50.0.147:2377
```
4) Se houver mais de um servidor remoto pode se utilizar o comando fornecido acima para conectar varias maquinas e criar um load-balancer.
5) Criar secrets que serão usados pelos containers, os secrets estão listados no final do arquivo `swarm.production.yml`, para criar um: `print "senhadopostgresql" | docker secret create POSTGRES_PASSWORD -`.
6) Fazer login no `registry` da prefeitura, isso evita problemas ao publicar os containers na etapa de deploy: `docker login -u usuarioregistry -p senharegistry registry.sme.prefeitura.sp.gov.br`.

## Deploy

1) Conectar a VPN usando [openconnect](https://github.com/dlenski/openconnect):
```sh
$ sudo openconnect --protocol=gp vpn1.sme.prefeitura.sp.gov.br -u usuariovpn --servercert pin-sha256:tshIkwa9zrqyIwxzcH+KbtEE0YnsYijhHM1nVCI0Moo=
```
2) Se houver mudança na API, Interface ou qualquer outro projeto faça a geração de novas imagens e publique no `registry` da prefeitura:
     a) Gerar todas as imagens `docker-compose -f swarm.production.yml build` ou gerar somente a imagem de um projeto `docker-compose -f swarm.production.yml build api`.
     b) Verifique se esta autenticado com o `registry` da prefeitura, se não faça o login usando `docker login -u usuarioregistry -p senharegistry registry.sme.prefeitura.sp.gov.br`.
     c) Publicar imagens no `registry` da prefeitura `docker push registry.sme.prefeitura.sp.gov.br/curriculo/interface:latest`, faça isso para cada imagem alterada.
3) Criar tunnel SSH e expor docker host:
```sh
$ ssh -p 22 -fNL localhost:2374:/var/run/docker.sock usuariossh@10.50.0.147
$ export DOCKER_HOST=tcp://localhost:2374
```
4) Deploy é feito pelo comando:
```sh
$ docker stack deploy -c swarm.production.yml curriculum --with-registry-auth
```

## Testando

Os testes são feitos com `rspec` que é instalado no container do `docker`. Para rodar os testes:

```docker-compose exec api bundle exec rspec```

---

Baseado no Readme do [i-educar](https://github.com/portabilis/i-educar)

