import axios from 'axios';

export class ProducTypeRepository {
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
