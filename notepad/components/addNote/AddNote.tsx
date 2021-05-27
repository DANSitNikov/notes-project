import styled from "styled-components";
import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "firebase";

const Container = styled.div``;

const Form = styled.form``;

const SubmitButton = styled(Button)`
  text-align: center !important;
  width: 150px !important;
  background-color: whitesmoke !important;
  cursor: pointer !important;
`;

interface PropsType {
  setItem: (num: number) => void,
}

const AddNote: React.FC<PropsType> = (props) => {
  const { setItem } = props;
  const [name, setName] = useState<string>();
  const [note, setNote] = useState<string>();
  const [user] = useAuthState(auth);

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    db.collection('users').doc(user?.uid).collection('notes').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      name: name,
      note: note,
    });

    setName('');
    setNote('');
  };

  return (
    <Container>
      <h2>Add new note</h2>
      <Form>
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          name="name"
          placeholder="name"
          value={name}
        />
        <br/>
        <textarea
          value={note}
          name="note"
          onChange={(e) => setNote(e.target.value)}
        />
        <br/>
        <SubmitButton
          disabled={!name || !note}
          onClick={async (e) => {
            await sendMessage(e);
            setItem(1);
          }}
          type="submit"

        >
          Send message
        </SubmitButton>
      </Form>
    </Container>
  )
};

export default AddNote;
