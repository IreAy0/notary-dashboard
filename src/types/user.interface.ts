export interface User {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  role?: string;
  email?: string;
  is_verified_profile?: boolean;
  is_verified?: boolean;
  plan?: string | null;
  permissions?: any;
};
