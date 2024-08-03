const fetch = require("node-fetch");

exports.pushy = async (deviceToken) => {
  const url = `https://api.pushy.me/push?api_key=${process.env.PUSHY_API_KEY}`;
  
  const notif = {
    to: `${deviceToken}`,
    data: {
      message: `hi`,
      navigate: `nothu=ing`,
      title: `salam`,
    },
    notification: {
      title: `hi`,
      body: `hi`,
      sound: "ping.aiff",
    },
  };
  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notif),
    });
    const response = await rawResponse.json();
    console.log("response",response);
    if (response.success) {
      console.log("response",response);
      console.log("success send to ", deviceToken);
    } else {
      console.log("error to send to ", deviceToken);
    }
  } catch (error) {
    console.log("error", error);
  } // Log success
};
