import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Style {

    @ApiProperty()
    id: number;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    suffix: string;

    @ApiPropertyOptional()
    game_id: number;

    @ApiPropertyOptional()
    variant_id: number;
}