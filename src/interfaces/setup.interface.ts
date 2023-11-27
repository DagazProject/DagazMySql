import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Setup {

    @ApiProperty()
    game_id: number;

    @ApiPropertyOptional()
    variant_id: number;

    @ApiProperty()
    selector_value: number;

    @ApiProperty()
    name: string;
}
