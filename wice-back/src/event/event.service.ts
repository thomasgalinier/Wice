import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/createEventDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
   async create(createEventDto: CreateEventDto, imgSrc: Express.Multer.File, userId: any) {
        const { title, description, date, duration } = createEventDto;
        const imagePath = imgSrc.path;
        await this.prismaService.event.create({ data: { title, description, imgsrc: imagePath, date, duration, createdById:userId  } });
        return { data: "Event created!" };
    }
    constructor(private readonly prismaService: PrismaService){}
  
}
