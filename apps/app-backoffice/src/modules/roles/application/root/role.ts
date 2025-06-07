export type RolePropsRequired = {
  name: string;
  actions: string;
};

export type RolePropsOptional = {
  roleId: number;
};

export type RoleProps = RolePropsRequired & Partial<RolePropsOptional>;

export class Role {
  private readonly roleId: number;
  private name: string;
  private actions: string;

  constructor(props: RoleProps) {
    if (props.actions.length === 0) throw new Error("Actions cannot be empty");
    if (props.name.length === 0) throw new Error("Name cannot be empty");

    Object.assign(this, props);
  }

  get properties(): RoleProps {
    return {
      roleId: this.roleId,
      name: this.name,
      actions: this.actions,
    };
  }
}
