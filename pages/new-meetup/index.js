import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
    const addMeetupHandler = (data) => {
        console.log(data);
    };

    return (
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    );
}

export default NewMeetup;