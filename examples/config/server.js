const eta = require("eta")
const express = require("express");
const fs = require("fs");
const path = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

const compiler = webpack(webpackConfig);

const app = express();
const port = process.env.PORT || 8080;

const examplesDir = path.join(__dirname, "..");
const examples = fs.readdirSync(examplesDir).filter(f => f.endsWith(".js"));

app.engine("eta", eta.renderFile);
eta.configure({ views: path.join(__dirname, "../views"), cache: false });
app.set("views", `${examplesDir}/views`);
app.set("view cache", false);
app.set("view engine", "eta");

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));

app.use("/css", express.static(path.join(__dirname, "../css")));
app.use("/data", express.static(path.join(__dirname, "../data")));

app.get("/", (req, res) => {
  res.render("index", { examples });
});

app.get("/:example", (req, res) => {
  res.render("example", { example: req.params.example });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
