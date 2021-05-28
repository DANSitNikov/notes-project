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
  border: none;
  padding: 10px;
  width: 300px;
  border-radius: 5px;
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
  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('not completed');
  const [user] = useAuthState(auth);

  const sendToDo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    db.collection('users').doc(user?.uid).collection('todos').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      name: name,
      category: category,
      status: status,
    });

    setName('');
  };

  return (
    <Container>
      <h2>Add new to-do</h2>
      <Form>
        <label htmlFor="todo">Name</label>
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
