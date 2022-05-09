// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ZKUCohort2SupporterToken is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 immutable public maxSupply;

    constructor(uint256 _maxSupply) ERC721("ZKU Cohort 2 Supporter Token", "ZKU Sup") {
        maxSupply = _maxSupply;
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "ipfs://bafybeiew4mcu4uowwu64ipmfs3li5tnd5jb4q4fwxsh7l2q3b6nbitzwam/";
    }

    function safeMint(address to) public {
        require (totalSupply() < maxSupply);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

        function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
