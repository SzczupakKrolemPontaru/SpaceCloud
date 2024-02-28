import { Body, Controller, Delete, Post} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { LogoutUserDto } from 'src/users/dtos/LogoutUser.dto';
import { RefreshTokenDto } from 'src/users/dtos/RefreshToken.dto';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post('login')
    async loginUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.loginUser(createUserDto)
    }
    @Post('register')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }
    @Delete('logout')
    logoutUser(@Body() logoutUserDto: LogoutUserDto) {
        return this.usersService.logoutUser(logoutUserDto)
    }
    @Post('token')
    refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.usersService.refreshToken(refreshTokenDto)
    }
}
