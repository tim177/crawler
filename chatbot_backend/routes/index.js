const express = require("express");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const runPythonScript = (command, args, inputData = null) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(__dirname, "../scrapper.py");
    console.log(
      `Executing Python script: ${scriptPath} with command: ${command} and args: ${args}`
    );

    const options = {
      env: { ...process.env, GROQ_API_KEY: process.env.GROQ_API_KEY },
    };

    const pythonProcess = spawn(
      path.resolve(__dirname, "../venv/Scripts/python"), // Full path to virtual env
      [scriptPath, command, ...args],
      options
    );

    let scriptOutput = "";
    let scriptError = "";

    if (inputData) {
      pythonProcess.stdin.write(inputData);
      pythonProcess.stdin.end();
    }

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
          const parsedData = JSON.parse(scriptOutput);
          resolve(parsedData);
        } catch (error) {
          console.error(`Error parsing JSON: ${error.message}`);
          reject(new Error(`Error parsing JSON: ${error.message}`));
        }
      } else {
        reject(new Error(`Python process error: ${scriptError}`));
      }
    });
  });
};

router.get("/", function (req, res, next) {
  res.status(200).json({ result: "suxesses" });
  // res.render("index");
});

//CRAWL DATA WILL BE GETTING HEREcrawl
router.post("/crawl", async (req, res, next) => {
  try {
    const { url, maxPages } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const pages = maxPages ? maxPages.toString() : "100";

    // Step 1: Run Crawler and Get Links
    const links = await runPythonScript("crawl", [url, pages]);

    // Step 2: Store links in JSON file
    const linksFilePath = path.join(__dirname, "../data/links.json");
    fs.writeFileSync(linksFilePath, JSON.stringify(links, null, 2));

    // Step 3: Run Scraper on Stored Links
    const scrapedData = await runPythonScript("scrape", [linksFilePath]);

    // Step 4: Store scraped data in another JSON file
    const scrapedDataFilePath = path.join(
      __dirname,
      "../data/scraped_data.json"
    );
    fs.writeFileSync(scrapedDataFilePath, JSON.stringify(scrapedData, null, 2));

    // Step 5: Pass Scraped Data to ChromaDB Processor
    const processingResult = await runPythonScript("store", [
      scrapedDataFilePath,
    ]);

    const result = await runPythonScript("view", []);
    console.log(result);

    res.json({ success: true, stored: processingResult });
  } catch (err) {
    console.log("error in crawl💣", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/demo", function (req, res, next) {
  res.render("input_form");
});

router.get("/chatbot", function (req, res) {
  res.sendFile(__dirname + "/public/chatbot.html"); // Serve HTML directly
});

router.post("/query", async function (req, res, next) {
  try {
    console.log("requrest body is 😴😴", req.body);
    const userQuery = req.body.query;
    console.log(`Received query: ${userQuery}`);
    const result = await runPythonScript("query", [userQuery]);
    console.log(`Response from Python script: ${JSON.stringify(result)}`);
    res.send(result);
  } catch (error) {
    console.error(`Error processing query: ${error}`);
    res
      .status(500)
      .send({ response: `Error processing query: ${error.message}` });
  }
});

router.get("/status", function (req, res, next) {
  res.send({ status: "active" });
});

router.post("/update", async function (req, res, next) {
  try {
    const { websiteUrl, maxPages, email } = req.body;
    if (!websiteUrl || !maxPages || !email) {
      throw new Error("Website URL, Max Pages, and Email are required");
    }
    console.log(
      `Updating knowledge base with website URL: ${websiteUrl}, max pages: ${maxPages}, and email: ${email}`
    );

    const crawledUrls = await runPythonScript("crawl", [
      websiteUrl,
      maxPages.toString(),
    ]);
    const tempFilePath = path.resolve(__dirname, "temp_urls.json");
    fs.writeFileSync(tempFilePath, JSON.stringify(crawledUrls));

    const fileData = fs.readFileSync(tempFilePath, "utf8");

    const scrapedData = await runPythonScript("scrape", [], fileData);
    await runPythonScript("store", [], JSON.stringify(scrapedData));
    fs.unlinkSync(tempFilePath);

    console.log("Knowledge base updated successfully.");
    res
      .status(200)
      .json({ status: "Knowledge base updated", data: scrapedData });
  } catch (error) {
    console.error(`Error updating knowledge base: ${error.message}`);
    res.status(500).json({ status: "Error", message: error.message });
  }
});

module.exports = router;
