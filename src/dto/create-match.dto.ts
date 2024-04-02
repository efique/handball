import { IsNotEmpty } from "class-validator"

export class CreateMatchDto {
  @IsNotEmpty()
  versus : string

  date : Date
  score : string
}
