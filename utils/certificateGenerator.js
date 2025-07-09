const PDFDocument = require("pdfkit");
const fs = require("fs");

async function generateCertificate(studentName, courseName) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", layout: "landscape" });
    
    // Certificate design
    doc.image("./assets/certificate-bg.jpg", 0, 0, { width: 842, height: 595 });
    
    doc.fontSize(40).text("Certificate of Completion", { align: "center" });
    doc.moveDown();
    doc.fontSize(25).text(`This is to certify that`, { align: "center" });
    doc.moveDown();
    doc.fontSize(40).text(studentName, { align: "center" });
    doc.moveDown();
    doc.fontSize(25).text(`has successfully completed the course`, { align: "center" });
    doc.moveDown();
    doc.fontSize(30).text(courseName, { align: "center" });
    doc.moveDown();
    doc.fontSize(20).text(`Issued on: ${new Date().toLocaleDateString()}`, { align: "center" });
    
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.end();
  });
}

module.exports = {
  generateCertificate,
};