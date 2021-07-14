module.exports = {
  development: {
      client: 'mysql',
      connection: {
        host: 'localhost',
        user: 'root',
        password: 'passwd',
        database: 'trabalhe_conosco',
      },
  },
  production: {
    client: 'mysql',
    connection: {
      host: '192.168.1.172',
      user: 'dba',
      password: 'overhead',
      database: 'trabalhe_conosco',
    },
  }
}
