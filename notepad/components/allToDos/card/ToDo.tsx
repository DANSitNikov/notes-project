import React from "react";
import styled from "styled-components";
import {CardActionArea, CardContent, IconButton, Typography} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {useRouter} from "next/router";
import {auth, db} from "../../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";

interface PropsType {
  name: string,
  id: string,
  toDos: Array<any>
  setToDos: (arr: Array<any>) => void,
}

const ToDoCard = styled.div`
  display: flex;
  margin: 10px 0;
  border-radius: 7px;
  border: 1px solid grey;
  width: 100%;
`;

const Name = styled(Typography)`
  font-size: 20px;
`;

const DeleteWrapper = styled.div`
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #404040;
`;

const DeleteToDo = styled(IconButton)`
  background-color: whitesmoke !important;
`;

const CardName = styled(CardActionArea)``;

const ToDo: React.FC<PropsType> = (props) => {
  const {
    name, id, toDos, setToDos,
  } = props;
  const [user] = useAuthState(auth);
  const router = useRouter();

  const enterToDo = () => {
    router.push(`/todo/${id}`);
  };

  const deleteToDo = async () => {
    await db
      .collection('users')
      .doc(user?.uid)
      .collection('todos')
      .doc(id)
      .delete()
      .then(() => console.log('Successfully deleted!'))
      .catch((err) => console.log(err));

    console.log(toDos);
    const newToDos = toDos.filter((note) => note.id !== id);
    setToDos(newToDos);
  }

  return (
    <ToDoCard>
      <CardName
        onClick={enterToDo}
      >
        <CardContent>
          <Name>
            {name}
          </Name>
        </CardContent>
      </CardName>
      <DeleteWrapper>
        <DeleteToDo
          onClick={deleteToDo}
        >
          <DeleteOutlineIcon />
        </DeleteToDo>
      </DeleteWrapper>
    </ToDoCard>
  );
};

export default ToDo;
