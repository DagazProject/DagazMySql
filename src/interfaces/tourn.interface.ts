import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Tourn {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    title: string;

    @ApiPropertyOptional()
    is_owner: boolean;
    
    @ApiPropertyOptional()
    is_joined: boolean;
    
    @ApiProperty()
    game_id: number;

    @ApiPropertyOptional()
    variant_id: number;

    @ApiPropertyOptional()
    selector_value: number;

    @ApiPropertyOptional()
    game: string;

    @ApiPropertyOptional()
    main_time: number;

    @ApiPropertyOptional()
    additional_time: number;

    @ApiProperty()
    is_hidden: boolean;

    @ApiPropertyOptional()
    created: Date;

    @ApiPropertyOptional()
    closed: Date;

    @ApiPropertyOptional()
    user_id: number;

    @ApiPropertyOptional()
    creator: string;

    @ApiPropertyOptional()
    all: number;

    @ApiPropertyOptional()
    completed: number;

    @ApiPropertyOptional()
    win_scores: number;

    @ApiPropertyOptional()
    lose_scores: number;

    @ApiPropertyOptional()
    draw_scores: number;

    @ApiPropertyOptional()
    player_a: number;

    @ApiPropertyOptional()
    player_b: number;

    @ApiPropertyOptional()
    tournamenttype_id: number;

    @ApiPropertyOptional()
    ratingtype_id: number;

    @ApiPropertyOptional()
    setting_id: number;

    @ApiPropertyOptional()
    timecontrol_id: number;

    @ApiPropertyOptional()
    timecontrol: string;

    @ApiPropertyOptional()
    is_sandglass: boolean;
}