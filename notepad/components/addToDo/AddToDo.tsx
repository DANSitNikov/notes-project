import React, {useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase";
import firebase from "firebase";
import styled from "styled-components";
import {Button} from "@material-ui/core";

interface PropsType {
  setItem: (num: number) => void,
}

const Container = styled.div``;

const Form = styled.form``;

const Input = styled.input`
  outline: none;
  width: 300px;
  border-radius: 5px;
  padding: 10px 5px;
  color: #cbcaca;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #444444;
`;

const SubmitButton = styled(Button)`
  text-align: center !important;
  width: 150px !important;
  background-color: whitesmoke !important;
  cursor: pointer !important;
`;

const AddToDo: React.FC<PropsType> = (props) => {
  const {setItem} = props;
  const [name, setName] = useState<string>('');
  const [important, setImportant] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const sendToDo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    db.collection('users').doc(user?.uid).collection('todos').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      name: name,
      category: null,
      completed: false,
      important: important,
      remarks: '',
    });

    setName('');
  };

  return (
    <Container>
      <h2>Add new to-do</h2>
      <Form>
        <label htmlFor="todo">To-do</label>
        <br/>
        <br/>
        <Input
          onChange={(e) => setName(e.target.value)}
          name="todo"
          placeholder="todo"
          value={name}
        />
        <br/>
        <br/>
        <SubmitButton
          disabled={!name}
          onClick={async (e) => {
            await sendToDo(e);
            setItem(2);
          }}
          type="submit"

        >
          Create to-do
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default AddToDo;
