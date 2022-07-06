import chai from 'chai';
import chaiHttp from 'chai-http';
import app  from '../index.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe("export controller test", () => {

	it('should return 400 if accountId and apiKey are not specified', () => {
		chai.request(app)
			.get('/export')
			.end((err, res) => {
				console.log("first test ", res.status);
				expect(res).to.have.status(400);
			});
	});

	it('should return 400 if apiKey is not specified', () => {
		chai.request(app)
			.get('/export').query({ accountId: '232434231' })
			.end((err, res) => {
				console.log("2 test ", res.status);
				expect(res).to.have.status(400);
			});
	});

	it('should return 400 if accountId is not specified', () => {
		chai.request(app)
			.get('/export').query({ apiKey: '232434231' })
			.end((err, res) => {
				console.log("3 test ", res.status);
				expect(res).to.have.status(400);
			});
	});

	it('should return 400 if accountId does not contain only numbers', () => {
		chai.request(app)
			.get('/export').query({ accountId: '4m2ndos933' })
			.end((err, res) => {
				console.log("4 test ", res.status);
				expect(res).to.have.status(400);
			});
	});
});
