const pathResolver = (modulePath: string) => modulePath;

export const appRoutes = {
  root: () => '/',
  test: () => pathResolver('/test'),
  signUp: () => pathResolver('/auth/sign-up'),
  signIn: () => pathResolver('/auth/sign-in'),
  settings: () => pathResolver('/settings/:tab'),
  forgotPassword: () => pathResolver('/auth/forgot-password'),
  resetPassword: () => pathResolver('/reset-password'),
  setPassword: () => pathResolver('/auth/set-password'),
  verifiyEmail: () => pathResolver('/auth/verify-email'),
  passwordRecovery: () => pathResolver('/auth/password-recovery'),
  verifyExpired: () => pathResolver('/auth/expired'),
  myRequest: () => pathResolver('/requests'),
  singleRequest: () => pathResolver('/requests/:id'),
  requestDocument: () => pathResolver('/requests/:id/document'),
  lockerDocument: () => pathResolver('/locker/:id/document'),
  certificate: () => pathResolver('/requests/:id/certificate'),
  myLocker: () => pathResolver('/locker'),
  singleLocker: () => pathResolver('/locker/:id'),
  myTemplate: () => pathResolver('/templates'),
  singleTemplate: ()=> pathResolver('/template/:id'),
  notarySession: () => pathResolver('/session/:id'),
  sessionError: () => pathResolver('/session-error'),
  redirect: () => pathResolver('/redirecting'),
  error: () => pathResolver('/error')
};

export const appRoutePaths: {
  root: string;
  signUp: string;
  signIn: string;
  settings: string;
  forgotPassword: string;
  resetPassword: string;
  setPassword: string;
  verifiyEmail: string;
  verifyExpired: string;
  passwordRecovery: string;
  myRequest: string;
  singleRequest: string;
  myLocker: string;
  singleLocker: string;
  requestDocument: string;
  lockerDocument: string;
  certificate: string;
  notarySession: string;
  sessionError: string;
  error: string;
  myTemplate: string;
  singleTemplate: string;
  redirect:string;
} = {
  root: appRoutes.root(),
  signUp: appRoutes.signUp(),
  signIn: appRoutes.signIn(),
  settings: appRoutes.settings(),
  forgotPassword: appRoutes.forgotPassword(),
  resetPassword: appRoutes.resetPassword(),
  setPassword: appRoutes.setPassword(),
  verifiyEmail: appRoutes.verifiyEmail(),
  verifyExpired: appRoutes.verifyExpired(),
  passwordRecovery: appRoutes.passwordRecovery(),
  myRequest: appRoutes.myRequest(),
  singleRequest: appRoutes.singleRequest(),
  myLocker: appRoutes.myLocker(),
  singleLocker: appRoutes.singleLocker(),
  myTemplate: appRoutes.myTemplate(),
  singleTemplate: appRoutes.singleTemplate(),
  requestDocument: appRoutes.requestDocument(),
  lockerDocument: appRoutes.lockerDocument(),
  certificate: appRoutes.certificate(),
  notarySession: appRoutes.notarySession(),
  sessionError: appRoutes.sessionError(),
  error: appRoutes.error(),
  redirect: appRoutes.redirect()
};
