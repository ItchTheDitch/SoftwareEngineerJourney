const express = require('express');

const knex = require('knex');

const postgres = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
    }
  });

  postgres.select('*').from('users');
