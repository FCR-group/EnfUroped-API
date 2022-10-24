[![EnfUroped_API CI](https://github.com/FCR-group/EnfUroped-API/actions/workflows/githubActions.yml/badge.svg)](https://github.com/FCR-group/EnfUroped-API/actions/workflows/githubActions.yml)

# Uroped API

O EnfUroped API é uma "REST API" que alimenta a aplicação [EnfUroped-client](https://github.com/FCR-group/EnfUroped-Client), confira vários documentos úteis sobre o projeto no repositório [EnfUroped-docs](https://github.com/FCR-group/EnfUroped-Docs).

> Este app é feito usando nodejs 16-lts e express 4.17, confira o arquivo package.json com todas as dependências do projeto.

# Configurando o ambiente de desenvolvimento

- Para desenvolver esse app é fortemente recomendado o uso do Visual Studio Code com as seguintes extensões instaladas:
  - Eslint
  - Prettier
- Para mais dicas sobre a estrutura do projeto, confira a pasta docs.

# Executando o projeto

- Sua máquina deve ter o NodeJs 16 LTS instalado e configurado em seu path para poder executar o programa, não garantimos suporte a versões anteriores do Node e nem versões sem LTS.

## Iniciar em modo de desenvolvimento

- Para executar o aplicativo use o comando:
  ```
  npm start
  ```

## Iniciar Testes

- Para executar os testes manualmente use o comando:
  ```
  npm test
  ```
- Note que uma pasta chamada coverage deve ter sido criada, abra o arquivo index.html no navegador e veja quais linhas do código não foram testadas.

## Iniciar em modo de produção

- Para testar o aplicativo em modo de produção, é recomendado o uso do docker e docker-compose.
  - Para executar o aplicativo em modo de produção use os seguintes comandos:
    ```
    npm run build
    ```
    ```
    docker-compose up --build
    ```
  - Caso não possa usar o docker, ainda é possível testar o código compilado, porém ele não estará devidamente isolado e nem em modo de produção. Os comandos são:
    ```
    npm run build
    npm run start:deploy
    ```

# Regras para contribuir

- Os testes são responsabilidade do desenvolvedor e devem ser feitos/atualizados para cada uma das funcionalidades criadas/atualizadas.
- É proibido fazer commits na branch master, todas as contribuições devem passar por um Pull-Request e serem revisadas.
- É uma boa prática revisar o código e executar os testes antes de fazer um commit.
- Os warnings e errors acusados pelo Eslint e Typescript devem ser corrigidos quando possível (essa regra tem suas excessões, pergunte para o gerente do projeto).

# Nosso time

| Nome                        | Github                                                | Email                       |
| --------------------------- | ----------------------------------------------------- | --------------------------- |
| Eduardo Rodrigues de Farias | [Eduardo-RFarias](https://github.com/Eduardo-RFarias) | eduardo.rfarias@outlook.com |
