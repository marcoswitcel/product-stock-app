import axios from 'axios';

export class ProducTypeRepository {
  /**
   * Realiza o envio do novo produto para cadastro e retorna os dados do produto cadastrado
   * com o id
   *
   * @param {object} model
   * @returns {Promise<object>}
   */
  static async add (model) {
    try {
      const response = await axios.post('/api/v1/product-movement', model);
      return response.data;
    } catch (error) {
      return { error };
    }
  }

  /**
   * Retorna todos os registro do banco por hora
   *
   * @returns {Promise<{ data: any[]}> | Promise<{ error: any}> }
   */
  static async getAll () {
    try {
      const response = await axios.get('/api/v1/product-type');
      return { data: response.data };
    } catch (error) {
      return { error };
    }
  }
}

export default ProducTypeRepository;
