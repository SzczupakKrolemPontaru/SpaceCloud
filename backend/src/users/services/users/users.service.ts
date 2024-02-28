import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository, EntityManager } from 'typeorm';
import { BlobService } from 'src/blob/services/blob/blob.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto} from 'src/users/dtos/CreateUser.dto';
import { CreateUserResponseDto } from 'src/users/dtos/CreateUserResponse.dto';
import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';
import { LoginUserResponseDto } from 'src/users/dtos/LoginUserResponse.dto';
import { LogoutUserDto } from 'src/users/dtos/LogoutUser.dto';
import { RefreshTokenDto } from 'src/users/dtos/RefreshToken.dto';
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private manager: EntityManager,
        private blobService: BlobService,
        private jwtService: JwtService,
    ) {}

    async loginUser(userDetails: LoginUserDto): Promise<LoginUserResponseDto> {
        require('dotenv').config();
        try {
            const user = await this.userRepository.findOne({where: {userName: userDetails.userName}});
            if (!user) {
                throw new HttpException(
                    'User not found',
                    HttpStatus.NOT_FOUND
                );
            }

            let passwordMatch;
            try {
                passwordMatch = await bcrypt.compare(userDetails.userPassword, user.userPassword);
            } catch (error) {
                console.log(error + 'Error comparing passwords');
                throw new HttpException(
                    'Error comparing passwords',
                    HttpStatus.UNAUTHORIZED
                );
            }

            if (!passwordMatch) {
                throw new HttpException(
                    'Password incorrect',
                    HttpStatus.UNAUTHORIZED
                );
            }
            let refreshToken;
            try {
                refreshToken = this.jwtService.sign({userName: user.userName});
                user.refreshToken = refreshToken;
                await this.userRepository.save(user);
            } catch (error) {
                throw new HttpException(
                    'Error signing tokens',
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
            return { userName: user.userName, token: refreshToken};
        } catch (error) {
            throw new HttpException(
                'Error logging in',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async createUser(userDetails: CreateUserDto): Promise<CreateUserResponseDto>  {
        return this.manager.transaction(async transactionalEntityManager => {
            const userExists = await transactionalEntityManager.findOne(User, {where: {userName: userDetails.userName}});

            if (userExists) {
                throw new HttpException(
                    'User already exists',
                    HttpStatus.CONFLICT
                );
            }

            let hash;
            try {
                hash = await bcrypt.hash(userDetails.userPassword, 10);
            } catch (error) {
                throw new HttpException(
                    `Password hashing failed`,
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }

            const newUser = this.userRepository.create({userName: userDetails.userName, userPassword: hash});
            const savedUser = await transactionalEntityManager.save(newUser);
            try {
                await this.blobService.createContainer(userDetails.userName);
            } catch (error) {
                throw new HttpException(
                    'Error creating container',
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }

            return { userName: savedUser.userName };
        });
    }

    async logoutUser(logoutUser: LogoutUserDto) {
        try {
            const user = await this.userRepository.findOne({where: {userName: logoutUser.userName}});
            if (!user) {
                throw new HttpException(
                    'User not found',
                    HttpStatus.NOT_FOUND
                );
            }
            user.refreshToken = null;
            await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException(
                'Error logging out',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto) {
        try {
            const user = await this.userRepository.findOne({where: {userName: refreshTokenDto.userName}});
            if (!user) {
                console.log('User not found');
                throw new HttpException(
                    'User not found',
                    HttpStatus.NOT_FOUND
                );
            }

            try {
                const payload = this.jwtService.verify(refreshTokenDto.token);
                if (payload.userName !== user.userName) {
                    console.log('Invalid token');
                    throw new HttpException(
                        'Invalid token',
                        HttpStatus.UNAUTHORIZED
                    );
                }
            } catch (error) {
                console.log('Error verifying token');
                throw new HttpException(
                    'Error verifying token',
                    HttpStatus.UNAUTHORIZED
                );
            }

            let refreshToken;
            try {
                refreshToken = this.jwtService.sign({userName: user.userName});
                user.refreshToken = refreshToken;
                await this.userRepository.save(user);
            } catch (error) {
                console.log('Error signing tokens');
                throw new HttpException(
                    'Error signing tokens',
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }

            console.log('Token refreshed');
            return { userName: user.userName, token: refreshToken};
        }
        catch (error) {
            console.log('Error refreshing token');
            throw new HttpException(
                'Error refreshing token',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}