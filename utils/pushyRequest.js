const fetch = require("node-fetch");

exports.pushyRequest = async (deviceToken,notif) => {
  const url = `https://api.pushy.me/push?api_key=${process.env.PUSHY_API_KEY}`;
  const notifiEn = {
    to: `${deviceToken}`,
    data: {
      message:`${notif.enMassage}`,
      navigate:``,
      title:`${notif.enTitle}`,
    },
    notification: {
      title:`${notif.enTitle}`,
      body:`${notif.enMassage}`,
      sound:`ping.aiff`,
    },
  };
 const body=notifiEn
  
  console.log("bbb",body);

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await rawResponse.json();
    if (response.success) {
      console.log('Push sent successfully! (ID: ' + deviceToken + ')');
    } else {
      console.log("error to send to ", deviceToken,response.code,response.error);
    }
  } catch (error) {
    console.log("error", error);
  } 
};
