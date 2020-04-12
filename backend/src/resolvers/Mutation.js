const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);

    return item;
  },
  updateItem(parent, args, ctx, info) {
    const payload = {...args};
    delete payload.id;

    return ctx.db.mutation.updateItem({
      data: payload,
      where: {
        id: args.id
      },
      // Return updated item
      info
    });
  },
  async deleteItem(parent, { id }, ctx, info) {
    const where = id;
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{
      id, title
    }`);
    // 2. Check if the user has the right permissions
    // TODO
    // 3. Delete the item
    return ctx.db.mutation.deleteItem({ where }, info);
  },
};

module.exports = Mutations;
