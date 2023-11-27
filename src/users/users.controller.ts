import { Controller, Get, Res, HttpStatus, UseGuards, Post, Body, Delete, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';
import { ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiForbiddenResponse, ApiSecurity, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiConflictResponse, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { TokenGuard } from '../auth/token.guard';
import { Request } from 'express';

@ApiSecurity('bearer')
@Controller('api/users')
export class UsersController {

    constructor(
        private readonly service: UsersService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard, TokenGuard)
    @Roles('admin')
    @Get()
    @ApiResponse({ type: [User] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Req() request: Request, @Res() res): Promise<User[]> {
        const user: any = request.user;
        try {
            const r = await this.service.findAll(user.id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('current')
    @ApiResponse({ type: User })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findCurrent(@Req() request: Request, @Res() res): Promise<User> {
        const user: any = request.user;
        try {
            const r = await this.service.findOneById(user.id);
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
    @Post('current')
    @ApiBody({ type: User })
    @ApiResponse({ type: User })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async updateCurrent(@Req() request: Request, @Res() res, @Body() x: User): Promise<User> {
        const user: any = request.user;
        try {
            const r = await this.service.updateUser(user.id, x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Post()
    @ApiBody({ type: User })
    @ApiResponse({ type: User })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiConflictResponse({ description: 'User already exists.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async update(@Res() res, @Body() x: User): Promise<User> {
        try {
            const r = await this.service.addUser(x);
            if (!r) {
                return res.status(HttpStatus.CONFLICT).json();
            } else {
                return res.status(HttpStatus.CREATED).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard, TokenGuard)
    @Roles('admin')
    @Delete(':id')
    @ApiResponse({ type: User })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async delete(@Req() request: Request, @Res() res, @Param('id') id): Promise<User> {
        const user: any = request.user;
        try {
            const r = await this.service.delUser(user.id, id);
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
