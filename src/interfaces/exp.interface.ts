import { ApiProperty } from "@nestjs/swagger";

export class Exp {
    @ApiProperty()
    turn: number;

    @ApiProperty()
    player: number;

    @ApiProperty()
    move: string;
}