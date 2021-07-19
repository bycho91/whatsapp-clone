import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "@/components/Chat";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Enter the recipient email address you wish to chat with :]"
    );

    if (!input) return null;

    // Validate if chat already exists
    const chatAlreadyExists = (recipientEmail) =>
      !!chatsSnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === recipientEmail)?.length > 0
      );

    // Validate if email is valid
    if (
      EmailValidator.validate(input) &&
      input !== user.email &&
      !chatAlreadyExists(input)
    ) {
      // Need to add the chat into the database 'chats' collection
      db.collection("chats").add({
        users: [user.email, input],
      });
    } else {
      if (chatAlreadyExists(input)) {
        alert("Chatroom already exists");
      } else {
        alert("Please check if email address in valid");
      }
    }
  };

  return (
    <Container className="w-[400px] h-screen border-r-[whitesmoke] border-2">
      <Header className="flex items-center sticky top-0 bg-white z-10 justify-between p-2 h-[80px] border-b-[1px] border-[whitesmoke]">
        <UserAvatar
          className="cursor-pointer hover:opacity-[0.8]"
          onClick={() => auth.signOut()}
          src={user ? user.photoURL : null}
        />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search className="flex items-center p-5 rounded-sm">
        <SearchIcon className="mr-2" />
        <SearchInput
          placeholder="Search in chats"
          className="focus:outline-none px-2 flex-1"
        />
      </Search>

      <SidebarButton className="w-full" onClick={createChat}>
        Start a new chat
      </SidebarButton>

      {/* LIST OF CHATS */}
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

// STYLED COMPONENTS

const Container = styled.div``;

const Header = styled.div``;

const UserAvatar = styled(Avatar)``;

const IconsContainer = styled.div``;

const Search = styled.div``;

const SearchInput = styled.input``;

const SidebarButton = styled(Button)`
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
