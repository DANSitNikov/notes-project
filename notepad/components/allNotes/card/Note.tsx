import {Card, CardActionArea, CardContent, Typography} from "@material-ui/core";

const Note = () => {
  return (
    <Card style={{
      margin: '20px 0',
      background: '#262729',
      color: 'white',
    }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            Word of the Day
          </Typography>
          <Typography color="textSecondary" gutterBottom style={{color: 'white'}}>
            date
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Note;
