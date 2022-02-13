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

  /**
   * Atualiza os dados de um produto
   *
   * @param {object} model
   * @param {number} id
   * @returns {Promise<object>}
   */
  static async update (model, id) {
    try {
      const response = await axios.put(`/api/v1/product/${id}`, model);
      return response.data;
    } catch (error) {
      return { error };
    }
  }

  /**
   * Retorna todos os registro do banco por hora
   *
   * @param {object} param0
   * @param {number} param0.page
   * @param {type} [param0.page]
   *
   * @returns {Promise<{ data: any[]}> | Promise<{ error: any}> }
   */
  static async getAll ({ page = 0, type }) {
    try {
      const response = await axios.get('/api/v1/product', {
        params: {
          page,
          type
        }
      });
      return { data: response.data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Retorna os dados do relatório
   *
   * @param {object} param0
   * @param {type} [param0.page]
   *
   * @returns {Promise<{ data: any[]}> | Promise<{ error: any}> }
   */
  static async getReport ({ type }) {
    try {
      const response = await axios.get('/api/v1/products/report', {
        params: {
          type
        }
      });
      return { data: response.data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Retorna todos os registro do banco por hora, sem paginação
   *
   * @returns {Promise<{ data: any[]}> | Promise<{ error: any}> }
   */
  static async getAllUnpaged () {
    try {
      const response = await axios.get('/api/v1/product');
      return { data: response.data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Busca e retorna o registro por id
   *
   * @param {number} id Id do produto que deve ser retornado
   * @returns {Promise<object>}
   */
  static async getById (id) {
    try {
      const response = await axios.get(`/api/v1/product/${id}`);
      return response.data;
    } catch (error) {
      return { error };
    }
  }

  /**
   * Deleta o registro da base de dados
   *
   * @param {number} id Id do produto que deve ser retornado
   * @returns {Promise<object>}
   */
  static async delete (id) {
    try {
      const response = await axios.delete(`/api/v1/product/${id}`);
      return response.data;
    } catch (error) {
      return { error };
    }
  }
}

export default ProductRepository;
