// Dotenv will allow us to access our environment variables so we can access our private key.
require('dotenv').config({ path: __dirname + '/../../../.env' });
// This will allow us to run code in our CLI.
const { execSync } = require('child_process');

// The function we will call on the front end, to run a lilypad job.
function runCliCommand(callback) {
    console.log("Lilypad Starting...");
    // Ensure the WEB3_PRIVATE_KEY environment variable is set
    const command = `export WEB3_PRIVATE_KEY= && lilypad run github.com/lucasespinosa28/lilypad-module-custom-pipeline:v0.0.3`;


    // This is a callback function to handle any errors when calling runCliCommand function.
    execSync(command, {shell:true, stdio: 'inherit' },async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return callback(error);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return callback(stderr);
        }

        // When Lilypad runs successfully, it returns the relative path to the files it generated, and the IPFS url. Here we are grabbing the relative path in local storage to serve the image to our front end.
        const lines = stdout.trim().split("\n");
        const path = lines[lines.length - 4].trim(); // Trim any extra whitespace
        filePath = path.replace("open ", "") + "/outputs/output_00001_.png";

        // This console log will confirm that Lilypad ran successfully.
        console.log(stdout)

        // This will return our output to the front end.
        if (callback) {
            callback(null, filePath);
        }
    });
}

module.exports = { runCliCommand };