import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class User {

    @ApiProperty()
    id: number;
    
    @ApiProperty()
    realm: number;

    @ApiPropertyOptional()
    is_admin: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;

    @ApiPropertyOptional()
    password: string;

    @ApiPropertyOptional()
    email: string;
    
    @ApiProperty()
    created: Date;

    @ApiPropertyOptional()
    deleted: Date;

    @ApiProperty()
    last_actived: Date;

    @ApiPropertyOptional()
    device: string;

    @ApiProperty()
    flags: number;
}