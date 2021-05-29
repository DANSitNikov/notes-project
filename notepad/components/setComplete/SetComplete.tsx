import React, {useState} from "react";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {IconButton} from "@material-ui/core";
import styled from "styled-components";

const CompleteButton = styled(IconButton)`
  border: 1px solid grey !important;
  width: 38px;
  height: 38px;
  padding: 0 !important;
  
  svg{
    width: 100%;
    height: 100%;
    color: whitesmoke;
  }
`;

interface PropsType {
  completed: boolean,
  setCompleted: (bool: boolean) => void,
}

const SetComplete: React.FC<PropsType> = (props) => {
  const {completed, setCompleted} = props;

  return (
    <CompleteButton
      onClick={() => setCompleted(!completed)}
    >
      {
        completed
        && <CheckCircleOutlineIcon />
      }
    </CompleteButton>
  );
};

export default SetComplete;
