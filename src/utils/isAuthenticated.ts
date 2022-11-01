import jwtDecode from 'jwt-decode';
import axios from '../services/axios';

type JWTDecode = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

export default (): boolean => {
  const accessToken = localStorage.getItem('accessToken');
    
  // check if token exists and is not expired
  if (accessToken) {
    try {
      const token: JWTDecode = jwtDecode(accessToken);
      const time = Date.now().valueOf() / 1000;    
      if (token.exp < time) {
        console.log('false');
        
        return false;
      }
    } catch (error) {
      return false;
    }
    axios.defaults.headers.common.Authorization = accessToken;

    return !!accessToken;
  }

  return false;
};
// check if token exists and is not expired

