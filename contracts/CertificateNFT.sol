// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract CertificateNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Certificate {
        string studentName;
        string courseName;
        uint256 issueDate;
        string ipfsHash;
    }

    mapping(uint256 => Certificate) public certificates;

    event CertificateIssued(
        uint256 indexed tokenId,
        string studentName,
        string courseName,
        uint256 issueDate,
        string ipfsHash
    );

    constructor() ERC721("AI Tutoring Certificate", "AITC") {}

    function issueCertificate(
        address recipient,
        string memory studentName,
        string memory courseName,
        string memory ipfsHash
    ) public onlyOwner returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        _safeMint(recipient, tokenId);

        certificates[tokenId] = Certificate({
            studentName: studentName,
            courseName: courseName,
            issueDate: block.timestamp,
            ipfsHash: ipfsHash
        });

        emit CertificateIssued(
            tokenId,
            studentName,
            courseName,
            block.timestamp,
            ipfsHash
        );

        return tokenId;
    }

    function getCertificate(uint256 tokenId) public view returns (
        string memory studentName,
        string memory courseName,
        uint256 issueDate,
        string memory ipfsHash
    ) {
        require(_exists(tokenId), "Certificate does not exist");
        Certificate memory cert = certificates[tokenId];
        return (cert.studentName, cert.courseName, cert.issueDate, cert.ipfsHash);
    }
}