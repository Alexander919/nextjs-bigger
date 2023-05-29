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
]
function HomePage() {
    return (
        <MeetupList meetups={DUMMY_MEETUPS} />
    );
}

export default HomePage;