import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {NoteType} from "../../components/allNotes/AllNotes";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Button, IconButton, Switch} from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import Link from 'next/link';
import styled from "styled-components";
import moment from "moment";
import SelectCategory from "../../components/selectCategory/SelectCategory";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

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
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const EditButton = styled.button`
  width: fit-content;
  padding: 0;
  margin: 0;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  color: #cbcaca;
  
  &:hover{
    color: grey;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoteContent = styled.pre`
  margin: 20px auto;
  width: 500px;
  height: 65vh;
  overflow-y: scroll;
  font-size: 16px;
  
  ::-webkit-scrollbar{
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Save = styled(Button)`
  background-color: whitesmoke !important;
`;

const ImportantBlock = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

const ImportantIcon = styled(PriorityHighIcon)`
  color: grey;
  width: 40px !important;;
  height: 40px !important;;
`;

const EditNoteText = styled.textarea`
  width: 100%;
  height: 300px;
  margin: 5px 0 20px 0;
  outline: none;
  border: 1px solid #444444;
  resize: none;
  white-space: pre-line;
  background-color: rgba(0, 0, 0, 0);
  color: #cbcaca;

  ::-webkit-scrollbar{
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Star = styled(StarIcon)`
  color: gold !important;
  width: 50px !important;
  height: 50px !important;
`;

const Note = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [categories] = useState<Array<string>>([
    'Work', 'Personal', 'Shopping', 'No category',
  ]);
  const [editMode, setEditMode] = useState(false);
  const [noteData, setNoteData] = useState<NoteType>();
  const [category, setCategory] = useState<string>('No category');
  const [important, setImportant] = useState(false);
  const [note, setNote] = useState<string>('');
  const [noteForEdit, setNoteForEdit] = useState<string>('');

  useEffect(() => {
    db
      .collection("users")
      .doc(user?.uid)
      .collection('notes')
      .doc(router.query.id as any)
      .get()
      .then((querySnapshot) => {
        setNoteData(querySnapshot.data() as NoteType);
        setCategory(querySnapshot.data()?.category);
        setNote(querySnapshot.data()?.note);
        setNoteForEdit(querySnapshot.data()?.note);
    });
  }, []);

  const updateInfo = () => {
    db
      .collection("users")
      .doc(user?.uid)
      .collection('notes')
      .doc(router.query.id as any)
      .update({
        category: category,
        important: important,
        note: noteForEdit,
      })
      .then(() => {
        console.log('updated');
        setNoteForEdit(noteForEdit);
        setNote(noteForEdit);
      })
      .catch((err) => console.log(err));
  };

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
            Note {important ? <Star /> : ''}
          </h1>
          <h3
            style={{overflow: 'hidden'}}
          >
            {noteData?.name}
          </h3>
        </NoteHeader>
        {
          !editMode
          && (
            <>
              <InfoBlock>
                <p>{category}</p>
                <p>{
                  noteData?.timestamp?.toDate().getTime()
                    ? moment(noteData?.timestamp?.toDate().getTime()).format('MMM Do YY')
                    : '...'
                }</p>
                <EditButton
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </EditButton>
              </InfoBlock>
              <NoteContent>
                {note.trim()}
              </NoteContent>
            </>
          )
        }
        {
          editMode
          && (
            <>
              <InfoBlock>
                <SelectCategory
                  category={category}
                  setCategory={setCategory}
                  categories={categories}
                  />
                <p>{
                  noteData?.timestamp?.toDate().getTime()
                    ? moment(noteData?.timestamp?.toDate().getTime()).format('MMM Do YY')
                    : '...'
                }</p>
                <EditButton
                  onClick={() => setEditMode(false)}
                >
                  Original
                </EditButton>
              </InfoBlock>
              <ImportantBlock>
                <ImportantIcon />
                <h4>
                  Mark as important
                </h4>
                <Switch
                  checked={important}
                  onChange={() => setImportant(!important)}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </ImportantBlock>
              <EditNoteText
                value={noteForEdit}
                onChange={(e) => setNoteForEdit(e.target.value)}
              />
              <Save
                onClick={updateInfo}
                variant="outlined"
              >
                Save
              </Save>
            </>
          )
        }
      </ToDoWrapper>
    </Container>
  );
};

export default Note;
