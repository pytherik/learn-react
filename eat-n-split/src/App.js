import {useState} from "react";
import Button from "./components/Button";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import FriendsList from "./components/FriendsList";
import {initialFriends} from "./components/initialFriends";

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => setShowAddFriend(!showAddFriend);
  const handleAddFriend = (newFriend) => {
    setFriends([...friends, newFriend]);
    console.log(friends);
  }

  const handleSelection = (friend) => {
    setShowAddFriend(false);
    setSelectedFriend(selectedFriend?.id === friend.id ? null: friend);
  }

  const handleSplitBill = (value) => {
    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id
      ? {...friend, balance: friend.balance + value}
      : friend))
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={ friends } selectedFriend={ selectedFriend } onSelection={ handleSelection } />
        {showAddFriend && <FormAddFriend onAddFriend={ handleAddFriend }/>}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Schliessen': 'neuer Freund'}
        </Button>
      </div>
      {selectedFriend &&
        <FormSplitBill
          selectedFriend={ selectedFriend }
          onSplitBill={ handleSplitBill}/>}
    </div>
  );
};

export default App;
