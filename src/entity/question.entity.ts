import { Column, Entity, ManyToOne } from 'typeorm';
import { QuizEntity } from './quiz.entity';
import { AbstractEntity } from './abstract-entity';

@Entity('question')
export class QuestionEntity extends AbstractEntity {
  @Column()
  title: string;

  @Column('simple-array')
  answers: string[];

  @Column('simple-array')
  correctIndexes: number[];

  @ManyToOne(type => QuizEntity, quiz => quiz.questions)
  quiz: QuizEntity;

}