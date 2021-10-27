const { assert } = require("chai");

const Decentragram = artifacts.require("./Decentragram.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Decentragram", ([deployer, author, tipper]) => {
  let decentragram;

  before(async () => {
    decentragram = await Decentragram.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await decentragram.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await decentragram.name();
      assert.equal(name, "Decentragram");
    });
  });

  describe("images", async () => {
    let result, imageCount;
    const hash = "0x5A8B363DF475D9301f0482f36586a4Bc23b2F017";

    before(async () => {
      result = await decentragram.uploadImage(
        hash,
        "a double decker bus driving down a street",
        { from: author }
      );
      imageCount = await decentragram.imageCount();
    });

    it("createss images", async () => {
      // success
      assert.equal(imageCount, 1);
      const event = result.logs[0].args;

      // console.log(event);

      assert.equal(
        event.id.toNumber(),
        imageCount.toNumber(),
        "Given ID is correct..."
      );
      assert.equal(event.hash, hash, "Given hash is correct...");
      assert(
        event.description,
        "Image description",
        "Given description is correct..."
      );
      assert.equal(event.tipAmount, 0, "Given tip amount correct...");
      assert.equal(event.author, author, "Given author is correct...");

      await decentragram.uploadImage("", "Image description", { from: author })
        .should.be.rejected;

      await decentragram.uploadImage("Image hash", "", { from: author }).should
        .be.rejected;

      // checking for struct
      it("should list images", async () => {
        const image = await decentragram.images(imageCount);
        assert.equal(
          image.id.toNumber(),
          imageCount.toNumber(),
          "Given ID is correct..."
        );
        assert.equal(image.hash, hash, "Given hash is correct...");
        assert(
          image.description,
          "Image description",
          "Given description is correct..."
        );
        assert.equal(image.tipAmount, 0, "Given tip amount correct...");
        assert.equal(image.author, author, "Given author is correct...");
      });
    });
  });
});
