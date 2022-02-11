import axios from 'axios';

export class ProductRepository {
  /**
   * Realiza o envio do novo produto para cadastro e retorna os dados do produto cadastrado
   * com o id
   *
   * @param {object} model
   * @returns {Promise<object>}
   */
  static async add (model) {
    try {
      const response = await axios.post('/api/v1/product', model);
      return response.data;
    } catch (error) {
      return { error };
    }
  }
}

export default ProductRepository;
