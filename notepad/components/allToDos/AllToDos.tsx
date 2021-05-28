import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase";
import styled from "styled-components";
import ToDo from "./card";

interface PropsType {
  searchToDo: string
}

const Container = styled.div`
  overflow-y: scroll;
  max-height: 75vh;
  height: 75vh;
  display: flex;
  column-gap: 10px;
  justify-content: space-between;

  ::-webkit-scrollbar{
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ToDos = styled.div`
  width: 270px;
`;

const AllToDos: React.FC<PropsType> = (props) => {
  const { searchToDo } = props;
  const [user] = useAuthState(auth);
  const [toDos, setToDos] = useState<Array<any>>([]);

  useEffect(() => {
    db.collection("users").doc(user?.uid).collection('todos').orderBy('timestamp', 'asc').get().then((querySnapshot) => {
      const newToDos: Array<any> = [];

      querySnapshot.forEach( (toDo) => {
        const addToDo = {
          ...toDo.data(),
          id: toDo.id,
        }
        newToDos.push(addToDo as any);
      });

      setToDos(newToDos.reverse());
    });
  }, [user]);

  return (
    <Container>
      <ToDos>
        <h2>Not completed</h2>
        {
          toDos
          && toDos.map((toDo) => {
            if (!toDo.name.toLowerCase()
                .includes(searchToDo.toLowerCase())
              || toDo.status === 'completed'
            ) {
              return;
            }

            return (
              <ToDo
                key={toDo.id}
                name={toDo.name}
                id={toDo.id}
              />
            );
          })
        }
      </ToDos>
      <ToDos>
        <h2>Completed</h2>
        {
          toDos
          && toDos.map((toDo) => {
            if (!toDo.name.toLowerCase()
                .includes(searchToDo.toLowerCase())
              || toDo.status === 'not completed'
            ) {
              return;
            }

            return (
              <ToDo
                key={toDo.id}
                name={toDo.name}
                id={toDo.id}
              />
            );
          })
        }
      </ToDos>
    </Container>
  );
};

export default AllToDos;
