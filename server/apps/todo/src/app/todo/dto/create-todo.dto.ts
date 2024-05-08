import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoItem {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    description: string;
}