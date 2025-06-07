export type AuthProps = {
  email: string;
  password: string;
};

export class Auth {
  private readonly email: string;
  private readonly password: string;

  constructor(props: AuthProps) {
    Object.assign(this, props);
  }

  get properties(): AuthProps {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
