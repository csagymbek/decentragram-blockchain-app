pragma solidity ^0.8.9;

contract Decentragram {
  string public name = "Decentragram";

  // store image 
  mapping (uint => Image) public images;
  struct Image {
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
  }
}