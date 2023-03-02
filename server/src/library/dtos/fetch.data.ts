import { IsNotEmpty, IsString } from "class-validator";

export class FetchData {
    @IsString()
    @IsNotEmpty()
    name: string
}
