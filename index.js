const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const url =
  process.env.NODE_ENV === "DEV"
    ? "http://localhost:8080/"
    : `file://${__dirname}/dist/index.html`;

app.on("ready", () => {
  let window = new BrowserWindow({ width: 800, height: 600 });
  window.loadURL(url);
  //window.webContents.openDevTools();
});

app.on("window-all-closed", () => {
  app.quit();
});
