import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { createEventDto } from './dto/createEventDto';
import { Request } from 'express';
import { updateEventDto } from './dto/updateEventDto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['admin', 'organizer']))
  @Post('create')
  create(@Body() createEventDto: createEventDto, @Req() request: Request) {
    const userId = request.user['userId'];
    return this.eventService.create(createEventDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('created')
  async getEventsCreatedByUser(@Req() request: Request) {
    const userId = request.user['userId'];
    return this.eventService.getEventsCreatedByUser(userId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.eventService.getAll();
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard(['admin', 'organizer']))
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) eventId: number, @Req() request: Request) {
    const userId = request.user['userId'];
    return this.eventService.delete(eventId, userId);
  }
  @UseGuards(AuthGuard('jwt'), new RoleGuard(['admin', 'organizer']))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() updateEventDto: updateEventDto,
    @Req() request: Request,
  ) {
    const userId = request.user['userId'];
    return this.eventService.update(eventId, userId, updateEventDto);
  }
}
