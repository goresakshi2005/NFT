const QRCode = require("qrcode");
const fs = require("fs");

async function generateQRCode(data) {
  try {
    const qrCodePath = `./qrcodes/${Date.now()}.png`;
    await QRCode.toFile(qrCodePath, data);
    return qrCodePath;
  } catch (err) {
    console.error("Error generating QR code:", err);
    throw err;
  }
}

module.exports = {
  generateQRCode,
};