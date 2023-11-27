import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Move {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    session_id: number;

    @ApiPropertyOptional()
    user_id: number;

    @ApiPropertyOptional()
    turn_num: number;

    @ApiPropertyOptional()
    move_str: string;

    @ApiPropertyOptional()
    setup_str: string;

    @ApiPropertyOptional()
    note: string;

    @ApiPropertyOptional()
    time_delta: number;

    @ApiPropertyOptional()
    time_limit: number;

    @ApiPropertyOptional()
    additional_time: number;

    @ApiProperty()
    uid: number;

    @ApiPropertyOptional()
    next_player: number;

    @ApiPropertyOptional()
    result_id: number;

    @ApiPropertyOptional()
    ko_setup: string;
}