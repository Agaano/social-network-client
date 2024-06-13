"use client";
import { RootState } from "@/lib/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

enum friendshipStatus {
  friend,
  application,
  none,
  null,
}

export default ({ id }: { id: number }) => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [isFriend, setIsFriend] = useState(friendshipStatus.null);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleAddFriend = async () => {
    if (user?.id === id) return;
    const response = await axios.post(serverUrl + "/friends", {
      userId: user?.id,
      friendId: id,
    });
    if (!response.data.type) return;
    if (response.data.type === "Application") {
      setIsFriend(friendshipStatus.application);
    } else {
      setIsFriend(friendshipStatus.friend);
    }
  };

  useEffect(() => {
    const checkIsFriend = async () => {
      if (!user || !id) return;
      if (user.id === id) return;
      const response = await axios.get(
        serverUrl + "/friends/" + user.id + "/" + id
      );
      if (!response.data) {
        setIsFriend(friendshipStatus.none);
      } else if (response.data === "Application") {
        setIsFriend(friendshipStatus.application);
      } else setIsFriend(friendshipStatus.friend);
    };
    checkIsFriend();
  }, [user]);

  if (isFriend === friendshipStatus.null || user?.id === id) return <div></div>;
  if (isFriend === friendshipStatus.none)
    return <button onClick={handleAddFriend}>Добавить в друзья</button>;
  {
    (" ");
  }
  if (isFriend === friendshipStatus.application)
    return <p>Заявка в друзья отправлена</p>;
  return <div></div>;
};
