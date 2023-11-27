import { Controller, UseGuards, Get, Res, Param, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse } from '@nestjs/swagger';
import { MoveService } from './move.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Move } from '../interfaces/move.interface';
import { TokenGuard } from '../auth/token.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiSecurity('bearer')
@Controller('api/move')
export class MoveController {

    constructor(
        private readonly service: MoveService
    ) {}

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('all/:sid/:turn')
    @ApiResponse({ type: [Move] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getMoves(@Res() res, @Param('sid') sid, @Param('turn') turn): Promise<Move[]> {
        try {
            const r = await this.service.getMovesBySession(sid, turn);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard, TokenGuard)
    @Roles('admin')
    @Get('unconfirmed/:id')
    @ApiResponse({ type: [Move] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getUnconfirmedMove(@Res() res, @Param('id') id): Promise<Move[]> {
        try {
            const r = await this.service.getUnconfirmedMove(id);
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
    @Get('confirmed/:uid')
    @ApiResponse({ type: [Move] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getConfirmedMove(@Res() res, @Param('uid') uid): Promise<Move[]> {
        try {
            const r = await this.service.getConfirmedMove(uid);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Post()
    @ApiBody({ type: [Move] })
    @ApiResponse({ type: Move })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiForbiddenResponse({ description: 'Restart needed.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async update(@Res() res, @Body() x: Move): Promise<Move> {
        try {
            const r = await this.service.addMove(x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                if (r.session_id === null) {
                    return res.status(HttpStatus.FORBIDDEN).json();
                } else {
                    return res.status(HttpStatus.CREATED).json(r);
                }
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post('undo/:uid')
    @ApiBody({ type: Move })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async undo(@Res() res, @Param('uid') uid): Promise<null> {
        try {
            const r = await this.service.undoMove(uid);
            if (r) {
                return res.status(HttpStatus.OK).json(null);
            } else {
                return res.status(HttpStatus.NOT_FOUND).json(null);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post('accept')
    @ApiBody({ type: Move })
    @ApiResponse({ type: Move })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async accept(@Res() res, @Body() x: Move): Promise<Move> {
        try {
            const r = await this.service.acceptAlert(x);
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post('alert')
    @ApiBody({ type: Move })
    @ApiResponse({ type: Move })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async alert(@Res() res, @Body() x: Move): Promise<Move> {
        try {
            const r = await this.service.sendAlert(x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard, TokenGuard)
    @Roles('admin')
    @Post('confirm')
    @ApiBody({ type: Move })
    @ApiResponse({ type: Move })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async confirm(@Res() res, @Body() x: Move): Promise<Move> {
        try {
            const r = await this.service.confirmMove(x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
