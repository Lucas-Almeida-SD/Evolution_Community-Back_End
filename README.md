# Evolution Community - Back End

[Link](https://github.com/Lucas-Almeida-SD/Evolution_Community-Front_End) para acessar o repositório da parte `front-end` do projeto.

O projeto consiste em uma aplicação `fullstack` para cadastrar usuários em comunidades específicas, com o objetivo de receber informações sobre assuntos relacionados às respectivas comunidades, além de concorrerem a prêmios incríveis.

A parte `back-end` consiste em um `API` no qual permite ao cliente realizar requisições para ler, criar, atualizar e remover informações de usuários no banco de dados. 

Para que essas requisições sejam aceitas, são executadas validações de algumas informações enviadas pelo cliente, para que posteriormente o mesmo tenha acesso ao banco de dados.

Para o desenvolvimento desta parte da aplicação, foi utilizado POO para melhor estruturação do código, e a `arquitetura de software MSC`, para melhor organização e divisão das responsabilidades da aplicação.

## Tecnologias

- [Node.js](https://nodejs.org/en/)

- [Express](https://expressjs.com/pt-br/)

- [TypeScript](https://www.typescriptlang.org/)

- [Firebase](https://firebase.google.com/)

- [joi](https://joi.dev/)

- [JWT](https://jwt.io/)

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

- [ESlint](https://eslint.org/)

- [date-fns](https://date-fns.org/)





## Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:Lucas-Almeida-SD/Evolution_Community-Back_End.git
$ cd Evolution_Community-Back_End
```

Para iniciá-lo, siga os passos abaixo:
```bash
# Instalar as dependências
$ npm install

# Iniciar o projeto
$ npm start
```
O app estará disponível no seu browser pelo endereço http://localhost:3001.

Lembrando que será necessário criar uma conta no Firebase e um projeto para disponibilizar o banco de dados Firestore. Após isso, insira as credenciais do seu projeto Firebase no arquivo `.env.example` e renomeie-o para `.env`. Além disso, você terá que adicionar a sua `secret` do JWT na variável de ambiente especificada.
