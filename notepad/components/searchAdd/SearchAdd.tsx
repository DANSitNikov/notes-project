import React from "react";
import styled from 'styled-components';
import {IconButton, Paper} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  outline: none;
  border: none;
  padding: 10px;
  width: 390px;
`;

const AddNewNote = styled(AddCircleIcon)`
  color: greenyellow;
  width: 60px !important;
  height: 60px !important;
  margin-left: 30px;
`;

interface PropsType {
  setSearch: (str: string) => void,
  search: string,
  setItem: (num: number) => void,
  item: number,
  placeHolder: string
}

const SearchAdd: React.FC<PropsType> = (props) => {
  const {
    setItem, setSearch, search, item, placeHolder,
  } = props;

  return (
    <Container>
      <Paper component="form" style={{width: '450px'}}>
        <Input
          placeholder={placeHolder}
          onChange={(e) =>
            setSearch(e.target.value)}
          value={search}
        />
        <IconButton
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <IconButton
        style={{padding: '0'}}
        onClick={() => setItem(item)}
      >
        <AddNewNote />
      </IconButton>
    </Container>
  )
};

export default SearchAdd;
