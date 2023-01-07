import { Sequelize } from 'sequelize-typescript';
import {
  User,
  Category,
  Comment,
  Permission,
  Post,
  PostCategory,
  PostComment,
  PostTag,
  Question,
  Role,
  Tag,
} from 'src/apis/entities.index';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE_MODELS',
    useFactory: async () => {
      const sequelize = new Sequelize(
        process.env.MYSQL_DATABASE,
        process.env.MYSQL_USERNAME,
        process.env.MYSQL_PASSWORD,
        {
          host: process.env.MYSQL_HOSTNAME,
          port: parseInt(process.env.MYSQL_PORT || '3306'),
          dialect: 'mysql',
          logging: false,
        },
      );

      // add model
      sequelize.addModels([
        User,
        Category,
        Comment,
        Permission,
        Post,
        PostCategory,
        PostComment,
        PostTag,
        Question,
        Role,
        Tag,
      ]);

      await sequelize.sync();
      return sequelize;
    },
  },
];
