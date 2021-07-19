import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";

const Chat = ({ id, users }) => {
  console.log(id, users);
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipientEmail = getRecipientEmail(users, user);
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  return (
    <Container className="p-4 flex items-center cursor-pointer p-[15px] break-words hover:bg-[#e9eaeb]">
      {recipient ? (
        <UserAvatar className="m-[5px] mr-[15px]" src={recipient?.photoURL} />
      ) : (
        <UserAvatar className="m-[5px] mr-[15px]">
          {recipientEmail[0]}
        </UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
};

export default Chat;

const Container = styled.div``;

const UserAvatar = styled(Avatar)``;
