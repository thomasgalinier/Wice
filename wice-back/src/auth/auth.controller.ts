import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { signupDto } from './dto/signupDto.js';
import { AuthService } from './auth.service.js';
import { signinDto } from './dto/signinDto.js';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemandDto.js';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto.js';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DeleteAccountDto } from './dto/deleteAccountDto.js';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: signupDto) {
    return this.authService.signup(signupDto);
  }
  @Post('signin')
  signin(@Body() signinDto: signinDto) {
    return this.authService.signin(signinDto);
  }
  @Post('reset/password')
  resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
    return this.authService.resetPasswordDemand(resetPasswordDemandDto);
  }
  @Post('reset/password/confirmation')
  resetPasswordConfirmation(
    @Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ) {
    return this.authService.resetPasswordConfirmation(
      resetPasswordConfirmationDto,
    );
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/account')
  deleteAcount(
    @Req() request: Request,
    @Body() deleteAccountDto: DeleteAccountDto,
  ) {
    const userId = request.user['userId'];
    return this.authService.deleteAccount(userId, deleteAccountDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/me')
  getUserInfo(@Req() request: Request) {
    // La logique pour récupérer les informations de l'utilisateur peut être dans le service
    return this.authService.getUserInfo(request.user['userId']);
  }
}
