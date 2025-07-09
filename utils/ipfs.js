const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
require("dotenv").config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

async function uploadToIPFS(fileBuffer) {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  
  let data = new FormData();
  data.append("file", fileBuffer, "certificate.pdf");
  
  const response = await axios.post(url, data, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
  });
  
  return response.data.IpfsHash;
}

async function getFromIPFS(ipfsHash) {
  const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return response.data;
}

module.exports = {
  uploadToIPFS,
  getFromIPFS,
};