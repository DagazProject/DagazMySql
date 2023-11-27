import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Result {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    session_id: number;

    @ApiPropertyOptional()
    user_id: number;

    @ApiProperty()
    result_id: number;

    @ApiPropertyOptional()
    score: number;
}