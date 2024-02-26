import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createEventDto } from './dto/createEventDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateEventDto } from './dto/updateEventDto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  //SELECT * FROM Event;
  async getAll() {
    return await this.prismaService.event.findMany({
      include: {
        createdBy: true,
        participants: true,
      },
    });
  }

  //INSERT INTO Event (title, description, date, duration, createdById) VALUES (?, ?, ?, ?, ?);
  async create(createEventDto: createEventDto, userId: any) {
    const { title, description, dateTime, duration } = createEventDto;
    const createdBy = { connect: { userId: userId } };
    await this.prismaService.event.create({
      data: {
        title,
        description,
        date: dateTime,
        duration,
        createdBy: createdBy,
      },
    });
    return { data: 'Event created!' };
  }
  async getEventsCreatedByUser(userId: any) {
    return this.prismaService.user.findUnique({
      where: { userId: userId },
      include: {
        eventsCreatedByUser: true,
      },
    });
  }

  //DELETE FROM Event WHERE idEvent = ?;
  async delete(eventId: number, userId: any) {
    const event = await this.prismaService.event.findUnique({
      where: { idEvent: eventId },
    });
    if (!event) throw new NotFoundException('Event not found');
    if (event.createdById !== userId)
      throw new ForbiddenException('Forbidden action');
    await this.prismaService.event.delete({ where: { idEvent: eventId } });
    return { data: 'Event delete' };
  }

  //UPDATE Event SET title = ?, description = ?, date = ?, duration = ? WHERE idEvent = ?;
  async update(eventId: number, userId: any, updateEventDto: updateEventDto) {
    const event = await this.prismaService.event.findUnique({
      where: { idEvent: eventId },
    });
    if (!event) throw new NotFoundException('Event not found');
    if (event.createdById !== userId)
      throw new ForbiddenException('Forbidden action');
  
    const { title, description, dateTime, duration } = updateEventDto; 
    await this.prismaService.event.update({
      where: { idEvent: eventId },
      data: {
        title,
        description,
        date:dateTime, 
        duration,
      },
    });
    return { data: 'Event updated' };
  }

  //SELECT * FROM Event WHERE idEvent = ?;
  async getById(eventId: number) {
    const event = await this.prismaService.event.findUnique({
      where: { idEvent: eventId },
      include: {
        createdBy: true,
        participants: true,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  //INSERT INTO EventParticipant (userId, eventId) VALUES (?, ?);
  async registerToEvent(eventId: number, userId: any) {
    const event= await this.prismaService.event.findUnique({
      where: {idEvent: eventId}
    })
    if(!event){
      throw new NotFoundException('Event not found')
    }

    //SELECT * FROM User WHERE userId = ?;
    const existingParticipant = await this.prismaService.eventParticipant.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      }
    });
    if(existingParticipant){
      throw new ConflictException('User is already registered to this event')
    }
    await this.prismaService.eventParticipant.create({
      data: {
        user:{connect: {userId: userId}},
        event:{connect: {idEvent: eventId}}
      }
    })
    return {data: 'User registered to event'}
  }

  async getEventsParticipatedByUser(userId: number) {
    return await this.prismaService.user.findUnique({
      where: { userId },
      include: {
        events: true,
      },
    });
  }
  
}
