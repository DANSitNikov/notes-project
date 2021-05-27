import {Card, CardActionArea, CardContent, IconButton, Typography} from "@material-ui/core";
import React from "react";
import moment from "moment";
import {useRouter} from "next/router";

interface PropsType {
  name: string,
  date: any,
  id: string
}

const Note: React.FC<PropsType> = React.memo((props) => {
  const { name, date, id } = props;
  const router = useRouter();

  const enterNote = () => {
    router.push(`/note/${id}`)
  };

  return (
    <Card
      style={{
      margin: '20px 0',
      background: '#262729',
      color: 'white',
        position: 'relative',
    }}
      onClick={enterNote}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography color="textSecondary" gutterBottom style={{color: 'white'}}>
            {date ? moment(date).format('LT') : '...'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default Note;
