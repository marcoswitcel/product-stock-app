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
          <th scope="col">Preço</th>
          <th scope="col">Quantidade</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry of collectionData" :key="entry.id" :class="{ 'pe-none': entry.placeholder}">
          <th scope="row">{{ entry.id }}</th>
          <td>{{ entry.description }}</td>
          <td>{{ entry.price }}</td>
          <td>{{ entry.quantityInStock }}</td>
          <td v-if="entry.placeholder">
            <button class="btn btn-danger btn-sm ms-1 invisible" type="button">Não visivel</button>
          </td>
          <td v-else>
            <router-link class="btn btn-sm btn-primary" :to="{ name: 'Produto.Visualizacao', params: { id:  entry.id } }">Visualizar</router-link>
            <router-link class="btn btn-sm btn-primary mx-1" :to="{ name: 'Produto.Edicao', params: { id:  entry.id } }">Editar</router-link>
            <button v-if="!entry.deletingState" type="button" class="btn btn-sm btn-danger mx-1" @click="handleDeleteRequest(entry)">Deletar</button>
            <button v-if="entry.deletingState" class="btn btn-danger btn-sm ms-1" type="button">
              Deletando ... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Paginação" class="d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item"><button class="page-link" :disabled="this.page < 1" @click="this.page--">Anterior</button></li>
        <li class="page-item"><button class="page-link" href="#">{{ this.page + 1}}</button></li>
        <li class="page-item"><button class="page-link" @click="this.page++">Próximo</button></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import ProductRepository from '../../libs/repository/ProductRepository.js';
import ProducTypeRepository from '../../libs/repository/ProducTypeRepository.js';
import Swal from 'sweetalert2';

export default {
  name: 'ProdutoListagem',
  data () {
    return {
      page: 0,
      type: '',
      collectionData: this.fillWithPlaceholders([]),
      productTypeCollection: []
    };
  },
  watch: {
    type (to, from) {
      this.page = 0;
      this.updateCollection();
    },
    page (to, from) {
      this.updateCollection();
    }
  },
  methods: {
    fillWithPlaceholders (data) {
      while (data.length < 10) {
        data.push({ placeholder: true });
      }

      return data;
    },
    async updateCollection () {
      const response = await ProductRepository.getAll({
        page: this.page,
        type: this.type
      });

      if (response.error) {
        // eslint-disable-next-line
          console.trace(response.error);
      } else {
        this.collectionData = this.fillWithPlaceholders(response.data);
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
