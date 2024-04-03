import Head from "next/head";
import { Inter } from "@next/font/google";
import SideBar from "@/components/SideBar";
import PostFeed from "@/components/PostFeed";
import Trending from "@/components/Trending";
import BottomBanner from "@/components/BottomBanner";
import { useSelector } from "react-redux";
import CommentModal from "@/components/modals/CommentModal";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import payments, { loadCheckout } from "../lib/stripe";
import { getProducts } from "@stripe/firestore-stripe-payments";
import StripeModal from "@/components/modals/StripeModal";
import React from "react";
import { RootState } from "@/redux/store";
import FeedContext from "@/context/FeedContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const username = useSelector((state: RootState) => state.user.username);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>Busy Bee</title>
      </Head>
      {isLoading && <Loading />}

      <div
        className="bg-white dark:bg-black duration-100 min-h-screen   text-[#E7E9EA] md:justify-cente max-w-[1400px] mx-auto
       flex"
      >
        <FeedContext>
          <SideBar />
          <PostFeed isLoading={isLoading} />
        </FeedContext>
        <Trending />
      </div>
      <CommentModal />
      <StripeModal />
      {!username && <BottomBanner />}
    </>
  );
}

// add a way to change mode based on system light/dark mode. (make it a pop up)
// fix image color on dark mode
