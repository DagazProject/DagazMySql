import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Member {

    @ApiProperty()
    id: number;
    
    @ApiProperty()
    user_id: number;

    @ApiPropertyOptional()
    user: string;

    @ApiProperty()
    score: number;

    @ApiPropertyOptional()
    berger: number;

    @ApiProperty()
    rating: number;

    @ApiPropertyOptional()
    all: number;

    @ApiPropertyOptional()
    win: number;

    @ApiPropertyOptional()
    lose: number;

    @ApiPropertyOptional()
    is_inc: boolean;
}
