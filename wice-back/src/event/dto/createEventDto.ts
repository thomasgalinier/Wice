import { IsNotEmpty } from "class-validator";
export class CreateEventDto {
    @IsNotEmpty()
    readonly title : string

    @IsNotEmpty()
    readonly description: string

    @IsNotEmpty()
    readonly imgSrc: string
    
    @IsNotEmpty()
    readonly date: string 

    @IsNotEmpty()
    readonly duration: string
}