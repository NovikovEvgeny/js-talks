const request = require('supertest');
const express = require('express');
const {assert, expect, should} = require('chai');

const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

describe('GET /users', function() {
  it('responds with json', function() {
    return request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
          assert(response.body.name, 'john')
      })
  });
});