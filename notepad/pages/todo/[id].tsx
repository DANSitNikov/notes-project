import React, {useEffect, useState} from "react";
import Link from "next/link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styled from "styled-components";
import {IconButton} from "@material-ui/core";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase";
import {useRouter} from "next/router";
import {NoteType} from "../../components/allNotes/AllNotes";

const Container = styled.div`
  position: relative;
`;

const Back = styled(IconButton)`
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: whitesmoke !important;
  color: black !important;
`;

const Name = styled.h2`
  text-align: center;
`;

const ToDo: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [toDoData, setToDoData] = useState<any>();

  useEffect(() => {
    db
      .collection("users")
      .doc(user?.uid)
      .collection('todos')
      .doc(router.query.id as any)
      .get()
      .then((querySnapshot) => {
        setToDoData(querySnapshot.data() as any);
      });
  }, []);

  return (
    <Container>
      <Link href='/'>
        <Back>
          <ArrowBackIcon />
        </Back>
      </Link>
      <Name>
        Name: {' '}
        {toDoData?.name}
      </Name>
    </Container>
  );
};

export default ToDo;
