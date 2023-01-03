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
      const sequelize = new Sequelize(process.env.MYSQL_URI);

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
