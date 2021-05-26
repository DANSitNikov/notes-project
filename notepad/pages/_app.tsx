import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../firebase";
import { useEffect } from 'react';
import Loading from "../components/loading/Loading";
import Login from "./login";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).set({
        email: user.email,
        photoURL: user.photoURL,
      }, {merge: true});
    }
  });

  if (loading) return <Loading />
  if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp;
