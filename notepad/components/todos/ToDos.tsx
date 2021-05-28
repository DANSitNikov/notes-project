import Filter from "../filter";
import {useState} from "react";

const ToDos = () => {
  const [name] = useState('All to-dos');

  return (
    <div>
      <Filter name={name} />
    </div>
  );
};

export default ToDos;
