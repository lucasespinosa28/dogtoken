import express from "express";
import cors from "cors";
const app = express();
// Define the port number on which the server will listen
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URL = "http://js-cli-wrapper.lilypad.tech";

app.get("/newimage", async (req, res) => {
  console.log("newimage")
  const body = JSON.stringify({
    pk: process.env.WEB3_PRIVATE_KEY,
    module: "github.com/lucasespinosa28/lilypad-module-custom-pipeline:v0.0.3",
    inputs: "",
  });
  const response = await fetch(URL, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body,
  }).then((res) => res.json());
  console.log(response)
  res.send(`https://ipfs.io/ipfs/${response.cid}/outputs/output_00001_.png`);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
