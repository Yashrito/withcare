import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send("Upload failed 😢");

    const file = files.file;

    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const data = new FormData();
    data.append(
      "document",
      fs.createReadStream(file.filepath),
      file.originalFilename
    );
    data.append("chat_id", chatId);

    await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
      method: "POST",
      body: data,
    });

    res.send("Sent successfully 💖");
  });
}
