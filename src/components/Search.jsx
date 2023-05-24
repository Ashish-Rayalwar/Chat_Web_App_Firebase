import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          // onKeyDown={handleKey}
          // onChange={(e) => setUsername(e.target.value)}
          // value={username}
        />
      </div>

      <div className="userChat">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/robert-pattinson-as-batman-bruce-wayne-in-the-batman-1645186686.jpeg?crop=0.505xw:0.757xh;0.385xw,0.0144xh&resize=1200:*"
          alt=""
        />
        <div className="userChatInfo">
          <span>Ashish</span>
          <p>jksjc</p>
        </div>
      </div>
    </div>
  );
};

export default Search;
