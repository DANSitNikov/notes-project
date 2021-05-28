import React, {useState} from "react";
import {Button} from "@material-ui/core";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import DetailsIcon from "@material-ui/icons/Details";

interface PropsType {
  name: string,
}

const Filter: React.FC<PropsType> = (props) => {
  const {name} = props;
  const [showedList, setShowedList] = useState(false);

  const chooseCategories = () => {
    setShowedList(!showedList);
  };

  return (
    <Button
      variant="contained"
      endIcon={showedList ? <ChangeHistoryIcon/> : <DetailsIcon/>}
      onClick={chooseCategories}
    >
      {name}
    </Button>
  );
};

export default Filter;
