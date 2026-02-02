import fetch from "node-fetch";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    const contentType = req.headers["content-type"];
    const boundary = contentType.split("boundary=")[1];
    const parts = buffer.toString("binary").split(boundary);

    const filePart = parts.find(p => p.includes("filename="));
    if (!filePart) {
      return res.status(400).send("No file received");
    }

    const filename = filePart.match(/filename="(.+?)"/)[1];
    const fileBinary = filePart.split("\r\n\r\n")[1].slice(0, -2);

    const formData = new FormData();
    formData.append("chat_id", process.env.CHAT_ID);
    formData.append(
      "document",
      Buffer.from(fileBinary, "binary"),
      filename
    );

    await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendDocument`,
      {
        method: "POST",
        body: formData,
      }
    );

    res.status(200).send("Sent with care 💖");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong 😢");
  }
}
