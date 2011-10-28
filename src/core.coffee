if typeof module == "undefined"
    mnml = @mnml
else
    mnml = module.exports
    mnml.parser = require("./parser").parser

mnml.parse = (string) ->
  throw new Error("parse() requires a string to parse") if not string?

  preprocessed = preprocess string
  mnml.parser.parse preprocessed

preprocess = (string) ->
  lines = string.split "\n"

  context = [0]
  output = ""
  heredoc = false

  for line in lines
    [_, indent, content] = line.match /^(\s*)(.*)$/
    indent = indent.length

    if content.length == 0
      indent = context[context.length - 1]

    if heredoc
      if context[context.length - 1] == -1
        context[context.length - 1] = indent
      if indent >= context[context.length - 1]
        indent -= context[context.length - 1]
        output += "#{Array(indent + 1).join " "}#{content}\n"
        continue
      else
        output += "\002\n"
        context.pop()
        heredoc = false

    if content[0] == "#"
      continue
    if content.length == 0
      continue

    if indent > context[context.length - 1]
      output += "\001\n"
      context.push indent
    else while indent < context[context.length - 1]
      output += "\002\n"
      context.pop()

    output += content

    if not heredoc and content.match /->\s*$/
      output += "\001"
      context.push -1
      heredoc = true

    output += "\n"

  while context.length > 1
    output += "\002\n"
    context.pop()

  output


