import { Controller, UseGuards, Get, Res, HttpStatus, Req, Param, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Game } from '../interfaces/game.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TokenGuard } from '../auth/token.guard';
import { Request } from 'express';
import { Preview } from '../interfaces/preview.interface';
import { Style } from '../interfaces/style.interface';
import { Opening } from '../interfaces/opening.interface';
import { Setup } from '../interfaces/setup.interface';

@ApiSecurity('bearer')
@Controller('api/game')
export class GameController {

    constructor(
        private readonly service: GameService
    ) {}

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get()
    @ApiResponse({ type: [Game] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getGames(@Req() request: Request, @Res() res): Promise<Game[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getGames(user.id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get('openings/:id')
    @ApiResponse({ type: [Opening] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getOpenings(@Res() res, @Param('id') id): Promise<Opening[]> {
        try {
            const r = await this.service.getOpenings(id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get('map/:id')
    @ApiResponse({ type: [Game] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getMap(@Res() res, @Param('id') id): Promise<Game[]> {
        try {
            const r = await this.service.getMapEx(id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get('map')
    @ApiResponse({ type: [Game] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getAll(@Res() res): Promise<Game[]> {
        try {
            const r = await this.service.getMap();
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get(':id/variants')
    @ApiResponse({ type: [Game] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getVariants(@Req() request: Request, @Res() res, @Param('id') id): Promise<Game[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getVariants(user.id, id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get('setups/:game')
    @ApiResponse({ type: [Setup] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getGameSetups(@Res() res, @Param('game') game): Promise<Setup[]> {
        try {
            const r = await this.service.getSetups(game, null);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get('setups/:game/:variant')
    @ApiResponse({ type: [Setup] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getVariantSetups(@Res() res, @Param('game') game, @Param('variant') variant): Promise<Setup[]> {
        try {
            const r = await this.service.getSetups(game, variant);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get('styles')
    @ApiResponse({ type: [Style] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getAllStyles(@Res() res): Promise<Style[]> {
        try {
            const r = await this.service.getAllStyles();
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get(':id/styles')
    @ApiResponse({ type: [Style] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getStyles(@Res() res, @Param('id') id): Promise<Style[]> {
        try {
            const r = await this.service.getStyles(id, null);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get(':game/:variant/styles')
    @ApiResponse({ type: [Style] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getStylesEx(@Res() res, @Param('game') game, @Param('variant') variant): Promise<Style[]> {
        try {
            const r = await this.service.getStyles(game, variant);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post('preview')
    @ApiBody({ type: Preview })
    @ApiResponse({ type: Preview })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getPreview(@Res() res, @Body() x: Preview): Promise<Preview> {
        try {
            const r = await this.service.getPreview(x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
