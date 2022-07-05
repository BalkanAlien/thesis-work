import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const expect = chai.expect;
//const assert = chai.assert;

//import { getAllCannedMessages } from '../modules/export/export.controller';
/*
import { findAll } from '../modules/export/export.service';

import { faker } from '@faker-js/faker';
*/
describe("export controller test", () => {

	it('should return 400 if accountId or apiKey are not specified', () => {
		chai.request('http://localhost:3000')
		.get('/export')
		.end((err, res) => {
			expect(res).to.have.status(400);
		});
	});

	it('should return 400 if accountId or apiKey are not specified', () => {
		chai.request('http://localhost:3000')
		.get('/export').query({accountId: '232434231'})
		.end((err, res) => {
			expect(res).to.have.status(400);
		});
	});

	it('should return 400 if accountId or apiKey are not specified', () => {
		chai.request('http://localhost:3000')
		.get('/export').query({apiKey: '232434231'})
		.end((err, res) => {
			expect(res).to.have.status(400);
		});
	});

	it('should return 400 if accountId does not contain only numbers', () => {
		chai.request('http://localhost:3000')
		.get('/export').query({accountId: '4m2ndos933'})
		.end((err, res) => {
			expect(res).to.have.status(400);
		});
	});
});
/*
	before(function(done) {
		accountId = faker.random.alphaNumeric(); 
		apiKey = faker.datatype.number();
	});
*/

