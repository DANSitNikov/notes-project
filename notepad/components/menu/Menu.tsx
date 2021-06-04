import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';import FavoriteIcon from '@material-ui/icons/Favorite';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import NotesIcon from '@material-ui/icons/Notes';
import {Button, Grid} from "@material-ui/core";
import styled from "styled-components";
import {auth} from "../../firebase";

interface PropsType {
  setItem: (num: number) => void,
}

const SignOut = styled(Button)`
  margin: 20px auto !important;
  background-color: whitesmoke !important;
  color: black !important;
`;

const Menu: React.FC<PropsType> = (props) => {
  const { setItem } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid item xs={2} style={{textAlign: 'center'}}>
      <SignOut onClick={() => auth.signOut()}>Sign out</SignOut>
      <Tabs
        value={value}
        orientation="vertical"
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab
          style={{minWidth: '0 !important', color: 'white'}}
          icon={<NotesIcon />} label="NOTES"
          onClick={() => setItem(1)}
        />
        <Tab
          style={{minWidth: '0 !important', color: 'white'}}
          icon={<CheckCircleOutlineRoundedIcon />}
          label="TO-DOS"
          onClick={() => setItem(2)}
        />
        <Tab
          style={{minWidth: '0 !important', color: 'white'}}
          icon={<MoodIcon />}
          label="MOOD"
          onClick={() => setItem(5)}
        />
      </Tabs>
    </Grid>
  );
};

export default Menu;

