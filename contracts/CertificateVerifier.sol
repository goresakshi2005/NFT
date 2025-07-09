// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CertificateNFT.sol";

contract CertificateVerifier {
    CertificateNFT public certificateNFT;

    constructor(address _certificateNFTAddress) {
        certificateNFT = CertificateNFT(_certificateNFTAddress);
    }

    function verifyCertificate(
        uint256 tokenId,
        string memory studentName,
        string memory courseName,
        uint256 issueDate
    ) public view returns (bool) {
        try certificateNFT.getCertificate(tokenId) returns (
            string memory _studentName,
            string memory _courseName,
            uint256 _issueDate,
            string memory
        ) {
            return (
                keccak256(abi.encodePacked(_studentName)) == keccak256(abi.encodePacked(studentName)) &&
                keccak256(abi.encodePacked(_courseName)) == keccak256(abi.encodePacked(courseName)) &&
                _issueDate == issueDate
            );
        } catch {
            return false;
        }
    }
}