import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto} from 'src/users/dtos/CreateUser.dto';
import { Repository, EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private manager: EntityManager
    ) {}

    getAllUsers() {
        return this.userRepository.find();
    }

    async loginUser(userDetails: CreateUserDto) {
        const user = await this.userRepository.findOne({where: {userName: userDetails.userName}});
        if (!user) {
            throw new HttpException(
                'User not found',
                HttpStatus.NOT_FOUND
            );
        }

        const passwordMatch = await bcrypt.compare(userDetails.userPassword, user.userPassword);

        if (!passwordMatch) {
            throw new HttpException(
                'Password incorrect',
                HttpStatus.UNAUTHORIZED
            );
        }

        return { userName: user.userName };
    }

    async createUser(userDetails: CreateUserDto) {
        return this.manager.transaction(async transactionalEntityManager => {
            let userName = userDetails.userName;
            let userPassword = userDetails.userPassword;

            const userExists = await transactionalEntityManager.findOne(User, {where: {userName: userDetails.userName}});

            if (userExists) {
                throw new HttpException(
                    'User already exists',
                    HttpStatus.BAD_REQUEST
                );
            }
            
            let hash;
            try {
                hash = await bcrypt.hash(userPassword, 10);
            } catch (error) {
                throw new HttpException(
                    'Password hashing failed',
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }

            const newUser = this.userRepository.create({userName: userName, userPassword: hash});
            const savedUser = await transactionalEntityManager.save(newUser);
    
            return { userName: savedUser.userName };
        });
    }

}