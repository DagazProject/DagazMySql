import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Game {

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiPropertyOptional()
    filename: string;

    @ApiPropertyOptional()
    players_total: number;

    @ApiPropertyOptional()
    created: Date;

    @ApiPropertyOptional()
    main_time: number;

    @ApiPropertyOptional()
    additional_time: number;

    @ApiPropertyOptional()
    realm_id: number;

    @ApiPropertyOptional()
    max_selector: number;

    @ApiPropertyOptional()
    bots: string;

    @ApiPropertyOptional()
    variant_id: number;

    @ApiPropertyOptional()
    preview: string;

    @ApiPropertyOptional()
    rules: string;

    @ApiPropertyOptional()
    copyright: string;

    @ApiPropertyOptional()
    waiting: number;

    @ApiPropertyOptional()
    all: number;

    @ApiPropertyOptional()
    external_ai: number;

    @ApiPropertyOptional()
    no_ai: string;

    @ApiPropertyOptional()
    is_tournament: boolean;
}