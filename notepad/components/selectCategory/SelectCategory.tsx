import React from "react";
import styled from "styled-components";

interface PropsType {
  category: string,
  setCategory: (str: string) => void,
  categories: Array<string>,
}

const SelectBlock = styled.select`
  outline: none;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  width: 150px;
  color: #cbcaca;
  font-size: 18px;
  cursor: pointer;
  
  option{
    background-color: grey;
    height: 50px;
  }
`;

const SelectCategory: React.FC<PropsType> = (props) => {
  const { category, setCategory, categories } = props;

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLSelectElement;
    setCategory(target.value);
  };

  return (
    <SelectBlock
      onClick={handleClick}
    >
      {
        categories.map((item) => (
          <option
            selected={category === item}
          >
            {item}
          </option>
        ))
      }
    </SelectBlock>
  );
};

export default SelectCategory;
