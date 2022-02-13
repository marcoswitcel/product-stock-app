# App de controle de estoque

Um app de controle de estoque desenvolvido com Vue3 e Bootstrap5.
O repositório do backend se encontra aqui: [https://github.com/marcoswitcel/restfulwebapi](https://github.com/marcoswitcel/restfulwebapi)

## Setup do projeto

Primeiro clone o projeto, navegue para a pasta raíz e rode o comando `npm install` para instalar as dependências.

```
git clone https://github.com/marcoswitcel/product-stock-app.git
cd product-stock-app
npm install
```

Para testar use o server de desenvolvimento.

### Server de desenvolvimento

Para rodar o serve de desenvolvimento, rode o comando `npm run serve` na paz raíz do projeto.
O app vai rodar na porta 3000, foi modificado para não conflitar com a porta padrão do SpringBoot.
O app também usa um proxy reverso configurado no arquivo `vue.config.js` para direcionar as requests para o backend rodando em localhost:8080.

```
npm run serve
```

### Comando para o build de produção

```
npm run build
```

### Referência de configuração

Ver mais [Configuration Reference](https://cli.vuejs.org/config/).

### DevServer & Proxy

* Regra de proxy que redireciona as request para o backend [https://cli.vuejs.org/config/#devserver-proxy](https://cli.vuejs.org/config/#devserver-proxy).

