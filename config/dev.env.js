'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FOO:'"BAR"',
  Riot_API:'"RGAPI-f9742994-37b5-4824-b89a-211cd32cdfaf"'
})
