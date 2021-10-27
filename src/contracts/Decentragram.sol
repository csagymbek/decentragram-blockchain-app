pragma solidity ^0.8.9;

contract Decentragram {
  string public name = "Decentragram";

  // store image 
  uint public imageCount = 0;
  mapping (uint => Image) public images;
  struct Image {
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address  author;
  }

  event ImageCreated(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address author
  );

  // create images 
  function uploadImage(string memory _imgHash, string memory _description) public {
    // requirements for arguments
    require(bytes(_description).length > 0);
    require(bytes(_imgHash).length > 0);
    require(msg.sender != address(0x0));

    // increment image id 
    imageCount++;

    // add image to contract 
    images[imageCount] = Image(imageCount, _imgHash, _description, 0, msg.sender);

    // trigger an event 
    emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);
  } 
}