// This would be run in Remix's JavaScript VM or injected web3 environment
async function issueCertificate() {
  // Get the deployed contract instance
  const contractAddress = "0x7ED3De5fa7235Efe7dA1355023f3055d476B5c80"; // Paste your deployed contract address here
  const contractABI = [/* Paste the ABI from Remix here */];
  
  const certificateNFT = new web3.eth.Contract(contractABI, contractAddress);
  
  // Certificate data
  const studentName = "John Doe";
  const courseName = "Advanced AI Tutoring";
  const ipfsHash = "bafybeifhno6izwirddghltban25ptgr3wux2ry44svliu5vzt5e45cfode"; // Replace with actual IPFS hash
  
  // Get accounts
  const accounts = await web3.eth.getAccounts();
  const owner = accounts[0];
  const recipient = accounts[1]; // Change as needed
  
  // Issue certificate
  const result = await certificateNFT.methods.issueCertificate(
    recipient,
    studentName,
    courseName,
    ipfsHash
  ).send({ from: owner });
  
  console.log("Certificate issued!");
  console.log("Transaction hash:", result.transactionHash);
  
  // Get the token ID from the event logs
  const event = result.events.CertificateIssued;
  const tokenId = event.returnValues.tokenId;
  console.log("Certificate Token ID:", tokenId);
}

issueCertificate().catch(console.error);