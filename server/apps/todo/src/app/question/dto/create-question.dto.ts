import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  title: string;
}
