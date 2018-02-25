const http = require(`http`);
const url = require(`url`);
const path = require(`path`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const userInput = require(`./user-input`);
const readfile = promisify(fs.readFile);

const HOSTNAME = `127.0.0.1`;

const MIME_TYPES = {
  '.ico': `image/x-icon`,
  '.html': `text/html`,
  '.js': `text/javascript`,
  '.json': `application/json`,
  '.css': `text/css`,
  '.png': `image/png`,
  '.jpg': `image/jpeg`,
  '.wav': `audio/wav`,
  '.mp3': `audio/mpeg`,
  '.svg': `image/svg+xml`,
  '.pdf': `application/pdf`,
  '.doc': `application/msword`,
  '.eot': `appliaction/vnd.ms-fontobject`,
  '.ttf': `aplication/font-sfnt`
};

const readFile = async (filePath, res) => {
  const data = await readfile(filePath);
  const extension = path.extname(filePath);

  res.setHeader(`Content-Type`, MIME_TYPES[extension]);
  res.setHeader(`Content-Length`, Buffer.byteLength(data));
  res.end(data);
};

const reportError = (code, message, res) => {
  res.statusCode = code;
  res.statusMessage = message;
  res.setHeader(`Content-Type`, `text/plain`);
  res.end(message);
};

module.exports = {
  name: `--server`,
  description: `Starts server`,
  execute: async () => {
    const port = await userInput.getServerInfo();

    const server = http.createServer((req, res) => {
      const pathname = url.parse(req.url).pathname;
      const absolutePath = `${process.cwd()}/static${pathname === `/` ? `/index.html` : pathname}`;

      (async () => {
        try {
          await readFile(absolutePath, res);
        } catch (err) {
          reportError(404, `Not Found`, res);
        }
      })().catch((err) => {
        reportError(500, err.message, res);
      });
    });

    server.listen(port, HOSTNAME, (err) => {
      if (err) {
        return console.error(err);
      }

      return console.log(`Server is running at http://${HOSTNAME}:${port}/`);
    });
  }
};
