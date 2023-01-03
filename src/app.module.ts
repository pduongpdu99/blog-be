import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './apis/users/users.module';
import { RolesModule } from './apis/roles/roles.module';
import { PermissionsModule } from './apis/permissions/permissions.module';
import { QuestionsModule } from './apis/questions/questions.module';
import { CommentsModule } from './apis/comments/comments.module';
import { PostsModule } from './apis/posts/posts.module';
import { PostCommentsModule } from './apis/post-comments/post-comments.module';
import { CategoriesModule } from './apis/categories/categories.module';
import { PostCategoriesModule } from './apis/post-categories/post-categories.module';
import { PostTagsModule } from './apis/post-tags/post-tags.module';
import { TagsModule } from './apis/tags/tags.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    QuestionsModule,
    CommentsModule,
    PostsModule,
    PostCommentsModule,
    CategoriesModule,
    PostCategoriesModule,
    PostTagsModule,
    TagsModule,

    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
