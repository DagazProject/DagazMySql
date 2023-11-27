import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Token {

    @ApiProperty()
    access_token: string;

    @ApiPropertyOptional()
    refresh_token: string;

    @ApiPropertyOptional()
    role: number;

    @ApiPropertyOptional()
    realm: number;

    @ApiPropertyOptional()
    user_id: number;
}