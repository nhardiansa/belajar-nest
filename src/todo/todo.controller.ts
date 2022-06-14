import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { BaseResponse } from 'src/response.base';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Res() res, @Body() createTodoDto: CreateTodoDto) {
    try {
      const data = await this.todoService.create(createTodoDto);
      return BaseResponse.ok(res, data, 'Create data success!');
    } catch (err) {
      return BaseResponse.badResponse(res, err, err.message);
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const result = await this.todoService.findAll();
      return BaseResponse.ok(res, result, 'Success get data');
    } catch (err) {
      return BaseResponse.badResponse(res, err, err.message);
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const result = await this.todoService.findOne(id);
      return BaseResponse.ok(res, result, 'Success get data!');
    } catch (err) {
      return BaseResponse.badResponse(res, err, err.message);
    }
  }

  @Patch(':id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    try {
      const result = await this.todoService.update(id, updateTodoDto);
      return BaseResponse.ok(res, result, 'Update data success!');
    } catch (err) {
      return BaseResponse.badResponse(res, err, err.message);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      const result = await this.todoService.remove(id);
      return BaseResponse.ok(res, result, 'Data has been deleted!');
    } catch (err) {
      return BaseResponse.badResponse(res, err, err.message);
    }
  }
}
