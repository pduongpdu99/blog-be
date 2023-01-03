import { Sequelize } from 'sequelize-typescript';

const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.MYSQL_URI);

      // add model
      sequelize.addModels([]);

      await sequelize.sync();
      return sequelize;
    },
  },
];
