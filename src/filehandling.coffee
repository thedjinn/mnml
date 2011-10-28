fs = require "fs"
core = require "./core"

module.exports.parseFile = (filename, callback) ->
  fs.readFile filename, (err, data) ->
    if err then throw err
    output = core.parse(data.toString())
    callback output

module.exports.parseFileSync = (filename) ->
  data = fs.readFileSync filename
  core.parse data.toString()
