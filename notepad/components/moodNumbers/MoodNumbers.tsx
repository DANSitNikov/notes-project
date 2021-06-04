import Filter1RoundedIcon from '@material-ui/icons/Filter1Rounded';
import Filter2RoundedIcon from '@material-ui/icons/Filter2Rounded';
import Filter3RoundedIcon from '@material-ui/icons/Filter3Rounded';
import Filter4RoundedIcon from '@material-ui/icons/Filter4Rounded';
import Filter5RoundedIcon from '@material-ui/icons/Filter5Rounded';
import Filter6RoundedIcon from '@material-ui/icons/Filter6Rounded';
import Filter7RoundedIcon from '@material-ui/icons/Filter7Rounded';
import Filter8RoundedIcon from '@material-ui/icons/Filter8Rounded';
import Filter9RoundedIcon from '@material-ui/icons/Filter9Rounded';
import {IconButton} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase";
import firebase from "firebase";

const MoodNumbers = () => {
  const [disable, setDisable] = useState(false);
  const numbers = [
    Filter1RoundedIcon, Filter2RoundedIcon, Filter3RoundedIcon,
    Filter4RoundedIcon, Filter5RoundedIcon, Filter6RoundedIcon,
    Filter7RoundedIcon, Filter8RoundedIcon, Filter9RoundedIcon,
  ];
  const [user] = useAuthState(auth);

  useEffect(() => {
    let time: number;
    db.collection("users").doc(user?.uid).collection('mood').orderBy('timestamp', 'asc').get().then((querySnapshot) => {
      if (querySnapshot.docs.length > 0) {
        time =
          querySnapshot.docs[querySnapshot.docs.length - 1].data()
            .timestamp?.seconds;

        if (+Math.floor(new Date().getTime() / 3600000).toFixed() -
          +Math.floor(time / 3600).toFixed() >= 24
        ) {
          setDisable(false);
        } else {
          setDisable(true);
        }
      }
    });
  }, [user]);

  const handleClick = (mood: number) => {
    db.collection('users').doc(user?.uid).collection('mood').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      mood,
    });
  };

  return (
    <div>
      {
        numbers.map((Number, i) => (
          <IconButton
            onClick={() => {
              handleClick(i + 1);
              setDisable(true);
            }}
            key={i}
            disabled={disable}
          >
            <Number
              style={{color: 'white'}}
            />
          </IconButton>
        ))
      }
    </div>
  )
};

export default MoodNumbers;
