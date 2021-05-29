import React, {useEffect, useState} from "react";
import Link from "next/link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styled from "styled-components";
import {Button, IconButton} from "@material-ui/core";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase";
import {useRouter} from "next/router";
import SetComplete from "../../components/setComplete";
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import SortIcon from '@material-ui/icons/Sort';
import ClassIcon from '@material-ui/icons/Class';
import SelectCategory from "../../components/selectCategory/SelectCategory";
import { Switch } from "@material-ui/core";

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
  display: flex;
  align-items: start;
  column-gap: 20px;
`;

const NameP = styled.p`
  margin: 0;
  max-height: 320px;
  overflow-y: auto;
  font-size: 18px;
  line-height: 28px;
  justify-content: space-evenly;

  ::-webkit-scrollbar{
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ToDoWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  font-size: 18px;
  color: #cbcaca;
`;

const CategoryBlock = styled.div`
  display: flex;  
  align-items: center;
  column-gap: 20px;
  font-size: 20px;
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

const RemarkIcon = styled(SortIcon)`
  color: grey;
  width: 40px !important;;
  height: 40px !important;;
`;

const CategoryIcon = styled(ClassIcon)`
  color: grey;
  width: 40px !important;
  height: 40px !important;;
`;

const RemarksBlock = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

const ToDoHeader = styled.header`
  h1{
    text-align: center;
  }
`;

const RemarkInput = styled.input`
  outline: none;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: #cbcaca;
  width: 200px;
  padding: 10px 0;
`;

const ToDo: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [toDoData, setToDoData] = useState<any>();
  const [completed, setCompleted] = useState(false);
  const [category, setCategory] = useState('No category');
  const [important, setImportant] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [categories] = useState<Array<string>>([
    'Work', 'Personal', 'Shopping', 'No category',
  ]);

  useEffect(() => {
    db
      .collection("users")
      .doc(user?.uid)
      .collection('todos')
      .doc(router.query.id as any)
      .get()
      .then((querySnapshot) => {
        setToDoData(querySnapshot.data() as any);
        setCompleted(querySnapshot.data()?.completed);
        setImportant(querySnapshot.data()?.important);
        setRemarks(querySnapshot.data()?.remarks);
      });
  }, []);

  const updateInfo = () => {
    db
      .collection("users")
      .doc(user?.uid)
      .collection('todos')
      .doc(router.query.id as any)
      .update({
        completed: completed,
        category: category,
        important: important,
        remarks: remarks,
      })
      .then(() => 'updated')
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
        <ToDoHeader>
          <h1>To-Do</h1>
        </ToDoHeader>
        <Name>
          <SetComplete
            completed={completed}
            setCompleted={setCompleted}
          />
          <NameP>
            {toDoData?.name}
          </NameP>
        </Name>
        <CategoryBlock>
          <CategoryIcon />
          <SelectCategory
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
        </CategoryBlock>
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
        <RemarksBlock>
          <RemarkIcon />
          <RemarkInput
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </RemarksBlock>
        <br />
        <Save
          onClick={updateInfo}
          variant="outlined"
        >
          Save
        </Save>
      </ToDoWrapper>
    </Container>
  );
};

export default ToDo;
