import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Pref {

    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    user_id: number;

    @ApiProperty()
    game_id: number;

    @ApiPropertyOptional()
    created: Date;
}