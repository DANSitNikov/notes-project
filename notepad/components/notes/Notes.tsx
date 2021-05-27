import {Button, IconButton, InputBase, Paper} from "@material-ui/core";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import DetailsIcon from "@material-ui/icons/Details";
import SearchIcon from "@material-ui/icons/Search";
import React, {useState} from "react";
import AllNotes from "../allNotes/AllNotes";
import styled from "styled-components";
import Link from 'next/link'
import AddCircleIcon from '@material-ui/icons/AddCircle';

const SearchAdd = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  outline: none;
  border: none;
  padding: 10px;
  width: 400px;
`;

const AddNewNote = styled(AddCircleIcon)`
  color: greenyellow;
  width: 60px !important;
  height: 60px !important;
  margin-left: 30px;
`;

interface PropsType {
  setItem: (num: number) => void,
}

const Notes: React.FC<PropsType> = (props) => {
  const { setItem } = props;
  const [showedList, setShowedList] = useState(false);

  const chooseCategory = () => {
    setShowedList(!showedList);
  };

  return (
    <div>
      <Button
        variant="contained"
        endIcon={showedList ? <ChangeHistoryIcon/> : <DetailsIcon/>}
        onClick={chooseCategory}
      >
        All notes
      </Button>
      <br/>
      <br/>
      <SearchAdd>
        <Paper component="form" style={{width: '450px'}}>
          <Input
            placeholder="Search note"
          />
          <IconButton
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <IconButton
          style={{padding: '0'}}
          onClick={() => setItem(3)}
        >
          <AddNewNote />
        </IconButton>
      </SearchAdd>
      <br/>
      <AllNotes />
    </div>
  );
};

export default Notes;
