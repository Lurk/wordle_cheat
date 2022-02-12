import WebSocket from "ws";
import crypto from "crypto";
import { Rules } from "./word";

let connected = false;
let lastQuery: false | Rules = false;
const resolvers: Map<string, (w: string) => void> = new Map();
const ws = new WebSocket("ws://78.47.186.254/api/ws");

interface Message {
  id: string;
  word: string;
}

function isMessage(v: any): v is Message {
  return (
    typeof v === "object" &&
    !Array.isArray(v) &&
    v !== null &&
    v.hasOwnProperty("id") &&
    v.hasOwnProperty("word")
  );
}

function fromData(data: string): Message | false {
  const message = JSON.parse(data);
  return isMessage(message) ? message : false;
}

ws.onopen = function () {
  console.log("connected");
  connected = true;
  if (lastQuery) {
    send(lastQuery);
    lastQuery = false;
  }
};

ws.addEventListener("close", function () {
  console.log("disconnected");
  connected = false;
});

ws.addEventListener("error", function (event) {
  console.log("WebSocket error: ", event);
});

ws.addEventListener("message", ({ data }) => {
  const message = fromData(data.toString());
  if (message) {
    console.log(message);
    const resolver = resolvers.get(message.id);
    if (resolver) {
      resolver(message.word);
      resolvers.delete(message.id);
    }
  }
});

export function send(rules: Rules): Promise<string> {
  if (crypto.randomUUID) {
    const message = { id: crypto.randomUUID(), rules };
    if (connected) {
      ws.send(JSON.stringify(message));
    } else {
      lastQuery = rules;
    }
    return new Promise((resolve) => {
      resolvers.set(message.id, resolve);
    });
  } else {
    throw new Error("crypto without uuid");
  }
}
