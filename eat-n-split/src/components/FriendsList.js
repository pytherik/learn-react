import Friend from "./Friend";

const FriendsList = ({ friends, onSelection, selectedFriend }) => {
  return (
    <ul>
      { friends.map((friend) =>
        <Friend key={ friend.id }
                friend={ friend }
                onSelection={ onSelection }
                selectedFriend={ selectedFriend }/>
      ) }
    </ul>
  )
}

export default FriendsList;