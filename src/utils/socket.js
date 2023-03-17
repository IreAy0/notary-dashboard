import { io } from "socket.io-client";
// let url = "http://localhost:5000";
const url = "https://tonote-realtime-notifications.onrender.com";
// let url =
// process.env.NODE_ENV == "development"
//   ? process.env.VUE_APP_EVENTS_URL_LOCAL
//   : process.env.VUE_APP_EVENTS_URL_STAGING ||
//     process.env.VUE_APP_EVENTS_URL_LIVE;
const socket = io(url, {
  transports: ["websocket", "polling"],
  autoConnect: false
});
// socket.on("setID", async () => {
//   console.log(socket.id);
//   const user = JSON.parse(localStorage.getItem("user"));
//   !user
//     ? null
//     : ((user.websocketID = socket.id),
//       socket.emit("updateID", { email: user.email }),
//       localStorage.setItem("user", JSON.stringify(user)));
// });
// socket.onAny((event, ...args) => {
//   console.log("file:event-bus.js " + "event: " + event, args);
// });
export default socket;
