import Link from 'next/link';
import {Button, makeStyles} from "@material-ui/core";

const useStyled = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    width: '150px',
    margin: '20px',
    color: 'white',
    background: '#606770'
  }
})

export default function Home() {
  const classes = useStyled();

  return (
    <main className={classes.container}>
      <h1>Welcome to notepad app!</h1>
      <div>
        <Link href="login">
          <Button className={classes.buttons}>Login</Button>
        </Link>
        <Link href="signup">
          <Button className={classes.buttons}>Sign up</Button>
        </Link>
      </div>
    </main>
  )
}

// var firebaseConfig = {
//   apiKey: "AIzaSyB1XHJrkhV0pjfFH4sJMZeFtaxJXg2XxXA",
//   authDomain: "notepad-78aae.firebaseapp.com",
//   projectId: "notepad-78aae",
//   storageBucket: "notepad-78aae.appspot.com",
//   messagingSenderId: "1076421173466",
//   appId: "1:1076421173466:web:746d342f7a7b8c375b85e3",
//   measurementId: "G-9X5LK2QM4Q"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
