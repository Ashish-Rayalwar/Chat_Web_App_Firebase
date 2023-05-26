import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { AuthContext } from "../context/Auth";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [searchedUsers, setSearchedUsers] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext); // Assuming you have a ChatContext for managing chats

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", username),
      where("displayName", "<=", username + "\uf8ff")
    );

    try {
      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => doc.data());
      setSearchedUsers(users);
      setErr(false); // Reset the error state if users are found
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    (e.code === "Enter" || e.type === "click") && handleSearch();
  };

  const handleSelect = async (selectedUser) => {
    const combinedId =
      currentUser.uid > selectedUser.uid
        ? currentUser.uid + selectedUser.uid
        : selectedUser.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // Create a chat in the chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId]: {
            userInfo: {
              uid: selectedUser.uid,
              displayName: selectedUser.displayName,
              photoURL: selectedUser.photoURL,
            },
            date: serverTimestamp(),
          },
        });

        await updateDoc(doc(db, "userChats", selectedUser.uid), {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      }

      // Update the selected user in the chat context
      dispatch({ type: "CHANGE_USER", payload: selectedUser });
    } catch (err) {
      console.log(err);
    }

    setSearchedUsers(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Add a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label onClick={handleSearch}>
          <span className="material-symbols-outlined">search</span>
        </label>
      </div>
      {err && <span>User not found!</span>}
      {searchedUsers && (
        <>
          {searchedUsers.map((user, i) => (
            <div
              className="userChat"
              key={i}
              onClick={() => handleSelect(user)}
            >
              <img src={user.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{user.displayName}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Search;
