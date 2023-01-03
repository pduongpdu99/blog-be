export class User extends BaseEntity<string> {
  roleId: number = 0;
  categoryId: number;

  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  hash: string;
  bio: string;
}
