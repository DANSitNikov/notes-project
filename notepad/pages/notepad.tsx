import { Grid } from "@material-ui/core";
import Menu from "../components/menu/Menu";
import Wrapper from "../components/wrapper/Wrapper";
import {useState} from "react";

const Notepad = () => {
  const [item, setItem] = useState(1);

  return (
    <Grid container>
      <Menu setItem={setItem}/>
      <Wrapper item={item} setItem={setItem}/>
    </Grid>
  );
};

export default Notepad;

