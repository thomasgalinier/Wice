import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { createEventDto } from './dto/createEventDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateEventDto } from './dto/updateEventDto';

@Injectable()
export class EventService {

  
  constructor(private readonly prismaService: PrismaService) {}
 async getAll() {
      return await this.prismaService.event.findMany({
        include: {
          createdBy: true,
          participants:true,
        }
      })
      
  }
  async create(createEventDto: createEventDto, userId: any) {
    const { title, description, dateTime, duration } = createEventDto;
    const createdBy = { connect: { userId: userId } };
    await this.prismaService.event.create({
      data: { title, description, date: dateTime, duration, createdBy: createdBy },
    });
    return { data: 'Event created!' };
  }
  async getEventsCreatedByUser(userId: any) {
    return this.prismaService.user.findUnique({
      where:{userId: userId},
      include:{
        eventsCreatedByUser:true
      }
    })
  }
  async delete(eventId: number, userId: any) {
    const event = await this.prismaService.event.findUnique({where: {idEvent: eventId}})
    if(!event) throw new NotFoundException("Event not found")
    if(event.createdById !== userId) throw new ForbiddenException('Forbidden action')
    await this.prismaService.event.delete({where:{idEvent:eventId}})
  return {data: 'Event delete'}
}
async update(eventId: number, userId: any, updateEventDto: updateEventDto) {
  const event = await this.prismaService.event.findUnique({where: {idEvent: eventId}})
    if(!event) throw new NotFoundException("Event not found")
    if(event.createdById !== userId) throw new ForbiddenException('Forbidden action')
    await this.prismaService.event.update({where:{idEvent:eventId}, data:{...updateEventDto}})
    return {data: "Event updated"}
}

}
