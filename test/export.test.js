import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { faker } from "@faker-js/faker";
import axios from "axios";
import app from "../index.js";
import mockObject from "../helpers/mockResponse.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("export controller test", () => {
  sinon.stub(axios, "get").resolves(Promise.resolve({ data: mockObject }));

  it("should return 400 if accountId and apiKey are not specified", (done) => {
    chai
      .request(app)
      .get("/export")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.be.equal("Missing an accountId OR an API key.");
        done();
      });
  });

  it("should return 400 if apiKey is not specified", (done) => {
    chai
      .request(app)
      .get("/export")
      .query({
        accountId: faker.datatype.number(),
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.be.equal("Missing an accountId OR an API key.");
        done();
      });
  });

  it("should return 400 if accountId is not specified", (done) => {
    chai
      .request(app)
      .get("/export")
      .query({
        apiKey: faker.random.alphaNumeric(40),
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.be.equal("Missing an accountId OR an API key.");
        done();
      });
  });

  it("should return 400 if accountId does not contain only numbers", (done) => {
    chai
      .request(app)
      .get("/export")
      .query({
        accountId: faker.random.alphaNumeric(10),
        apiKey: faker.random.alphaNumeric(30),
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.be.equal(
          "The accountId should contain only numbers!"
        );
        done();
      });
  });

  it("should return 200 if accountId and apiKey are specified", (done) => {
    chai
      .request(app)
      .get("/export")
      .query({
        accountId: faker.datatype.number(),
        apiKey: faker.random.alphaNumeric(40),
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(mockObject);
        done();
      });
  });

  it("should return 500 if findAll is rejected", (done) => {
    axios.get.restore();
    sinon.stub(axios, "get").throws();
    chai
      .request(app)
      .get("/export")
      .query({
        accountId: faker.datatype.number(),
        apiKey: faker.random.alphaNumeric(40),
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({ error: "Error 500" });
        done();
      });
  });
});
