import Filter from "../filter";
import React, {useState} from "react";
import SearchAdd from "../searchAdd";
import AllToDos from "../allToDos";

interface PropsType {
  setItem: (num: number) => void,
}

const ToDos: React.FC<PropsType> = (props) => {
  const { setItem } = props;
  const [name] = useState('All to-dos');
  const [item] = useState(4);
  const [placeHolder] = useState('Search to-do');
  const [searchToDo, setSearchToDo] = useState<string>('');

  return (
    <div>
      <Filter name={name} />
      <br/>
      <br/>
      <SearchAdd
        setSearch={setSearchToDo}
        search={searchToDo}
        setItem={setItem}
        item={item}
        placeHolder={placeHolder} />
      <br/>
      <AllToDos searchToDo={searchToDo} />
    </div>
  );
};

export default ToDos;
