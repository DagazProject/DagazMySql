import { ApiProperty } from "@nestjs/swagger";

export class GameTime {

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    main_time: number;

    @ApiProperty()
    additional_time: number;

    @ApiProperty()
    is_sandglass: boolean;
}