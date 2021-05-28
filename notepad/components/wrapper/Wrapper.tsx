import React from "react";
import {Grid} from "@material-ui/core";
import Notes from "../notes";
import ToDos from "../todos";
import AddNote from "../addNote";

interface PropsType {
  item: number,
  setItem: (num: number) => void,
}

const Wrapper: React.FC<PropsType> = (props) => {
  const {item, setItem} = props;

  return (
    <Grid item xs={9} style={{padding: '20px'}}>
      {
        item === 1
        && <Notes setItem={setItem} />
      }
      {
        item === 2
        && <ToDos />
      }
      {
        item === 3
        && <AddNote setItem={setItem}/>
      }
    </Grid>
  );
};

export default Wrapper;
