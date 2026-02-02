const fileInput = document.getElementById("fileInput");
const fileInfo = document.getElementById("fileInfo");
const statusText = document.getElementById("status");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const sizeKB = (file.size / 1024).toFixed(1);
  fileInfo.innerHTML = `📎 <b>${file.name}</b><br>(${sizeKB} KB)`;
  fileInfo.classList.remove("hidden");

  statusText.innerText = "Ready to send 💗";
});

async function uploadFile() {
  const file = fileInput.files[0];

  if (!file) {
    statusText.innerText = "Please choose a file first 🥺";
    return;
  }

  statusText.innerText = "Sending with care… 💞";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (res.ok) {
      statusText.innerText = "Sent safely 💖";
    } else {
      statusText.innerText = "Something went wrong 😢";
    }
  } catch (err) {
    statusText.innerText = "Network error 💔";
  }
}
