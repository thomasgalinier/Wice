import {  Body, Controller, Post } from '@nestjs/common';
import { signupDto } from './dto/signupDto.js';
import { AuthService } from './auth.service.js';
import { signinDto } from './dto/signinDto.js';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemandDto.js';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto.js';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post("signup")
    signup(@Body() signupDto: signupDto){
        return this.authService.signup(signupDto)
    }
    @Post("signin")
    signin(@Body() signinDto: signinDto){
        return this.authService.signin(signinDto)
    }
    @Post("reset/password")
    resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto ){
        return this.authService.resetPasswordDemand(resetPasswordDemandDto)
    }
    @Post("reset/password/confirmation")
    resetPasswordConfirmation(@Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto ){
        return this.authService.resetPasswordConfirmation(resetPasswordConfirmationDto)
    }
}
