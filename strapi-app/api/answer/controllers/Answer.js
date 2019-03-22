'use strict';

/**
 * Answer.js controller
 *
 * @description: A set of functions called "actions" for managing `Answer`.
 */

module.exports = {

  /**
   * Retrieve answer records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.answer.search(ctx.query);
    } else {
      return strapi.services.answer.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a answer record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.answer.fetch(ctx.params);
  },

  /**
   * Count answer records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.answer.count(ctx.query);
  },

  /**
   * Create a/an answer record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.answer.add(ctx.request.body);
  },

  /**
   * Update a/an answer record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.answer.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an answer record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.answer.remove(ctx.params);
  }
};
