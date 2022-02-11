<template>
  <form action="" method="post" class="text-start bg-white p-5" :class="{ 'was-validated': wasValidated}" @submit="checkForm">

    <input v-if="this.isUpdating" type="hidden" name="id" :value="registry.id" >

    <div class="mb-3">
      <label for="input_description" class="form-label">Descrição do produto</label>
      <input type="text" class="form-control" id="input_description" name="input_description" required>
    </div>

    <div class="mb-3">
      <label for="input_productType" class="form-label">Tipo do produto</label>
      <select id="input_productType" class="form-select" name="productType" aria-label="Selecione o tipo do produto" required>
        <option hidden disabled selected value="">Selecione o tipo do produto</option>
        <option value="1">Eletrônico</option>
        <option value="2">Eletrodoméstico</option>
        <option value="3">Móvel</option>
      </select>
    </div>

    <div class="mb-3">
      <label for="input_price" class="form-label">Preço</label>
      <input type="number" class="form-control" id="input_price" name="input_price" required>
    </div>

    <div class="mb-3">
      <label for="input_quantityInStock" class="form-label">Quantidade em estoque</label>
      <input type="number" class="form-control" id="input_quantityInStock" name="input_quantityInStock" min="0" step="1" required>
    </div>

    <button type="submit" class="btn btn-primary">Cadastrar</button>
  </form>
</template>

<script>

export default {
  name: 'FormProduto',
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
    return {
      isUpdating: !!this.registry,
      sendingState: false,
      wasValidated: false
    };
  },
  methods: {
    async checkForm (event) {
      event.preventDefault();
    }
  }
};

</script>
