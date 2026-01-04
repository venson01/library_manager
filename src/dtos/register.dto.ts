import { IsEmail, IsEnum, IsPhoneNumber, IsString } from "class-validator";
import { RoleEnum } from "../models/User";

// Data Transfer Object for user registration
export class RegisterDTO {

    @IsEmail()
    email!: string;

    @IsString()
    password!: string;

    @IsString()
    name!: string;

    @IsEnum(RoleEnum)
    role!: RoleEnum;

    @IsString()
    address!: string;

    @IsPhoneNumber()
    phone!: string;
}