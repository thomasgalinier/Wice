import {IsNotEmpty, IsEmail  } from 'class-validator'
export class signinDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email : string
    @IsNotEmpty()
    readonly password : string
}