import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Challenge {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    session_id: number;

    @ApiPropertyOptional()
    user_id: number;

    @ApiPropertyOptional()
    user: string;

    @ApiPropertyOptional()
    player_num: number;
}