const request = require('supertest');
const app = require('../index');
const { before } = require('mocha');
const { expect, assert } = require('chai');
describe('Test the login endpoint', () => {
  it('It should return a token', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'user', password: 'password' });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property('token').to.be.a('string');
  });
});

describe('Test the apply-json-patch endpoint', () => {
  let token = null;
  before(async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'user', password: 'password' });
    token = response.body.token;
  });

  it('It should apply the JSON patch', async () => {
    const json = { name: 'John', age: 30 };
    const patch = [{ op: 'replace', path: '/age', value: 31 }];
    const response = await request(app)
      .patch('/api/apply-json-patch')
      .set('Authorization', `Bearer ${token}`)
      .send({ json, patch });

    expect(response.statusCode).to.equal(200);
    assert.deepEqual(response.body, {
      name: json.name,
      age: 31,
    });
  });

  it('It should return an error for invalid JSON patch', async () => {
    const json = { name: 'John', age: 30 };
    const patch = [{ op: 'invalid_op', path: '/age', value: 31 }];
    const response = await request(app)
      .patch('/api/apply-json-patch')
      .set('Authorization', `Bearer ${token}`)
      .send({ json, patch });

    expect(response.statusCode).to.equal(400);
    expect(response.body).to.have.property('error');
  });

  it('It should return an error for unauthorized access', async () => {
    const json = { name: 'John', age: 30 };
    const patch = [{ op: 'replace', path: '/age', value: 31 }];
    const response = await request(app)
      .patch('/api/apply-json-patch')
      .send({ json, patch });
    expect(response.statusCode).to.equal(401);
    expect(response.body).to.have.property('error');
  });
});
