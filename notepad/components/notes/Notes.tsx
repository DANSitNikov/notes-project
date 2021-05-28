import {IconButton, Paper} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, {useState} from "react";
import AllNotes from "../allNotes";
import styled from "styled-components";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Filter from "../filter";

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
  const [name] = useState('All notes');
  const [searchNote, setSearchNote] = useState<string>('');
  const [showedList, setShowedList] = useState(false);

  const chooseCategory = () => {
    setShowedList(!showedList);
  };

  return (
    <div>
      <Filter name={name} />
      <br/>
      <br/>
      <SearchAdd>
        <Paper component="form" style={{width: '450px'}}>
          <Input
            placeholder="Search note"
            onChange={(e) =>
              setSearchNote(e.target.value)}
            value={searchNote}
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
      <AllNotes searchNote={searchNote} />
    </div>
  );
};

export default Notes;
