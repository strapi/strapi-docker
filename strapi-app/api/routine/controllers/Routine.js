'use strict';

/**
 * Routine.js controller
 *
 * @description: A set of functions called "actions" for managing `Routine`.
 */

module.exports = {

  /**
   * Retrieve routine records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.routine.search(ctx.query);
    } else {
      return strapi.services.routine.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a routine record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.routine.fetch(ctx.params);
  },

  /**
   * Count routine records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.routine.count(ctx.query);
  },

  /**
   * Create a/an routine record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.routine.add(ctx.request.body);
  },

  /**
   * Update a/an routine record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.routine.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an routine record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.routine.remove(ctx.params);
  }
};
