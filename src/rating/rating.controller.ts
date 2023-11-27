import { Controller, Get, HttpStatus, Param, Req, Res, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiResponse, ApiSecurity, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TokenGuard } from '../auth/token.guard';
import { Rate } from '../interfaces/rate.interface';

@ApiSecurity('bearer')
@Controller('api/rating')
export class RatingController {

    constructor(
        private readonly service: RatingService
    ) {}

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get()
    @ApiResponse({ type: [Rate] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async currRatings(@Req() request: Request, @Res() res): Promise<Rate[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getUserRatings(user.id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get('user/:id')
    @ApiResponse({ type: [Rate] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async userRatings(@Res() res, @Param('id') id): Promise<Rate[]> {
        try {
            const r = await this.service.getUserRatings(id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get('game/:g/:v')
    @ApiResponse({ type: [Rate] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async gameRatings(@Res() res, @Param('g') g, @Param('v') v): Promise<Rate[]> {
        try {
            const r = await this.service.getGameRatings(g, v);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
