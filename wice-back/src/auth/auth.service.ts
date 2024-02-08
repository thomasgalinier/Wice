import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { signupDto } from './dto/signupDto';
import { MailerService } from 'src/mailer/mailer.service';
import { signinDto } from './dto/signinDto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemandDto';
import * as speakeasy from 'speakeasy';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
    private readonly JwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signup(signupDto: signupDto) {
    const { firstname, lastname, email, password, accesstype, iconurl } =
      signupDto;
    // ** Vérifier si l'utilisateur est déjà inscrit
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (user) throw new ConflictException('User already exists');
    // ** Hasher le mot de passe
    const hash = await bcrypt.hash(password, 10);
    // ** Enregistrer l'utilisateur dans la base de données
    await this.prismaService.user.create({
      data: { email, firstname, lastname, password: hash, iconurl, accesstype },
    });
    // ** Envoye un email de confirmation
    await this.mailerService.sendSignupConfirmation(email);
    // ** Retourner une réponse de succès
    return { data: 'User succesfully created' };
  }
  async signin(signinDto: signinDto) {
    const { email, password } = signinDto;
    // ** Vérifier si l'utilisateur est déjà inscrit
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    // ** Comparer le mot de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Password does not match');
    // ** Retourner un token jwt
    const payload = {
      sub: user.userId,
      email: user.email,
    };
    const token = this.JwtService.sign(payload, {
      expiresIn: '2h',
      secret: this.configService.get('SECRET_KEY'),
    });
    return {
      token,
      user: {
        firstName: user.firstname,
        lastName: user.lastname,
        iconUrl: user.iconurl,
        accessType: user.accesstype,
        email: user.email,
        userId: user.userId,
      },
    };
  }
  async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
    const { email } = resetPasswordDemandDto;
    // ** Vérifier si l'utitilisateur existe
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    // ** envoye du mail avec le code secret
    const code = speakeasy.totp({
      secret: this.configService.get('OTP_CODE'),
      digits: 5,
      step: 60 * 30,
      encoding: 'base32',
    });
    const url = 'http://localhost:3000/auth/reset/password/confirmation'; // TODO mettre l'adresse front pour reset le mdp
    await this.mailerService.sendResetPassword(email, url, code);
    return { data: 'Reset password mail has been sent' };
  }
  async resetPasswordConfirmation(
    resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ) {
    const { email, password, code } = resetPasswordConfirmationDto;
    // ** Vérifier si l'utitilisateur existe
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
   const match =  speakeasy.totp.verify({
      secret: this.configService.get('OTP_CODE'),
      token: code,
      digits: 5,
      step: 60 * 30,
      encoding: 'base32',
    })
    if(!match) throw new UnauthorizedException("Invalid/expired token")
    const hash = await bcrypt.hash(password, 10)
    await this.prismaService.user.update({where:{email}, data:{password : hash}})
    return {data: "Password updated"}
  }
}
