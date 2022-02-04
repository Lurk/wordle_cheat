import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

// export default function word(req: NextApiRequest, res: NextApiResponse<string>) {
//   if (req.method === "POST") {
//     // const raw = await fetch("http://78.47.186.254/api/word", {
//     //   method: "POST",
//     //   headers: {
//     //     Accept: "application/json",
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(req.body),
//     // });
//     res.status(200).send("aeros");
//   } else {
//     res.status(400).send("");
//   }
// };

export default async function handler(req, res) {
  try {
    const raw = await fetch("http://78.47.186.254/api/word", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    res.status(200).send(await raw.text());
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
