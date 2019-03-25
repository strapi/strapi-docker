'use strict';

/**
 * Comission.js controller
 *
 * @description: A set of functions called "actions" for managing `Comission`.
 */

module.exports = {

  /**
   * Retrieve comission records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.comission.search(ctx.query);
    } else {
      return strapi.services.comission.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a comission record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.comission.fetch(ctx.params);
  },

  /**
   * Count comission records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.comission.count(ctx.query);
  },

  /**
   * Create a/an comission record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.comission.add(ctx.request.body);
  },

  /**
   * Update a/an comission record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.comission.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an comission record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.comission.remove(ctx.params);
  }
};
