export default {
  test: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'mysecretpassword',
      port: '5432',
      database: 'barriga',
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};
