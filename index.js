const express = require('express');
const app = express();


app.use(express.static("build"));
app.get("/", async (req, res, next) => {
  // await Bun.build({
  //   entrypoints: ['./app/appGeneral.tsx'],
  //   outdir: './out',
  //   target: 'node', // default
  // })
  
  try {

    // const requireBundle = await import(`./out/appGeneral.js`);
    const requireBundle = require(`./build/main.server.js`);

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
