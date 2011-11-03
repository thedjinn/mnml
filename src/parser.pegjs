start
  = nodelist

nodelist
  = eol* nodes:node* eol* { return nodes; }

node
  = head:nodehead "->" whitespace? indent eol text:rawtext dedent eol { return {name:head.name, args:head.args, text:text, children:[]}; }
  / head:nodehead text:textline children:childblock? { return {name:head.name, args:head.args, text:text, children:children}; }

nodehead "node head"
  = name:identifier args:arglist? whitespace?
    {
      var arglist = {};
      if (args) {
        args.map(function(a) {
          arglist[a.key] = a.value;
        });
      }
      return {name:name, args:arglist};
    }

childblock
  = indent children:nodelist dedent eol { return children; }

arglist "argument list"
  = args:argument+ { return args; }

argument "key/value pair"
  = whitespace key:identifier "=" value:value { return {key:key, value:value}; }

value "value"
  = '"' value:quotedchar* '"'  { return value.join(""); }
  / value:[a-zA-Z0-9_-]* { return value.join(""); }

quotedchar
  = "\\\"" { return "\""; }
  / [^"]

identifier "identifier"
  = head:[a-zA-Z_] tail:[a-zA-Z0-9\-_]* { return head + tail.join(""); }

whitespace "whitespace"
  = [ \t]+

textline "text line"
  = text:[^\n]* eol { return text.join(""); }

rawtext "heredoc contents"
  = heredoc:[^\u0002]* { while (heredoc.length > 0 && heredoc[heredoc.length - 1] == "\n") { heredoc.pop(); } return heredoc.join(""); }

indent "indent marker"
  = [\u0001]

dedent "dedent marker"
  = [\u0002]

eol "line break"
  = "\r"? "\n"
