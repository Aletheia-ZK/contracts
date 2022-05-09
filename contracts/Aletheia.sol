// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import '@openzeppelin/contracts/access/Ownable.sol';
contract Aletheia is Ownable {

  /// @dev Emitted when a attestation root is changed.
  /// @param key: name of the attestation, e.g. zku_supporter_nft.
  /// @param value: new root value.
  event AttestationRootChanged(string key, string value);

  /// @dev Emitted when a new identity commitment is added.
  /// @param identityCommitment: New identity commitment.
  event MemberAdded(uint256 identityCommitment);

    // store merkle tree roots for different types of reputations
    mapping(string => string) public attestationRoots;

	function getAttestationRoot(string calldata name) public view returns (string memory) {
			return attestationRoots[name];
	}

	function setAttestationRoot(string calldata name, string calldata value)
			public
			onlyOwner
	{
			attestationRoots[name] = value;
			emit AttestationRootChanged(name, value);
	}

	/// @dev Adds an identity commitment to an existing group.
  /// @param identityCommitment: New identity commitment.
  function addMember(uint256 identityCommitment) external {
    emit MemberAdded(identityCommitment);
  }
}