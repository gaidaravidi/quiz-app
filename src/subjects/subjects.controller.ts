import { Controller, Body, Param, Get, Post, Delete, Patch, SetMetadata, UseGuards } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../entity/user.entity';
import { User } from 'src/auth/user.decorator';
import { Roles } from '../auth/role.decorator';
import { RolesGuard } from '../auth/role.guard';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('subjects')
@Controller('subjects')
@UseGuards(AuthGuard('jwt'))
export class SubjectsController {
  constructor(public service: SubjectsService) {
  }

  @Post()
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  create(@User() user, @Body() subject: { name: string }) {
    return this.service.create(user, subject);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: number, @User() user) {
    return this.service.getOne(id);
  }
  @Get('/createdByMe')
  createdByMe(@User() user) {
    return this.service.getCreatedByMe(user);
  }

  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Delete(':/id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Patch(':/id')
  update(@Param('id') id: number, @Body() data) {
    return this.service.update(id, data);
  }
}
