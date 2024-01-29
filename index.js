import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// Authorization
const yourBearerToken = "f3549db9-e5a3-4bdd-9d52-a5d1cb851103";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

// Get Landing Page
app.get("/", (req, res) => {
  res.render("/index.ejs", { content: "Waiting for data..." });
});


// Get Method
app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});


// Post Method
app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets", req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Put Method
app.put("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try{
    const result = await axios.put(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    res.render("/index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Patch Method
app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.patch(
      API_URL + "/secrets/" + searchId,
      req.body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

// Delete Method
app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try{
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
