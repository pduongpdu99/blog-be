import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { QuestionsModule } from './questions/questions.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { PostCommentsModule } from './post-comments/post-comments.module';
import { CategoriesModule } from './categories/categories.module';
import { PostCategoriesModule } from './post-categories/post-categories.module';
import { PostTagsModule } from './post-tags/post-tags.module';
import { TagsModule } from './tags/tags.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
