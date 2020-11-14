import { AbstractEntity } from './abstract-entity';
import { UserEntity } from './user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { QuestionEntity } from './question.entity';
import { SubjectEntity } from './subject.entity';

@Entity('quizzes')
export class QuizEntity extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(type => UserEntity, author => author.createdQuizzes)
  author: UserEntity;

  @ManyToOne(type => SubjectEntity, subject => subject.quizzes)
  subject: SubjectEntity;

  @OneToMany(type => QuestionEntity, question => question.quiz)
  questions: QuestionEntity;

  // #TODO add attempts
}