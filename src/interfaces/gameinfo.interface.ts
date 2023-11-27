import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GameInfo {

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    game_id: number;
    
    @ApiPropertyOptional()
    variant_id: number;

    @ApiPropertyOptional()
    selector_value: number;

    @ApiProperty()
    tournamenttype_id: number;

    @ApiProperty()
    ratingtype_id: number;

/*  @ApiPropertyOptional()
    main_time: number;

    @ApiPropertyOptional()
    additional_time: number;*/
}
