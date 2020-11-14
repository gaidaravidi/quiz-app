import { AbstractEntity } from './abstract-entity';
import { BeforeInsert, Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { SubjectEntity } from './subject.entity';
import { QuizEntity } from './quiz.entity';

export enum UserRole{
  Student = 'student',
  Admin = 'admin',
}

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Student,
  })
  role: UserRole;

  @ManyToMany(type => SubjectEntity, subject => subject.students)
  subjects: SubjectEntity;

  @OneToMany(type => SubjectEntity, subject => subject.author)
  createdSubjects: SubjectEntity[];

  @OneToMany(type => QuizEntity, quiz => quiz.author)
  createdQuizzes: SubjectEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attemptPassword: string) {
    return await bcrypt.compare(attemptPassword, this.password);
  }

}