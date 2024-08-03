const fetch = require("node-fetch");

exports.getDeviceToken = async (id) => {
  const url = `${process.env.SERVICE_AUTHENTICATION}/api/v1/auth/interservice/getdevicetoken/${id}`;
  //  const url = `http://localhost:8002/api/v1/auth/interservice/getdevicetoken/${id}`;
  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const response = await rawResponse.json();
    if (response.success) {
        return response.deviceTokenArray
    }
    else{
        return response
    }
  } catch (error) {
      console.log("error", error);
      return error
  }
};

exports.getUsers = async (number) => {
  const url = `${process.env.SERVICE_AUTHENTICATION}/api/v1/auth/interservice/getusers/${number}`;
  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const response = await rawResponse.json();
    if (response.success) {
       console.log(response);
       return response.users
    }
    else{
        return response
    }
  } catch (error) {
      console.log("error", error);
      return error
  }
};
