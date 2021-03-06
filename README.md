# Repositório Rest Api - Auditoria de Sites com Lighthouse

Contém aplicação NodeJS com Express e [bull](https://github.com/OptimalBits/bull) que recebe uma url qualquer e retorna relatório completo através do [Lighthouse](https://www.npmjs.com/package/lighthouse). Cada relatório é processado em off no servidor e vai para um banco de dados Redis.

## Ambiente de desenvolvimento

Necessário ter um Redis em execução antes de iniciar, por padrão a rest api se conecta com `redis://127.0.0.1:6379`. É possível criar um banco através do docker:

```bash
>> docker run --name redis -p 6379:6379 -d redis:alpine
```

Instalação de dependências:

```bash
>> yarn install
```

Execução:

```bash
>> yarn run dev
```

## Ambiente de produção

A aplicação é pensada para deploy no Heroku, dessa forma instale a ferramenta `heroku-cli` seguindo instruções do [link](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) e prossiga:

```bash
>> heroku create
>> git push heroku main
```

Adicione o add-on Heroku Redis:

```bash
>> heroku addons:create heroku-redis:hobby-dev
```

Mais informações no [link](https://devcenter.heroku.com/articles/git).

## Rotas

- **GET** / - check da API
- **POST** /audit - executa auditoria de algum site e retorna ID do job

  ```bash
  // Body da requisição
  {
    "url_site": "https://asimovjr.com.br"
  }
  ```

- **GET** /audit/:id - retorna status e relatório de um ID

## Referências

- [masterclass-nodejs-background-jobs](https://github.com/rocketseat-content/masterclass-nodejs-background-jobs)
- [Worker Dynos](https://devcenter.heroku.com/articles/background-jobs-queueing)
- [Heroku-Redis](https://elements.heroku.com/addons/heroku-redis)
