import { IsNotEmpty } from "class-validator"
export class updateEventDto{
    @IsNotEmpty()
    readonly title?: string

    @IsNotEmpty()
    readonly dateTime?: string

    @IsNotEmpty()
    readonly duration?: string

    @IsNotEmpty()
    readonly description?: string
}