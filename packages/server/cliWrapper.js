// Dotenv will allow us to access our environment variables so we can access our private key.
require('dotenv').config({ path: __dirname + './.env' });
const util = require("util")
// This will allow us to run code in our CLI.
const { execSync, exec, child } = require('child_process');
const { spawn } = require('node:child_process');
// The function we will call on the front end, to run a lilypad job.
async function runCliCommand(userInput, callback) {
  console.log("Lilypad Starting...");
  // Ensure the WEB3_PRIVATE_KEY environment variable is set
  // const web3PrivateKey = process.env.WEB3_PRIVATE_KEY;
  // // If the private key was not set up properly, we should expect to see this error.
  // if (!web3PrivateKey) {
  //   console.error('WEB3_PRIVATE_KEY is not set in the environment variables.');
  //   return;
  // }

  // This command will first export our private key, and then run the Lilypad SDXL module with the prompt provided by the user.
  const command = `export WEB3_PRIVATE_KEY= && lilypad run github.com/lucasespinosa28/lilypad-module-custom-pipeline:v0.0.3`;
  // This is a callback function to handle any errors when calling runCliCommand function.
  // execSync(command, async (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error: ${error.message}`);
  //     return callback(error);
  //   }
  //   if (stderr) {
  //     console.error(`Stderr: ${stderr}`);
  //     return callback(stderr);
  //   }

  //   When Lilypad runs successfully, it returns the relative path to the files it generated, and the IPFS url. Here we are grabbing the relative path in local storage to serve the image to our front end.
  //   const lines = stdout.trim().split('\n');
  //   const path = lines[lines.length - 4].trim(); // Trim any extra whitespace
  //   filePath = path.replace("open ", "") + "/outputs/output_00001_.png";

  //   This console log will confirm that Lilypad ran successfully.
  //   console.log(stdout)

  //   This will return our output to the front end.
  //   if (callback) {
  //     callback(null, filePath);
  //   }
  // });
  const call = spawn(command, { shell: true });
  let result;
  call.stdout.on('data', (data) => {
    console.count();
    console.log(data.toString());
    result = data.toString();
  });
  call.on('exit', (code) => {
    const lines = result.trim().split("\n");
    // console.log({lines});
    const path = lines[lines.length - 4].trim(); // Trim any extra whitespace
    // console.log({path});
    filePath = path.replace("open ", "") + "/outputs/output_00001_.png";
    // console.log({filePath})
    if (callback) {
      callback(null, filePath);
    }
    console.countReset();
  });
}

module.exports = { runCliCommand };