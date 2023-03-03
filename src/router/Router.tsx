/* eslint-disable object-curly-newline */
import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from 'pages/Home';
import Settings from 'pages/Settings';
import SignUp from 'pages/Auth/SignUp';
import SignIn from 'pages/Auth/SignIn';
import ForgotPassword from 'pages/Auth/ForgetPassword';
import ReSetPassword from 'pages/Auth/ReSetPassword';
import SetPassword from 'pages/Auth/SetPassword';
import VerifiyEmail from 'pages/Auth/VerifyEmail';
import PasswordRecovery from 'pages/Auth/PasswordRecovery';
import SingleRequest from 'pages/SingleRequest';
import Request from 'pages/MyRequest/Request';
import Locker from 'pages/MyLocker/Locker';
import MyTemplates from 'pages/MyTemplates';
import SingleDetailLocker from 'pages/SingleLocker';
import RequestDocument from 'pages/SingleRequest/Document';
import LockerDocument from 'pages/SingleLocker/Document';
// import NotarySession from 'pages/Session';
import VerifyExpired from 'pages/Auth/VerifyExpired';
import Certificate from 'pages/Certificate';
import SessionErrorPage from 'pages/SessionErrorPage';
import { appRoutePaths } from './Router.utils';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../pages/ErrorPage/Error';


const Router: FC = () => (
  <Switch>
    <PrivateRoute exact path={appRoutePaths.root} component={HomePage} />
    <PrivateRoute exact path={appRoutePaths.settings} component={Settings} />
    <PrivateRoute exact path={appRoutePaths.requestDocument} component={RequestDocument} />
    <PrivateRoute exact path={appRoutePaths.lockerDocument} component={LockerDocument} />

    <Route exact path={appRoutePaths.signUp} component={SignUp} />
    <Route exact path={appRoutePaths.signIn} component={SignIn} />
    <Route exact path={appRoutePaths.forgotPassword} component={ForgotPassword} />
    <Route exact path={appRoutePaths.resetPassword} component={ReSetPassword} />
    <Route exact path={appRoutePaths.setPassword} component={SetPassword} />
    <Route exact path={appRoutePaths.verifiyEmail} component={VerifiyEmail} />
    <Route exact path={appRoutePaths.verifyExpired} component={VerifyExpired} />
    <Route exact path={appRoutePaths.passwordRecovery} component={PasswordRecovery} />
    <PrivateRoute exact path={appRoutePaths.myRequest} component={Request} />
    <PrivateRoute exact path={appRoutePaths.singleRequest} component={SingleRequest} />
    <PrivateRoute exact path={appRoutePaths.myLocker} component={Locker} />
    <PrivateRoute exact path={appRoutePaths.singleLocker} component={SingleDetailLocker} />
    <PrivateRoute exact path={appRoutePaths.myTemplate} component={MyTemplates} />
    <PrivateRoute exact path={appRoutePaths.singleLocker} component={SingleDetailLocker} />
    {/* <PrivateRoute exact path={appRoutePaths.notarySession} component={NotarySession} /> */}
    <PrivateRoute exact path={appRoutePaths.certificate} component={Certificate} />
    <Route exact path={appRoutePaths.sessionError} component={SessionErrorPage} />
    <Route path="*" component={ErrorPage} />
  </Switch>
);

export default Router;
