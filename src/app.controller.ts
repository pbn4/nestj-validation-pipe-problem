import { Body, Controller, Get, Post } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { ClassType } from 'class-transformer/ClassTransformer';

export interface IController<T> {
  hello(body: T);
}

export function Factory<T>(): ClassType<IController<T>> {
  @Controller()
  class ControllerHost<T> implements IController<T> {
    @Post()
    hello(@Body() body: T) {
      return "hello"
    }
  }
  return ControllerHost;
}

export class MyDto {
  @Expose()
  @IsDefined()
  @IsString()
  hello: string;
}

export class AppController extends Factory<MyDto>() {}
