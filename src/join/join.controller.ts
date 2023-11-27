import { Controller, UseGuards, Get, Res, Param, HttpStatus, Post, Body, Req } from '@nestjs/common';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiResponse } from '@nestjs/swagger';
import { JoinService } from './join.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Join } from '../interfaces/join.interface';
import { Request } from 'express';
import { TokenGuard } from '../auth/token.guard';

@ApiSecurity('bearer')
@Controller('api/join')
export class JoinController {
    
    constructor(
        private readonly service: JoinService
    ) {}

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post()
    @ApiBody({ type: Join })
    @ApiResponse({ type: Join })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async join(@Req() request: Request, @Res() res, @Body() x: Join): Promise<Join> {
        const user: any = request.user;
        try {
            const r = await this.service.joinToSession(user.id, x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.CREATED).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
