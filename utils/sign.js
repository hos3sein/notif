const AWS = require("aws-sdk");
const fs = require("fs");

exports.signF = async (urlI) => {
  const accessKeyID = "AKIAYH3PEXAIQN22EVOX";
  const privateKeyFilePath = "./private_key.pem";
  const privateKeyContents = await fs.readFileSync(privateKeyFilePath, "utf8");
  const cfDomainName = `https://d11826ku8gptgq.cloudfront.net`;
  const s3ContentPath = urlI;
  const cfFullPath = await `${cfDomainName}/${s3ContentPath}`;
  let signer = new AWS.CloudFront.Signer(accessKeyID, privateKeyContents);
  const option = {
    url: cfFullPath,
    expires: Math.floor(new Date().getTime()) + 60 * 60 * 1, // 1 hour from now
  };
  const fplan = await signer.getSignedUrl(option);
  return fplan;
};
