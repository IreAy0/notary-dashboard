interface User {
  user_id?: string;
  id?: string;
  plan?: string | null;
  first_name?: string;
  last_name?: string;
  email?: string;
  companyVerificationStatus?: string | null;
  company_id?: string;
  company_email?: string;
  is_verified_profile?: boolean;
  is_verified?: boolean;
  sendDocumentLeft?: number;
  name?: string;
  phonenumber?: string;
  activesubscription?: boolean;
  team_base_account?: boolean;
  team_role_code?: string;
}

export default User;
