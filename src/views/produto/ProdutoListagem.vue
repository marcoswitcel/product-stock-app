<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Descrição</th>
          <th scope="col">Preço</th>
          <th scope="col">Quantidade</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry of collectionData" :key="entry.id">
          <th scope="row">{{ entry.id }}</th>
          <td>{{ entry.description }}</td>
          <td>{{ entry.price }}</td>
          <td>{{ entry.quantityInStock }}</td>
          <td>
            <router-link class="btn btn-sm btn-primary" :to="{ name: 'Produto.Visualizacao', params: { id:  entry.id } }">Visualizar {{ entry.id }}</router-link>
            <router-link class="btn btn-sm btn-primary mx-1" :to="{ name: 'Produto.Edicao', params: { id:  entry.id } }">Editar {{ entry.id }}</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductRepository from '../../libs/repository/ProductRepository.js';

export default {
  name: 'ProdutoListagem',
  data () {
    return {
      collectionData: []
    };
  },
  async created () {
    const response = await ProductRepository.getAll();

    if (response.error) {
      // eslint-disable-next-line
        console.trace(response.error);
    } else {
      this.collectionData = response.data;
    }
  }
};

</script>
