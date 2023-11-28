import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import TweetInput from "./TweetInput";

export default function PostFeed() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTweets(snapshot.docs);
    });

    return unsubscribe;
  }, []);
  // dark:border-gray-700 border-gray-100 border-x dark:border-x

  return (
    <div
      className="sm:ml-16 xl:ml-[350px] max-w-2xl flex-grow
     dark:border-gray-700 border-gray-200 border-x dark:border-x"
    >
      <div
        className="px-3 py-2 text-lg sm:text-xl font-bold
       backdrop-blur-sm  border-b dark:border-b dark:border-gray-700 text-black dark:text-white sticky top-0 z-50"
      >
        Home
      </div>

      <TweetInput />
      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} id={tweet.id} data={tweet.data()} />;
      })} 
      <Tweet />
    </div>
  );
}
