// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

import { Server } from "socket.io";
const SocketHandler = (req, res) => {
  //console.log(req);
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      // Listen for button clicks from Screen 1

      socket.on("uploaded-blob", (blobName) => {
        socket.broadcast.emit("routeToGallery", blobName);
        console.log("routeoGallery");
        // setTimeout(() => {
        //   console.log("Load Image On Top");
        //   socket.broadcast.emit("loadLastImage", blobName);
        // }, 2000);
      });

      // Listen for button clicks from Screen 2
      socket.on("send-blob", () => {
        // Emit a 'screen1-click' event to Screen 1
        setTimeout(() => {
          socket.broadcast.emit("receive-blob");
        }, 3000);
      });
    });
  }
  res.end();
};

export default SocketHandler;
