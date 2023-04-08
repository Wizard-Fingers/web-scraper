const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const urls = ["https://www.theguardian.com/uk"];

// app.METHOD(PATH, HANDLER)

app.get("/", function (req, res) {
  res.json("This is my Web Scraper Project");
});

app.get("/results", (req, res) => {
  axios.get("https://www.theguardian.com/uk")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(".fc-item__title", html).each(function () {
        const title = $(this).text();
        const urls = $(this).find("a").attr("href");
        articles.push({
          title,
          urls,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

// app.get() // get data from server
// app.post() // post data to server
// app.put() // update data on server
// app.delete() // delete data from server

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
