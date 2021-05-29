import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {NoteType} from "../../components/allNotes/AllNotes";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {IconButton} from "@material-ui/core";
import Link from 'next/link';
import styled from "styled-components";
import moment from "moment";

const Container = styled.div`
  position: relative;
`;

const ToDoWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  font-size: 18px;
  color: #cbcaca;
`;

const Back = styled(IconButton)`
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: whitesmoke !important;
  color: black !important;
`;

const NoteHeader = styled.header`
  h1{
    text-align: center;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-between;
  align-items: center;
`;

const NoteContent = styled.pre`
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
      <ToDoWrapper>
        <NoteHeader>
          <h1>
            Note: {' '}
            {noteData?.name}
          </h1>
        </NoteHeader>
        <InfoBlock>
          <p>Category</p>
          <p>{
            noteData?.timestamp?.toDate().getTime()
            ? moment(noteData?.timestamp?.toDate().getTime()).format('MMM Do YY')
            : '...'
          }</p>
          <p>Edit</p>
        </InfoBlock>
        <NoteContent>
          {noteData?.note.trim()}
        </NoteContent>
      </ToDoWrapper>
    </Container>
  );
};

export default Note;
