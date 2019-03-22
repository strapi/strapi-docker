'use strict';

/**
 * Topic.js controller
 *
 * @description: A set of functions called "actions" for managing `Topic`.
 */

module.exports = {

  /**
   * Retrieve topic records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.topic.search(ctx.query);
    } else {
      return strapi.services.topic.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a topic record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.topic.fetch(ctx.params);
  },

  /**
   * Count topic records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.topic.count(ctx.query);
  },

  /**
   * Create a/an topic record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.topic.add(ctx.request.body);
  },

  /**
   * Update a/an topic record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.topic.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an topic record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.topic.remove(ctx.params);
  }
};
