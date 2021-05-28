import React from "react";
import styled from "styled-components";
import {CardActionArea, CardContent, IconButton, Typography} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {useRouter} from "next/router";

interface PropsType {
  name: string,
  id: string,
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
  const {name, id} = props;
  const router = useRouter();

  const enterToDo = () => {
    router.push(`/todo/${id}`);
  };

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
          onClick={() => console.log('delete')}
        >
          <DeleteOutlineIcon />
        </DeleteToDo>
      </DeleteWrapper>
    </ToDoCard>
  );
};

export default ToDo;
