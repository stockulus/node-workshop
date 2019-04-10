const Shell = require("node-powershell");

const ps = new Shell({
  executionPolicy: "Bypass",
  noProfile: true
});

ps.addCommand("Get-ChildItem | convertto-json");
ps.invoke()
  .then(output => {
    const parsed = JSON.parse(output);
    const string = JSON.stringify(parsed);
    // const files = output.split("\n");
    console.log(parsed, string);
  })
  .catch(err => {
    console.log(err);
  });
