import React, { useContext, useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const Room = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  console.log(baseUrl);
  const { roomId } = useParams();
  const containerRef = useRef(null);
  let zc = useRef(null);

  useEffect(() => {
    const myMeetings = async () => {
      const appID = 683718057;
      const serverSecret = "8e17340705c7f9cd8b56e8f2aaac628c";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        currentUser.uid,
        currentUser.displayName
      );

      if (zc.current === null) {
        zc.current = ZegoUIKitPrebuilt.create(kitToken);
      }

      zc.current.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
      });
    };

    myMeetings();

    return () => {
      if (zc.current) {
        zc.current.destroy();
        zc.current = null;
      }
    };
  }, [roomId, currentUser.displayName, currentUser.uid]);

  return <div ref={containerRef} />;
};

export default Room;
