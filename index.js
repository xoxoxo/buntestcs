const express = require("express");
const app = express();
const requireBundle = require(`./build/main.server.js`);

app.use(express.static("build"));
app.get("/", (req, res, next) => {
  try {

    const render = requireBundle.App.default();

    return res.status(200).send(`
      ${render.styleTags}
      ${render.html}
    `);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

app.listen(3000, () => {
  console.log("lets go");
});
