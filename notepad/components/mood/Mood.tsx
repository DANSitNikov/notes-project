import React, { useEffect, useState} from "react";
import MoodNumbers from "../moodNumbers";
import {Line} from 'react-chartjs-2';
import styled from "styled-components";
import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import moment from "moment";
import {event} from "next/dist/build/output/log";
import {useRouter} from "next/router";

interface PropsType {
  setItem: (num: number) => void,
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

interface MoodType {
  mood: number,
  timestamp: any,
}

const Container = styled.div``;

const Graph = styled.div``;

const Mood: React.FC<PropsType> = (props) => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState<any>(null);
  const [notes, setNotes] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    db.collection("users").doc(user?.uid).collection('mood').orderBy('timestamp', 'asc').get().then((querySnapshot) => {
      const newMood: Array<MoodType> = [];

      querySnapshot.forEach( (mood) => {
        newMood.push(mood.data() as any);
      });

      const newData = {
        labels: newMood.map((mood) => moment(
          mood.timestamp?.toDate().getTime()).format('MMM Do YY')),
        datasets: [
          {
            label: 'Mood',
            data: newMood.map((mood) => mood.mood),
            fill: false,
            backgroundColor: 'rgb(0,25,246)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 5,
          },
        ],
      };

      setData(newData);
    });

    db.collection("users").doc(user?.uid).collection('notes').orderBy('timestamp', 'asc').get().then((querySnapshot) => {
      const newNotes: any = [];

      querySnapshot.forEach((note) => {
        newNotes.push([note.data(), note.id]);
      });

      setNotes(newNotes);
    });
  }, [user]);

  const getElementAtEvent = (element: any) => {
    if (!element.length) return;

    const { index } = element[0];
    const time = notes[0][0].timestamp

    if (data.labels[index] === moment(time?.toDate().getTime()).format('MMM Do YY')) {
      router.push(`/note/${notes[0][1]}`);
    }
  };

  return (
    <Container>
      <h1>Mood</h1>
      <h4>Choose mood for today</h4>
      <MoodNumbers />
      {
        data
        && (
          <Graph>
            <Line
              type="line"
              data={data}
              options={options}
              getElementAtEvent={getElementAtEvent}
            />
          </Graph>
        )
      }
      {
        !data
        && (
          <>
            loading
          </>
        )
      }
    </Container>
  );
};

export default Mood;
