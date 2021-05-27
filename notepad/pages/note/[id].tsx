import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {route} from "next/dist/next-server/server/router";
import {NoteType} from "../../components/allNotes/AllNotes";

export async function getServerSideProps(context: any) {
  // const [user] = useAuthState(auth);

  const notes = await db
    .collection('users')
    .doc('4SoXVTF3ktasGXcQqsxfPsA9Ws03')
    .collection('notes')
    .doc(context.query.id)
    .get();

  console.log(notes, 'nooooooteeeees');

  return {
    props: {
      //notes,
      data: 'data'
    },
  };
}

const Note = (props: any) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [noteData, setNoteData] = useState<NoteType>();

  useEffect(() => {
    db
      .collection("users")
      .doc(user?.uid)
      .collection('notes')
      .doc(router.query.id as any)
      .get()
      .then((querySnapshot) => {
        setNoteData(querySnapshot.data() as NoteType);
    });
  }, []);

  return (
    <div>
      <h2>
        Name: {' '}
        {noteData?.name}
      </h2>
      <p>
        {noteData?.note}
      </p>
    </div>
  );
};

export default Note;
