import models from '@models';
import BaseService from './base.service';

const {
  Sequelize: { Op }
} = models;

class UserService extends BaseService {
  /**
   * Get a list of user resources
   *
   * @param {object} data - The resource data
   * @param {object} options - Query options
   * @returns {object} The newly created resource
   * @memberof UserService
   */
  async getAll(options) {
    const rows = await super.getAll({
      order: [['id', 'ASC']]
    });

    if (options.plain === true) {
      const result = rows.map(row => {
        const data = row.get({ plain: true });
        delete data.password;
        return data;
      });

      return result;
    }

    return rows;
  }

  /**
   * Get a specific user resource by id
   *
   * @param {object} data - The resource data
   * @param {object} options - Query options
   * @returns {object} The newly created resource
   * @memberof UserService
   */
  async getById(id, options) {
    const result = await super.getById(id);

    if (result && options && options.plain === true) {
      const data = result.get({ plain: true });

      delete data.password;
      return data;
    }

    return result;
  }

  /**
   * Create a new user resource
   *
   * @param {object} data - The resource data
   * @param {object} options - Query options
   * @returns {object} The newly created resource
   * @memberof UserService
   */
  async create(data, options) {
    const result = await super.create(data, options);

    delete result.password;
    return result;
  }

  /**
   * Update a specific user resource
   *
   * @param {number} id - The resource unique identifier
   * @param {object} data - The resource new data
   * @returns {number} The number of affected row(s)
   * @memberof BaseService
   */
  async update(id, data) {
    const result = await super.update(id, data);

    delete result.password;
    return result;
  }

  /**
   * Get a specific user by email
   *
   * @param {number} email - The resource unique email
   * @param {object} options - Query options
   * @returns {object} The resource (if found)
   * @memberof UserService
   */
  async getByEmail(email, options = {}) {
    const result = await this.model.findOne({
      where: { email }
    });

    const { plain } = options;
    return plain === true ? result.get({ plain }) : result;
  }
}

const { User } = models;
export default new UserService(User);
