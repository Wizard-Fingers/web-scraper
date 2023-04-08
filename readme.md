**How to run this project**

1. Clone this repo
2. run `npm install`
3. run `npm start`
4. open your browser and go to http://localhost:8000/results to see the results
5. run your html file in your browser to see the results that are displayed on the page and match the results you saw on http://localhost:8000/results.

**How I made the Web Scraper**

1. In your terminal type:
   `npm init`

2. Fill out the prompts

3. install express
   `npm install express`

4. install cheerio
   `npm install cheerio`

5. install Axios
   `npm install axios`

6. I then added a script to my package.json file
   `"start": "nodemon index.js"` This listens for changes in my index.js file and restarts the server. I personally use nodemon, but you can use node if you want.

7. Create a file called index.js and add the following code:

```
const PORT = 8000;

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
```

run `npm start` in your terminal and you should see the message "Server running on port 8000"

N.B - I am using nodemon, if you are using node, you will need to restart the server every time you make a change to your index.js file. If your using nodemon, I had to install `npm install cors` to get it to work.

8. I added a website from the Guardian newspaper to scrape. I then added a route to my index.js file

```
const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const url = "https://www.theguardian.com/uk";

app.get("/", function (req, res) {
  res.json("This is my webscraper");
});

app.get("/results", (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(".fc-item__title", html).each(function () {
        //<-- cannot be a function expression
        const title = $(this).text();
        const url = $(this).find("a").attr("href");
        articles.push({
          title,
          url,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

```

9. In your terminal type `npm start` and go to http://localhost:8000/results in your browser. You should see an array of articles from the Guardian newspaper.

**This is a very basic example of a web scraper. But what if you want to use it in the Frontend?**

10. This is how You show text when you go to http://localhost:8000/results in your browser.

```
const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const urls = ["https://www.theguardian.com/uk"];

// app.METHOD(PATH, HANDLER)

app.get('/', function (req, res) {
    res.json( 'This is my Web Scraper Project' );
  });




// app.get() // get data from server
// app.post() // post data to server
// app.put() // update data on server
// app.delete() // delete data from server



  axios(urls)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(".fc-item__title", html).each(function () {
        //<-- cannot be a function expression
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

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

```

**But what is you wanted to show data at a different endpoint?**

well for that you would need to add another route to your index.js file.

```
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
```

from here create a new file called index.html and add the following code:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Getting Data from Backend to Frontend</title>
    <link rel="stylesheet" href="src/styles.css" />
  </head>
  <body>

    <div id="feed"></div>

    <script src="src/app.js"></script>
  </body>
</html>
```

create a new folder called src and add a file called app.js and add the following code:

```
const feedDisplay = document.querySelector("#feed");

fetch("http://localhost:8000/results")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((article) => {
      const articalItem =
        `<div> <h2>` +
        article.title +
        `</h2> <p> ` +
        article.urls +
        ` </p> </div>`;
      feedDisplay.insertAdjacentHTML("beforeend", articalItem);
    });
  })
  .catch((err) => console.log(err));
```

Now load your backend server and frontend server and you should be getting the data from your backend server and displaying it on your frontend server.

I also made a styles.css file and left that for you to style your page.
