import { AbstractEntity } from './abstract-entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { QuizEntity } from './quiz.entity';

@Entity('subjects')
export class SubjectEntity extends AbstractEntity {

  @ApiProperty()
  @Column({
    unique: true
  })
  name: string;

  @ApiProperty()
  @Column({
    unique: true
  })
  description: string;

  @ManyToOne(type => UserEntity, user => user.createdSubjects)
  author: UserEntity;

  @ManyToMany(type => UserEntity, user => user.subjects)
  students: UserEntity;

  @OneToMany(type => QuizEntity, quiz => quiz.subject)
  quizzes: QuizEntity[];
}