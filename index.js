const express = require("express");
const { Octokit } = require("@octokit/rest");
const app = express();
const port = 1338;

app.all("/:token/:owner/:repo/:event_type", (req, res) => {
  console.log(req.params);
  const { token, owner, repo, event_type } = req.params;
  if (token && owner && repo && event_type) {
    const octokit = new Octokit({
      auth: token,
    });
    octokit
      .request("POST /repos/{owner}/{repo}/dispatches", {
        owner,
        repo,
        event_type,
      })
      .then((_) => {
        res.send(`repo actions is rebuild`);
      })
      .catch((err) => {
        res.send(`failed: ${err}`);
      });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
