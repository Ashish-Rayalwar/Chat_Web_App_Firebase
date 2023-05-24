import React from "react";
import Attach from "../images/attach.png";
import Img from "../images/img.png";
const Input = () => {
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        // onChange={(e) => setText(e.target.value)}
        // value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          //   onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
