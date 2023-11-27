import { ApiProperty } from "@nestjs/swagger";

export class Opening {

    @ApiProperty()
    setup_prefix: string;

    @ApiProperty()
    move_list: string;
}