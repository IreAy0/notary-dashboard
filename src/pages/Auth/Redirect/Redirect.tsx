import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PreLoader from 'components/Preloader';

const Redirect = () => {

  const history = useHistory()

  const token =  new URLSearchParams(window.location.search).get("qt")
  useEffect(() => {
    if(token){
      localStorage.setItem('accessToken', token);
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    }
  }, [token])

  return <PreLoader />
   
};

export default Redirect;
