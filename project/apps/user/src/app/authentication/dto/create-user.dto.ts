export class CreateUserDto {
  public avatar?: Blob;
  public email: string;
  public firstname: string;
  public lastname: string;
  public password: string;
}
