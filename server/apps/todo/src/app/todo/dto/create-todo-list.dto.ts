import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoListItem {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
