core = require "./core"
filehandling = require "./filehandling"

module.exports.parse = core.parse
module.exports.parseFile = filehandling.parseFile
module.exports.parseFileSync = filehandling.parseFileSync

#util = require "util"
#ast = module.exports.parseFileSync "example.deck"
#console.log(util.inspect(ast, false, null))
