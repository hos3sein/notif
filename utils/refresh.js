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




exports.newLog=async (body) => {
  console.log("here");
    const url = `${process.env.SERVICE_SETTING}/api/v1/setting/log/putlog`;
    try {
      const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "*",
          "Content-Type": "application/json",
        },
        body:JSON.stringify(body)
      });
      const response = await rawResponse.json();
      console.log(response);
      if (response.success) {
        console.log("nice");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  