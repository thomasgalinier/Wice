import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { EventService } from './event.service';
import {FileInterceptor}  from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { CreateEventDto } from './dto/createEventDto';
import { Request } from 'express';
import { multerOptions } from 'src/upload.config';

@Controller('event')
export class EventController {
    constructor(private readonly  eventService: EventService){}
    @UseGuards(AuthGuard('jwt'), new RoleGuard(['admin', 'organizer']))
    @Post("create")
    @UseInterceptors(FileInterceptor('imgSrc', multerOptions))
    create(@UploadedFile() imgSrc: Express.Multer.File,  @Body() createEventDto: CreateEventDto, @Req() request: Request){
        const userId = request.user["userId"]
        return this.eventService.create(createEventDto,imgSrc, userId)
    }
    
}
