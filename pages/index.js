import { MongoClient } from "mongodb";
import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

const DUMMY_MEETUPS = [
    {
        id: "m1",
        title: "first meetup",
        image: "https://cdn.pixabay.com/photo/2014/01/07/10/39/bike-239882_1280.jpg",
        address: "an address",
        description: "bla bla bla"
    },
    {
        id: "m2",
        title: "second meetup",
        image: "https://cdn.pixabay.com/photo/2014/01/07/10/39/bike-239882_1280.jpg",
        address: "an address 2",
        description: "bla bla bla bla"
    },
    {
        id: "m3",
        title: "third meetup",
        image: "https://cdn.pixabay.com/photo/2014/01/07/10/39/bike-239882_1280.jpg",
        address: "an address 3",
        description: "bla bla bla bla bla"
    },
    {
        id: "m4",
        title: "fourth meetup",
        image: "https://cdn.pixabay.com/photo/2014/01/07/10/39/bike-239882_1280.jpg",
        address: "an address 4",
        description: "bla bla bla bla bla"
    },
    {
        id: "m5",
        title: "fourth meetup",
        image: "https://cdn.pixabay.com/photo/2014/01/07/10/39/bike-239882_1280.jpg",
        address: "an address 5",
        description: "bla bla bla bla bla"
    },
    {
        id: "m6",
        title: "kkjljl meetup",
        image: "https://cdn.pixabay.com/photo/2014/01/07/10/39/bike-239882_1280.jpg",
        address: "an address 6",
        description: "bla bla bla bla bla"
    }

];

async function myFetch() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(DUMMY_MEETUPS);
        }, 200);
    });
};

function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([]);

    // useEffect(() => {
    //     const getMeetups = async () => {
    //         const meetups = await myFetch();
    //         setLoadedMeetups(meetups);
    //     };
    //     getMeetups();
    // }, []);

    // return (
    //     <MeetupList meetups={loadedMeetups} />
    // );
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse blanbljdf fsjdfja " />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}
//never runs on the client! user credentials can be used
//runs always(with every request) on the server after deployment
// export async function getServerSideProps(context) {
//     //we have access to request and response
//     const req = context.req;
//     const res = context.res;
//     //fetch data from an API
//     return {
//         props: {
//             meetups: await myFetch()
//         }
//     }
// };
// //never runs on the client! user credentials can be used
export async function getStaticProps() {
    //fetch data from an API
    const client = await MongoClient.connect("mongodb+srv://alex:iGIRKE7q4x5HHdRk@cluster0.evblcst.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        //props received by the functional component(HomePage)
        props: {
            meetups: meetups.map(meetup => {
                return {
                    title: meetup.title,
                    address: meetup.address,
                    image: meetup.image,
                    id: meetup._id.toString()
                }
            })
        },
        //ensure the data in not longer than 10 seconds old
        revalidate: 30 //number of seconds to wait until page regeneration on the server
    };
}
export default HomePage;