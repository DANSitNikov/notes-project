import React from "react";
import {Grid} from "@material-ui/core";
import Notes from "../notes/Notes";
import ToDos from "../todos/ToDos";

interface PropsType {
  item: number,
}

const Wrapper: React.FC<PropsType> = (props) => {
  const {item} = props;

  return (
    <Grid item xs={9} style={{padding: '20px'}}>
      {
        item === 1
        && <Notes />
      }
      {
        item === 2
        && <ToDos />
      }
    </Grid>
  );
};

export default Wrapper;
