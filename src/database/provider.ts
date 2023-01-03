import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/apis/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE_MODELS',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.MYSQL_URI);

      // add model
      sequelize.addModels([User]);

      await sequelize.sync();
      return sequelize;
    },
  },
];
