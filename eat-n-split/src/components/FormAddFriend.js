import {useState} from "react";
import Button from "./Button";

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState("https://i.pravatar.cc/48");

  const handleFormData = (e) => {
    e.preventDefault();

    if (!name || !url) return null;

    const id = crypto.randomUUID()
    const newFriend = {
      id: id,
      name: name,
      image: `${url}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);
    console.log(newFriend)
    setName("");
    setUrl("https://i.pravatar.cc/48");
  }

  return (
    <>
      <form className="form-add-friend" onSubmit={ handleFormData }>
        <label>👺 Des neuen Freundes Name:</label><br/>
        <input type="text"
               value={name}
               onChange={(e) => setName(e.target.value)} /><br/>
        <label>📸 Bild-URL</label><br/>
        <input type="text"
               value={url}
               onChange={(e) => setUrl(e.target.value)} />
        <Button>speichern</Button>
      </form>
    </>
  )
}


export default FormAddFriend;