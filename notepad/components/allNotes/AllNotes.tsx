import styled from "styled-components";
import Note from "./card/Note";
import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import React, {useEffect, useState} from "react";

const Container = styled.div`
  overflow-y: scroll;
  max-height: 75vh;
  height: 75vh;

  ::-webkit-scrollbar{
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export interface NoteType {
  name: string,
  note: string,
  timestamp: any,
  id?: string,
}

interface PropsType {
  searchNote: string
}

const AllNotes: React.FC<PropsType> = (props) => {
  const { searchNote } = props;
  const [user] = useAuthState(auth);
  const [notes, setNotes] = useState<Array<NoteType>>([]);

  useEffect(() => {
    db.collection("users").doc(user?.uid).collection('notes').orderBy('timestamp', 'asc').get().then((querySnapshot) => {
      const newNotes: Array<NoteType> = [];

      querySnapshot.forEach( (note) => {
        const addNote = {
          ...note.data(),
          id: note.id,
        }
        newNotes.push(addNote as NoteType);
      });

      setNotes(newNotes.reverse());
    });
  }, []);

  return (
    <Container>
      {
        notes
        && notes.map((note) => {
          if (!note.name.toLowerCase()
            .includes(searchNote.toLowerCase())) {
            return;
          }

          return (
            <Note
              key={note.id}
              id={note.id as string}
              name={note.name}
              date={note.timestamp?.toDate().getTime()}
            />
          )
        })
      }
    </Container>
  )
};

export default AllNotes;
