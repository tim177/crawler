const { spawn } = require("child_process");
const path = require("path");

const runPythonScript = (command, args = []) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(__dirname, "scrapper.py");

    console.log(
      `Executing Python script: ${scriptPath} with command: ${command} and args: ${JSON.stringify(
        args
      )}`
    );

    // Check if Python 3 is available, fallback to "python"
    const pythonCmd = process.platform === "win32" ? "python" : "python3";
    const pythonProcess = spawn(pythonCmd, [scriptPath, command, ...args]);

    let scriptOutput = "";
    let scriptError = "";

    pythonProcess.stdout.on("data", (data) => {
      console.log(`Python stdout: ${data}`);
      scriptOutput += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python stderr: ${data}`);
      scriptError += data.toString();
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
      if (code === 0) {
        try {
          const parsedData = JSON.parse(scriptOutput.trim());
          resolve(parsedData);
        } catch (error) {
          console.error(`Error parsing JSON: ${error.message}`);
          reject({
            status: "error",
            message: "Failed to parse Python output",
            error: error.message,
            output: scriptOutput.trim(),
          });
        }
      } else {
        reject({
          status: "error",
          message: "Python script execution failed",
          error: scriptError.trim(),
        });
      }
    });
  });
};

// Wrapper functions for different operations
const queryAndRespond = (query) => runPythonScript("query", [query]);
const crawlUrls = (homepage, maxPages) =>
  runPythonScript("crawl", [homepage, maxPages.toString()]);
const scrapeUrls = (urls) => runPythonScript("scrape", [JSON.stringify(urls)]);
const storeData = (data) => runPythonScript("store", [JSON.stringify(data)]);

module.exports = { queryAndRespond, crawlUrls, scrapeUrls, storeData };
