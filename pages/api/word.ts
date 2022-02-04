import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async (req: NextApiRequest, res: NextApiResponse<string>) => {
  if (req.method === "POST") {
    const raw = await fetch("http://78.47.186.254/api/word", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    res.status(200).send(await raw.text());
  } else {
    res.status(400).send("");
  }
};
