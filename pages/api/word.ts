import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | { error: string }>
) {
  try {
    req.body.times.push({step: "got request at vercel", time: Date.now()});
    const raw = await fetch("http://127.0.0.1:8080/api/word", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await raw.json();
    data.times.push({step: "got response from api", time: Date.now()})
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
