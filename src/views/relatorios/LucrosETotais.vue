<template>
  <div class="d-flex justify-content-end">
    <div class="mb-3 w-25 text-end">
      <label for="input_productType" class="form-label">Filtrar por tipo:</label>
      <select id="input_productType" v-model="type" class="form-select" name="input_productType" aria-label=">Filtrar por tipo" required>
        <option value="">Todos os tipos</option>
        <option v-for="entry of productTypeCollection" :key="entry" :value="entry.id">{{entry.name}}</option>
      </select>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Descrição</th>
          <th scope="col">Lucro</th>
          <th scope="col">Vendas totais</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry of collectionData" :key="entry.id" :class="{ 'pe-none': entry.placeholder}">
          <th scope="row">{{ entry.product.id }}</th>
          <td>{{ entry.product.description }}</td>
          <td>{{ entry.profitQuantity }}</td>
          <td>{{ entry.salesQuantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductRepository from '../../libs/repository/ProductRepository.js';
import ProducTypeRepository from '../../libs/repository/ProducTypeRepository.js';
import Swal from 'sweetalert2';

export default {
  name: 'LucrosETotais',
  data () {
    return {
      type: '',
      collectionData: [],
      productTypeCollection: []
    };
  },
  watch: {
    type (to, from) {
      this.page = 0;
      this.updateCollection();
    }
  },
  methods: {
    async updateCollection () {
      const response = await ProductRepository.getReport({
        page: this.page,
        type: this.type
      });

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
            `Produto com id = ${id} não deletado, já possui transações associadas`,
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
  async created () {
    this.updateCollection();

    const response = await ProducTypeRepository.getAll();

    if (response.error) {
      // eslint-disable-next-line
      console.trace(response.error);
    } else {
      this.productTypeCollection = response.data;
    }
  }
};

</script>
