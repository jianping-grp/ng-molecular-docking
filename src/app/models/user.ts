export interface User {
  id: number;
  password: string;
  last_login: any;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  phone: string;
  birth_date: string;
  groups: any[];
  user_permissions: any[];
  work_org: string;   // todo modify company_name and research
  research_dir: string;
  mobile: string;
  name: string;
}
