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
            <button v-if="!entry.deletingState" type="button" class="btn btn-sm btn-danger mx-1" @click="handleDeleteRequest(entry)">Deletar {{ entry.id }}</button>
            <button v-if="entry.deletingState" class="btn btn-danger btn-sm ms-1" type="button">
              Deletando ... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductRepository from '../../libs/repository/ProductRepository.js';
import Swal from 'sweetalert2';

export default {
  name: 'ProdutoListagem',
  data () {
    return {
      collectionData: []
    };
  },
  methods: {
    async updateCollection () {
      const response = await ProductRepository.getAll();

      if (response.error) {
        // eslint-disable-next-line
          console.trace(response.error);
      } else {
        this.collectionData = response.data;
      }
    },
    async handleDeleteRequest (product) {
      const id = product.id;

      const userChoice = await Swal.fire({
        title: `Deseja mesmo deletar o produto com id=${id}?`,
        text: 'Essa ação é permanente',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
      });

      if (userChoice.isConfirmed) {
        product.deletingState = true;
        const response = await ProductRepository.delete(id);

        if (response.error) {
          Swal.fire(
            'O registro não pode ser deletado',
            `Produto com id = ${id} não deletado`,
            'warning'
          );
          product.deletingState = false;
        } else {
          Swal.fire(
            'Registro deletado!',
            `Produto com id = ${id} deletado`,
            'success'
          );
          this.updateCollection();
        }
      }
    }
  },
  created () {
    this.updateCollection();
  }
};

</script>
