import {Button, IconButton, InputBase, Paper} from "@material-ui/core";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import DetailsIcon from "@material-ui/icons/Details";
import SearchIcon from "@material-ui/icons/Search";
import React, {useState} from "react";
import AllNotes from "../allNotes/AllNotes";

const Notes = () => {
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
      <Paper component="form" style={{width: '450px'}}>
        <InputBase
          placeholder="Search note"
          inputProps={{'aria-label': 'search google maps'}}
          style={{paddingLeft: '10px', width: '400px'}}
        />
        <IconButton
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <br/>
      <AllNotes />
    </div>
  );
};

export default Notes;
