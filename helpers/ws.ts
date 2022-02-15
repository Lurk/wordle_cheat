// import WebSocket from "ws";
import {v4 as uuidv4} from "uuid";
import { Rules } from "./word";

interface Message {
  id: string;
  word: string;
}


let connected = false;
let lastQuery: false | Rules = false;
const resolvers: Map<string, (w: string) => void> = new Map();
const rejectors: Map<string, (w: string) => void> = new Map();
let ws: WebSocket | false;

function reject(id: string, reason: string){
  const rejector = rejectors.get(id);
  if (rejector){
    rejector(reason);
    rejectors.delete(id);
  }
  resolvers.delete(id);
}

function resolve(id: string, value: string){
  const resolver = resolvers.get(id);
  if (resolver){
    resolver(value);
    resolvers.delete(id);
  }
  rejectors.delete(id);
}

function rejectAll(reason: string){
  for(let key in resolvers.keys()){
    reject(key,reason);
  }
}

function connect(){
  ws = new WebSocket("ws://78.47.186.254/api/ws");
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
      resolve(message.id, message.word);
    }
  });
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



export function send(rules: Rules): Promise<string> {
    const message = { id: uuidv4(), rules };
    if (ws && (ws.readyState !== ws.CLOSED || ws.readyState !==ws.CLOSING)) {
      ws.send(JSON.stringify(message));
    } else {
      rejectAll('new query before connection')
      lastQuery = rules;
      connect();
    }
    return new Promise((resolver, rejector) => {
      resolvers.set(message.id, resolver);
      rejectors.set(message.id, rejector);
    });
}
