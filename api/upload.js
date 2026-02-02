export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let body = "";

    for await (const chunk of req) {
      body += chunk.toString();
    }

    if (!body) {
      return res.status(400).json({ error: "No data received" });
    }

    return res.status(200).json({
      success: true,
      message: "Upload received successfully",
      data: body,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Upload failed",
      details: err.message,
    });
  }
}
