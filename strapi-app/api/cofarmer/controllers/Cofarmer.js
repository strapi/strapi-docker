'use strict';

/**
 * Cofarmer.js controller
 *
 * @description: A set of functions called "actions" for managing `Cofarmer`.
 */

module.exports = {

  /**
   * Retrieve cofarmer records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.cofarmer.search(ctx.query);
    } else {
      return strapi.services.cofarmer.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a cofarmer record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.cofarmer.fetch(ctx.params);
  },

  /**
   * Count cofarmer records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.cofarmer.count(ctx.query);
  },

  /**
   * Create a/an cofarmer record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.cofarmer.add(ctx.request.body);
  },

  /**
   * Update a/an cofarmer record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.cofarmer.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an cofarmer record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.cofarmer.remove(ctx.params);
  }
};
