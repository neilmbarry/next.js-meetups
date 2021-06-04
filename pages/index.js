import React from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const DUMMY_DATA = [
  {
    title: "Sydney",
    description: "Beautiful Australian City",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
    id: "m1",
    address: "16 Baralga Crescent",
  },
  {
    title: "Toronto",
    description: "Beautiful Canadian City",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/Toronto_Skyline_2017.jpg",
    id: "m2",
    address: "125 Blue Jays Way",
  },
];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React meetups!</title>
        <meta name="description" content="A meetup app" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  //Fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://Neil:qwerty1234@cluster0.8ctb0.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
