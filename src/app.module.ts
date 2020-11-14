import { Module } from '@nestjs/common';
import { DatabaseConnectionsService } from './database-connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SubjectsModule } from './subjects/subjects.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DatabaseConnectionsService,
  }),
    AuthModule,
    SubjectsModule,
    QuizModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
