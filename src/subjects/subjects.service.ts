import { Injectable } from '@nestjs/common';
import { SubjectEntity } from '../entity/subject.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';

@Injectable()
export class SubjectsService {
  constructor(@InjectRepository(SubjectEntity) private subjectRepo: Repository<SubjectEntity>) {
  }
  async create(user: UserEntity, subjectData: any) {
    const subject = await this.subjectRepo.create({ ...subjectData, author: user });
    console.log(subject);
    return subject;
  }
  async getAll() {
    return await this.subjectRepo.find();
  }

  async getOne(id: number) {
    return await this.subjectRepo.find({ where: { id } });
  }
  async delete(id: number) {
    return await this.subjectRepo.delete({ id });
  }
  async update(id: number, subject) {
    return this.subjectRepo.update({ id }, subject);
  }

  getCreatedByMe(user: UserEntity) {
    return this.subjectRepo.find({
      where: {
        author: user
      }
    });
  }
  getMy(user: UserEntity) {
    return this.subjectRepo.find({
      where: {
        students: user
      },
      relations: ['users']
    });
  }
}
