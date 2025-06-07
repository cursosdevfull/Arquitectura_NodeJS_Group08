export class StudentCreatedEvent {
  constructor(
    public readonly name: string,
    public readonly lastname: string,
    public readonly email: string,
  ) {}
}
