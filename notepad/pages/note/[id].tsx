import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {NoteType} from "../../components/allNotes/AllNotes";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {IconButton} from "@material-ui/core";
import Link from 'next/link';
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const Back = styled(IconButton)`
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: whitesmoke !important;
  color: black !important;
`;

const Name = styled.h2`
  text-align: center;
`;

const NoteContent = styled.p`
  margin: 20px auto;
  width: 500px;
  height: 70vh;
  overflow-y: scroll;
  font-size: 16px;
  
  ::-webkit-scrollbar{
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Note = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [noteData, setNoteData] = useState<NoteType>();

  useEffect(() => {
    db
      .collection("users")
      .doc(user?.uid)
      .collection('notes')
      .doc(router.query.id as any)
      .get()
      .then((querySnapshot) => {
        setNoteData(querySnapshot.data() as NoteType);
    });
  }, []);

  return (
    <Container>
      <Link href='/'>
        <Back>
          <ArrowBackIcon />
        </Back>
      </Link>
      <Name>
        Name: {' '}
        {noteData?.name}
      </Name>
      <NoteContent>
        <pre>
          {noteData?.note}
        </pre>
      </NoteContent>
    </Container>
  );
};

export default Note;
