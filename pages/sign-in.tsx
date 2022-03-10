import { Box } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import { IRootState } from '../redux/reducers';
export interface ISignInProps {
}
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // callbacks: {
    //   // Avoid redirects after sign-in.
    //   signInSuccessWithAuthResult: () => false,
    // },
  };

export default function SignIn (props: ISignInProps) {

  const isSign = useSelector((state: IRootState) => state.models.isSign);

  const router = useRouter();

  
  useEffect(() => {
    if (isSign){
      router.push('/mymusic')
    }
  }, [isSign])

  return (
    <Box sx={{height: "100vh", maxWidth: "100%"}}>
       {!isSign && <StyledFirebaseAuth  uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
    </Box>
  );
}
