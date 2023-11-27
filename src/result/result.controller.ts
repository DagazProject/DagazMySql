import { Controller, UseGuards, Get, Res, Param, Req, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { ResultService } from './result.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Result } from '../interfaces/result.interface';
import { Request } from 'express';
import { TokenGuard } from '../auth/token.guard';

@ApiSecurity('bearer')
@Controller('api/result')
export class ResultController {

    constructor(
        private readonly service: ResultService
    ) {}

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get(':id')
    @ApiResponse({ type: Result })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getMoves(@Req() request: Request, @Res() res, @Param('id') id): Promise<Result> {
        const user: any = request.user;
        try {
            const r = await this.service.getResult(user.id, id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post()
    @ApiBody({ type: Result })
    @ApiResponse({ type: Result })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async join(@Req() request: Request, @Res() res, @Body() x: Result): Promise<Result> {
        const user: any = request.user;
        try {
            const r = await this.service.addResult(user.id, x);
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
