import { IsNotEmpty } from "class-validator"
export class createEventDto{
    @IsNotEmpty()
    readonly title: string

    @IsNotEmpty()
    readonly dateTime: string

    @IsNotEmpty()
    readonly duration: string

    @IsNotEmpty()
    readonly description: string
}