import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { Model } from 'mongoose';
import { Todo } from './entities/todo.entity';
import { InjectModel } from '@nestjs/mongoose';
import { TodoTransformer } from './transformer/todo.transformer';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private TodoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoTransformer> {
    const data = new this.TodoModel(createTodoDto);
    const result = await data.save();
    return TodoTransformer.singleTransform(result);
  }

  async findAll(): Promise<TodoTransformer> {
    const data = await this.TodoModel.find();
    if (data.length < 1) {
      return [];
    } else {
      return TodoTransformer.transform(data);
    }
  }

  async findOne(id: string): Promise<TodoTransformer> {
    const result = await this.TodoModel.findById(id);

    if (!result) {
      throw new Error('Data not found');
    } else {
      return TodoTransformer.singleTransform(result);
    }
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoTransformer> {
    const result = await this.TodoModel.findByIdAndUpdate(id, updateTodoDto, {
      new: true,
    });

    if (!result) {
      throw new Error('Data not found!');
    } else {
      return TodoTransformer.singleTransform(result);
    }
  }

  async remove(id: string): Promise<TodoTransformer> {
    const result = await this.TodoModel.findById(id);
    if (!result) {
      throw new Error('Data not found');
    } else {
      await result.remove();
      return TodoTransformer.singleTransform(result);
    }
  }
}
