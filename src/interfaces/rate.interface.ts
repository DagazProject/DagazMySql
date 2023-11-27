import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Rate {

    @ApiProperty()
    type_id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    user: string;

    @ApiProperty()
    game_id: number;

    @ApiPropertyOptional()
    variant_id: number;

    @ApiProperty()
    game: string;

    @ApiProperty()
    rating: number;
}