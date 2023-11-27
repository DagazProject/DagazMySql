import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Join {

    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    user_id: number;

    @ApiPropertyOptional()
    user: string;

    @ApiProperty()
    session_id: number;

    @ApiPropertyOptional()
    player_num: number;

    @ApiPropertyOptional()
    is_ai: number;

    @ApiPropertyOptional()
    filename: string;
}