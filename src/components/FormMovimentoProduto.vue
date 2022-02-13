<template>
  <form action="" method="post" class="text-start bg-white p-5" :class="{ 'was-validated': wasValidated}" @submit="checkForm">
    <fieldset :disabled="readOnlyMode">
      <input v-if="this.isUpdating" type="hidden" name="id" :value="registry.id" >

      <div class="mb-3">
        <label for="input_product" class="form-label">Selecione o produto</label>
        <select id="input_product" v-model="model.product.id" class="form-select" name="input_product" aria-label="Selecione o tipo do produto" required>
          <option hidden disabled selected value="">Selecione o tipo do produto</option>
          <option v-for="entry of productCollection" :key="entry" :value="entry.id">{{entry.description}}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="input_price" class="form-label">Preço</label>
        <select id="input_price" v-model="model.type" class="form-select" name="input_price" aria-label="Selecione o tipo do produto" required>
          <option hidden disabled selected value="">Selecione o tipo de movimentação</option>
          <option value="PURCHASE">Compra</option>
          <option value="SALE">Venda</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="input_description" class="form-label">Quantidade da movimentação</label>
        <input type="number" min="0" step="1" v-model="model.quantity" class="form-control" id="input_description" name="input_description" required>
      </div>

    </fieldset>

    <div class="d-flex justify-content-center">
      <router-link :to="{ name: 'Produto.Listagem' }" class="btn btn-secondary m-1">Voltar</router-link>
      <button v-if="!this.readOnlyMode" type="submit" class="btn btn-primary">Cadastrar</button>
    </div>
  </form>
</template>

<script>
import ProductRepository from '../libs/repository/ProductRepository.js';
import ProducTypeRepository from '../libs/repository/ProducTypeRepository.js';

export default {
  name: 'FormMovimentoProduto',
  props: {
    registry: {
      type: Object,
      required: false,
      default: null
    },
    readOnlyMode: {
      type: Boolean,
      requried: false,
      default: false
    }
  },
  data () {
    const model = (this.registry) ? this.registry : {
      product: { id: '' },
      type: '',
      quantity: ''
    };

    return {
      isUpdating: !!this.registry,
      sendingState: false,
      wasValidated: false,
      model,
      productCollection: []
    };
  },
  methods: {
    async checkForm (event) {
      event.preventDefault();

      const response = await ProducTypeRepository.add(this.model);

      if (response.error) {
        // eslint-disable-next-line
        console.trace(response.error);
      } else {
        this.$router.push({ name: 'Produto.Listagem' });
      }
    }
  },
  async created () {
    const response = await ProductRepository.getAllUnpaged();

    if (response.error) {
      // eslint-disable-next-line
      console.trace(response.error);
    } else {
      this.productCollection = response.data;
    }
  }
};

</script>
