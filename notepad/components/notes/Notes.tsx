import React, {useState} from "react";
import AllNotes from "../allNotes";
import Filter from "../filter";
import SearchAdd from "../searchAdd";

interface PropsType {
  setItem: (num: number) => void,
}

const Notes: React.FC<PropsType> = (props) => {
  const { setItem } = props;
  const [name] = useState('All notes');
  const [item] = useState(3);
  const [placeHolder] = useState('Search note');
  const [searchNote, setSearchNote] = useState<string>('');

  return (
    <div>
      <Filter name={name} />
      <br/>
      <br/>
      <SearchAdd
        setItem={setItem}
        search={searchNote}
        setSearch={setSearchNote}
        item={item}
        placeHolder={placeHolder}
      />
      <br/>
      <AllNotes searchNote={searchNote} />
    </div>
  );
};

export default Notes;
