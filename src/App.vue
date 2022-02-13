<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-2">
        <router-link :to="{ name: 'Produto.Listagem'}" class="btn btn-sm btn-primary m-1">Lista de Produtos</router-link>
        <router-link :to="{ name: 'Produto.Cadastro'}" class="btn btn-sm btn-primary m-1">Cadastrar Novo Produto</router-link>
        <router-link :to="{ name: 'MovimentoProduto.Cadastro'}" class="btn btn-sm btn-primary m-1">Cadastrar Novo Movimento</router-link>
        <router-link :to="{ name: 'Relatorio.LucrosETotais'}" class="btn btn-sm btn-primary m-1">Visualizar lucro e saída totais por produto</router-link>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
