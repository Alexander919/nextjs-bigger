import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails({ meetupData: { image, title, id, address, description } }) {
    return (
        <MeetupDetail image={image} title={title} id={id} address={address} description={description} />
    );
}
export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://alex:iGIRKE7q4x5HHdRk@cluster0.evblcst.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetupIds = await meetupsCollection.find({}, {_id: 1}).toArray();
    const paths = meetupIds.map(meetup => {
        return {
            params: {
                meetupId: meetup._id.toString()
            }
        };
    });
    client.close();
    return {
        // paths: [
        //     { 
        //         params: {
        //             meetupId: "m1"
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: "m2"
        //         }
        //     }
        // ],
        paths,
        fallback: false // all supported paths are defined
    };
};

export async function getStaticProps(context) {
    //fetch data for a single meetup

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect("mongodb+srv://alex:iGIRKE7q4x5HHdRk@cluster0.evblcst.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)});
    client.close();

    return {
        props: {
            meetupData: {
                id: meetup._id.toString(),
                image: meetup.image,
                title: meetup.title,
                description: meetup.description,
                address: meetup.address
            }
        }
    }
}
export default MeetupDetails;