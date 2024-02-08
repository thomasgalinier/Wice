import {IsNotEmpty, IsEmail  } from 'class-validator'
export class signupDto {
    @IsNotEmpty()
    readonly firstname : string
    @IsNotEmpty()
    readonly lastname : string
    @IsNotEmpty()
    @IsEmail()
    readonly email : string
    @IsNotEmpty()
    readonly password : string
    @IsNotEmpty()
    readonly accesstype : string
    @IsNotEmpty()
    readonly iconurl : string
}