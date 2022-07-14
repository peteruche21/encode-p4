// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor()
        ERC721("EncodeNFT", "ECN");
    {}

    function mintToken(address owner) public returns (uint256) {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _safeMint(owner, id);

        return id;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://localhost:3001/metadata/";
    }
}