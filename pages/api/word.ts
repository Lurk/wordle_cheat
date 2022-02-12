import { NextApiRequest, NextApiResponse } from "next";
import { send } from "../../helpers/ws";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | { error: string }>
) {
  try {
    res.status(200).send(await send(req.body));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
