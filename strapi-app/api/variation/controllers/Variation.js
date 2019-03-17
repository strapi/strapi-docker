'use strict';

/**
 * Variation.js controller
 *
 * @description: A set of functions called "actions" for managing `Variation`.
 */

module.exports = {

  /**
   * Retrieve variation records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.variation.search(ctx.query);
    } else {
      return strapi.services.variation.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a variation record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.variation.fetch(ctx.params);
  },

  /**
   * Count variation records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.variation.count(ctx.query);
  },

  /**
   * Create a/an variation record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.variation.add(ctx.request.body);
  },

  /**
   * Update a/an variation record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.variation.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an variation record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.variation.remove(ctx.params);
  }
};
