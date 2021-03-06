import getUserId from "../utils/auth";

const User = {
  posts: {
    fragment: "fragment userid on User { id }",
    resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request, false);

      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      });
    }
  },

  email: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    }
  }
};

export { User as default };
