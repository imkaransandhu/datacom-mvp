/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./page.module.css";
import useSWR from "swr";
import WallMenu from "@/components/Shared/WallHeader/WallHeader";
import CaptureSession from "@/components/Shared/CaptureSession/CaptureSession";
import Image from "next/image";
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import io from "socket.io-client";
import ImageView from "@/components/Shared/ImageView/ImageView";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const [isListView, setIsListView] = useState(true);
  const [imgSrc, setImgSrc] = useState(null);
  const [socket, setSocket] = useState();
  const [data, setData] = useState();

  const router = useRouter();

  async function fetchData() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/api/gallery3/route",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        const sortedData = sortByLastModified(response.data);
        setData(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function sortByLastModified(arr) {
    arr.sort(function (a, b) {
      return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
    });
    return arr;
  }

  useEffect(() => {
    fetchData();
    socketInitializer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (router.query.blobName) {
      setImgSrc(
        `https://interactivewallgallery.blob.core.windows.net/gallery/${router.query.blobName}`
      );
    }
  }, [router]);

  const loadImageView = (e) => {
    const imageSource = e.target.getAttribute("src");
    setImgSrc(imageSource);
  };

  const handleImageViewCrossBtn = () => {
    setImgSrc(null);
  };

  const socketInitializer = async () => {
    await fetch("/api/screenshot");
    const newSocket = io();

    newSocket.on("connect", () => {
      console.log("connected");
    });

    // newSocket.on("loadLastImage", (blobName) => {
    //   console.log("Display Last image on mobile screen");
    //   setImgSrc(
    //     `https://interactivewallgallery.blob.core.windows.net/gallery/${blobName}`
    //   );
    // });

    setSocket(newSocket);
  };

  // if (error)
  //   return (
  //     <div
  //       style={{
  //         backgroundColor: "black",
  //         height: "100vh",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <h1>Failed to load</h1>
  //     </div>
  //   );
  // if (isLoading)
  //   return (
  //     <div
  //       style={{
  //         backgroundColor: "black",
  //         height: "100vh",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  return (
    <div>
      <CaptureSession />
      <WallMenu />
      <main className={styles["gallery-outer-container"]}>
        <h1>Gallery</h1>
        <div className={styles["gallery-options"]}>
          <Image
            src={
              isListView
                ? "/images/ListViewIcon.svg"
                : "/images/GridViewIcon.svg"
            }
            alt="grid view"
            width={21}
            height={21}
            onClick={() => {
              setIsListView(!isListView);
            }}
          ></Image>

          <select
            name="selection-filter"
            id="selection-filter"
            className={styles["selection-menu"]}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </main>
      {data && (
        <GalleryGrid
          data={data}
          isListView={isListView}
          loadImageView={loadImageView}
        />
      )}
      <div className={styles.button}>
        <Link href={"/capture"} className={styles.link}>
          <Image
            src={"/images/capture-icon.svg"}
            alt="grid view"
            width={64}
            height={64}
            onClick={() => {
              setIsListView(!isListView);
            }}
            className={styles["capture-icon"]}
          ></Image>
        </Link>
      </div>
      {imgSrc && (
        <ImageView
          imgSrc={imgSrc}
          handleImageViewCrossBtn={handleImageViewCrossBtn}
        />
      )}
    </div>
  );
}
