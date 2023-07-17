import Button from "./Button";

const Friend = ({ friend, onSelection, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friend.id;
  // const isSelected = false
  return (
    <li className={ isSelected ? 'selected': ''}>
      <img src={ friend.image } alt={ friend.name }/>
      <h3>{ friend.name }</h3>
      { friend.balance < 0 && <p className='red'>Du schuldest { friend.name } {Math.abs(friend.balance)}€</p>}
      { friend.balance > 0 && <p className='green'>{ friend.name} schuldet dir {Math.abs(friend.balance)}€</p>}
      { friend.balance === 0 && <p>Du und { friend.name } seid quitt!</p>}
      <Button onClick={() => onSelection(friend)}>{isSelected ? 'Schliessen' : 'mit mir'}</Button>
    </li>
  )
}

export default Friend;