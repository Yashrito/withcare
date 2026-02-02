export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const telegramUrl =
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendDocument?chat_id=${process.env.CHAT_ID}`;

    const tgRes = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "content-type": req.headers["content-type"]
      },
      body: req
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error(errText);
      throw new Error("Telegram failed");
    }

    res.status(200).json({
      message: "File delivered 💌"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Upload failed 😢"
    });
  }
}
