import {Card, CardActionArea, CardContent, IconButton, Typography} from "@material-ui/core";
import React from "react";
import moment from "moment";
import {useRouter} from "next/router";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import styled from "styled-components";
import {auth, db} from "../../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {NoteType} from "../AllNotes";

interface PropsType {
  name: string,
  date: any,
  id: string,
  notes: Array<NoteType>
  setNotes: (arr: Array<NoteType>) => void,
}

const NoteCard = styled(Card)`
  display: flex;
`;

const CardName = styled(CardActionArea)``;

const DeleteWrapper = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #404040;
`;

const DeleteNote = styled(IconButton)`
  background-color: whitesmoke !important;
`;

const Note: React.FC<PropsType> = React.memo((props) => {
  const [user] = useAuthState(auth);
  const { name, date, id, notes, setNotes } = props;
  const router = useRouter();

  const enterNote = () => {
    router.push(`/note/${id}`)
  };

  const shortName = (name: string) => {
    const testName = name;

    if (testName.length > 35) {
      return testName.slice(0, 36) + '...';
    }

    return testName;
  }

  const deleteNote = async () => {
    await db
      .collection('users')
      .doc(user?.uid)
      .collection('notes')
      .doc(id)
      .delete()
      .then(() => console.log('Successfully deleted!'))
      .catch((err) => console.log(err));

    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <NoteCard
      style={{
      margin: '20px 0',
      background: '#262729',
      color: 'white',
      position: 'relative',
    }}
    >
      <CardName
        onClick={enterNote}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {shortName(name)}
          </Typography>
          <Typography color="textSecondary" gutterBottom style={{color: 'white'}}>
            {date ? moment(date).format('MMM Do YY') : '...'}
          </Typography>
        </CardContent>
      </CardName>
      <DeleteWrapper>
        <DeleteNote
          onClick={deleteNote}
        >
          <DeleteOutlineIcon />
        </DeleteNote>
      </DeleteWrapper>
    </NoteCard>
  );
});

export default Note;
