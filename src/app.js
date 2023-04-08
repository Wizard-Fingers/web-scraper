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
