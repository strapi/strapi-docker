'use strict';

/**
 * Farmer.js controller
 *
 * @description: A set of functions called "actions" for managing `Farmer`.
 */

module.exports = {

  /**
   * Retrieve farmer records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.farmer.search(ctx.query);
    } else {
      return strapi.services.farmer.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a farmer record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.farmer.fetch(ctx.params);
  },

  /**
   * Count farmer records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.farmer.count(ctx.query);
  },

  /**
   * Create a/an farmer record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.farmer.add(ctx.request.body);
  },

  /**
   * Update a/an farmer record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.farmer.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an farmer record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.farmer.remove(ctx.params);
  }
};
