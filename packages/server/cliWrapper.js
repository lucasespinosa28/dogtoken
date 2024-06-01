// Dotenv will allow us to access our environment variables so we can access our private key.
require("dotenv").config({ path: __dirname + "/../../../.env" });
// This will allow us to run code in our CLI.
const { spawnSync, spawn } = require("node:child_process");
// The function we will call on the front end, to run a lilypad job.
async function runCliCommand(callback) {
  console.log("Lilypad Starting...");
  // Ensure the WEB3_PRIVATE_KEY environment variable is set
  //const command =
  // When Lilypad runs successfully, it returns the relative path to the files it generated, and the IPFS url. Here we are grabbing the relative path in local storage to serve the image to our front end.

  // This console log will confirm that Lilypad ran successfully.

  const  ls = await spawn(
    "lilypad run github.com/lucasespinosa28/lilypad-module-custom-pipeline:v0.0.3",
    [],{shell:true}
  )

  let result;
  ls.stdout.on("data", (data) => {
    result += `${data}`;
    console.log( `${data}`);
  });

  ls.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on("exit", (code) => {
    const lines = result.trim().split("\n");
    const path = lines[lines.length - 4].trim(); // Trim any extra whitespace
    filePath = path.replace("open ", "") + "/outputs/output_00001_.png";
  
  });

  // This will return our output to the front end.
  if (callback) {
    callback(null, filePath);
  }
  // This is a callback function to handle any errors when calling runCliCommand function.
  // execSync(command, {shell:true, stdio: 'inherit' },async (error, stdout, stderr) => {
  //     if (error) {
  //         console.error(`Error: ${error.message}`);
  //         return callback(error);
  //     }
  //     if (stderr) {
  //         console.error(`Stderr: ${stderr}`);
  //         return callback(stderr);
  //     }

  // });
}

module.exports = { runCliCommand };
