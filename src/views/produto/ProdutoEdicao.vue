<template>
  <FormProduto v-if="loaded" :registry="registry" />
</template>

<script>
import ProductRepository from '../../libs/repository/ProductRepository.js';
import FormProduto from '../../components/FormProduto.vue';

export default {
  name: 'ProdutoEdicao',
  data () {
    return {
      loaded: false,
      registry: null
    };
  },
  components: {
    FormProduto
  },
  async created () {
    const id = +this.$route.params.id;

    const registry = await ProductRepository.getById(id);

    if (registry) {
      this.registry = registry;
      this.loaded = true;
    }
  }
};

</script>
