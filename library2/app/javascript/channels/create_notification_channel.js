import consumer from "./consumer"
import Books from "../components/Books";
import React from "react";

consumer.subscriptions.create("CreateNotificationChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    window.alert(data.message);
  }
});
