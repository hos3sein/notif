const fetch = require("node-fetch");

exports.refresh = async (id, type) => {
  const url = `${process.env.SERVICE_REFRESH}/api/v1/refresh/callalone/${id}/${type}`;
  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const response = await rawResponse.json();
    console.log("response refresh notif", response);
  } catch (error) {
    console.log("error", error);
  }
};


exports.refreshNotif = async () => {
  const url = `${process.env.SERVICE_REFRESH}/api/v1/refresh/refreshnotif`;
  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const response = await rawResponse.json();
    console.log("response refresh notif", response);
  } catch (error) {
    console.log("error", error);
  }
};
