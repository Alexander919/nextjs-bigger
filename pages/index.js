import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

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
    }
];

async function myFetch() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(DUMMY_MEETUPS);
        }, 2000);
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
        <MeetupList meetups={props.meetups} />
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
    return {
        //props received by the functional component(HomePage)
        props: {
            meetups: await myFetch()
        },
        //ensure the data in not longer than 10 seconds old
        revalidate: 20 //number of seconds to wait until page regeneration on the server
    };
}
export default HomePage;