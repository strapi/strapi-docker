'use strict';

/**
 * Csa.js controller
 *
 * @description: A set of functions called "actions" for managing `Csa`.
 */

module.exports = {

  /**
   * Retrieve csa records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.csa.search(ctx.query);
    } else {
      return strapi.services.csa.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a csa record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.csa.fetch(ctx.params);
  },

  /**
   * Count csa records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.csa.count(ctx.query);
  },

  /**
   * Create a/an csa record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.csa.add(ctx.request.body);
  },

  /**
   * Update a/an csa record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.csa.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an csa record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.csa.remove(ctx.params);
  }
};
