import { IsNotEmpty } from "class-validator";
import { RolePlayerEnum } from "src/models/player.entity";

export class CreatePlayerDto {
    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    role: RolePlayerEnum;
}
