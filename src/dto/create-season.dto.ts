import { IsNotEmpty } from "class-validator"

export class CreateSeasonDto {
  @IsNotEmpty()
  name : string

  victory : number
  draw : number
  lose : number
}
