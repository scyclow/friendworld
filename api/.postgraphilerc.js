module.exports = {
  options: {
    connection: "postgres:///friendworld",
    schema: ["friendworld"],
    disableDefaultMutations: true,
    simpleCollections: 'both',
    enhanceGraphiql: true,
    jwtSecret: "blah",
    jwtTokenIdentifier: "friendworld_private.jwt_token",
    defaultRole: "friendworld_anonymous",
    appendPlugins: ['@graphile-contrib/pg-simplify-inflector'],
    cors: true,
    watch: true,
  }
};
