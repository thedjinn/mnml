if (typeof module === "undefined") { var mnml = this.mnml = {}; } else { var mnml = module.exports; } mnml.parser = (function(){
  /* Generated by PEG.js 0.6.2 (http://pegjs.majda.cz/). */
  
  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "arglist": parse_arglist,
        "argument": parse_argument,
        "childblock": parse_childblock,
        "dedent": parse_dedent,
        "eol": parse_eol,
        "identifier": parse_identifier,
        "indent": parse_indent,
        "node": parse_node,
        "nodehead": parse_nodehead,
        "nodelist": parse_nodelist,
        "quotedchar": parse_quotedchar,
        "rawtext": parse_rawtext,
        "textline": parse_textline,
        "value": parse_value,
        "whitespace": parse_whitespace
      };
      
      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "nodelist";
      }
      
      var pos = 0;
      var reportMatchFailures = true;
      var rightmostMatchFailuresPos = 0;
      var rightmostMatchFailuresExpected = [];
      var cache = {};
      
      function padLeft(input, padding, length) {
        var result = input;
        
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        
        return result;
      }
      
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        
        if (charCode <= 0xFF) {
          var escapeChar = 'x';
          var length = 2;
        } else {
          var escapeChar = 'u';
          var length = 4;
        }
        
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }
      
      function quote(s) {
        /*
         * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
         * string literal except for the closing quote character, backslash,
         * carriage return, line separator, paragraph separator, and line feed.
         * Any character may appear in the form of an escape sequence.
         */
        return '"' + s
          .replace(/\\/g, '\\\\')            // backslash
          .replace(/"/g, '\\"')              // closing quote character
          .replace(/\r/g, '\\r')             // carriage return
          .replace(/\n/g, '\\n')             // line feed
          .replace(/[\x80-\uFFFF]/g, escape) // non-ASCII characters
          + '"';
      }
      
      function matchFailed(failure) {
        if (pos < rightmostMatchFailuresPos) {
          return;
        }
        
        if (pos > rightmostMatchFailuresPos) {
          rightmostMatchFailuresPos = pos;
          rightmostMatchFailuresExpected = [];
        }
        
        rightmostMatchFailuresExpected.push(failure);
      }
      
      function parse_nodelist() {
        var cacheKey = 'nodelist@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        
        var savedPos0 = pos;
        var savedPos1 = pos;
        var result3 = [];
        var result8 = parse_eol();
        while (result8 !== null) {
          result3.push(result8);
          var result8 = parse_eol();
        }
        if (result3 !== null) {
          var result4 = [];
          var result7 = parse_node();
          while (result7 !== null) {
            result4.push(result7);
            var result7 = parse_node();
          }
          if (result4 !== null) {
            var result5 = [];
            var result6 = parse_eol();
            while (result6 !== null) {
              result5.push(result6);
              var result6 = parse_eol();
            }
            if (result5 !== null) {
              var result1 = [result3, result4, result5];
            } else {
              var result1 = null;
              pos = savedPos1;
            }
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(nodes) { return nodes; })(result1[1])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }
        
        
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_node() {
        var cacheKey = 'node@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        
        var savedPos2 = pos;
        var savedPos3 = pos;
        var result11 = parse_nodehead();
        if (result11 !== null) {
          if (input.substr(pos, 2) === "->") {
            var result12 = "->";
            pos += 2;
          } else {
            var result12 = null;
            if (reportMatchFailures) {
              matchFailed("\"->\"");
            }
          }
          if (result12 !== null) {
            var result19 = parse_whitespace();
            var result13 = result19 !== null ? result19 : '';
            if (result13 !== null) {
              var result14 = parse_indent();
              if (result14 !== null) {
                var result15 = parse_eol();
                if (result15 !== null) {
                  var result16 = parse_rawtext();
                  if (result16 !== null) {
                    var result17 = parse_dedent();
                    if (result17 !== null) {
                      var result18 = parse_eol();
                      if (result18 !== null) {
                        var result9 = [result11, result12, result13, result14, result15, result16, result17, result18];
                      } else {
                        var result9 = null;
                        pos = savedPos3;
                      }
                    } else {
                      var result9 = null;
                      pos = savedPos3;
                    }
                  } else {
                    var result9 = null;
                    pos = savedPos3;
                  }
                } else {
                  var result9 = null;
                  pos = savedPos3;
                }
              } else {
                var result9 = null;
                pos = savedPos3;
              }
            } else {
              var result9 = null;
              pos = savedPos3;
            }
          } else {
            var result9 = null;
            pos = savedPos3;
          }
        } else {
          var result9 = null;
          pos = savedPos3;
        }
        var result10 = result9 !== null
          ? (function(head, text) { return {name:head.name, args:head.args, text:text, children:[]}; })(result9[0], result9[5])
          : null;
        if (result10 !== null) {
          var result8 = result10;
        } else {
          var result8 = null;
          pos = savedPos2;
        }
        if (result8 !== null) {
          var result0 = result8;
        } else {
          var savedPos0 = pos;
          var savedPos1 = pos;
          var result4 = parse_nodehead();
          if (result4 !== null) {
            var result5 = parse_textline();
            if (result5 !== null) {
              var result7 = parse_childblock();
              var result6 = result7 !== null ? result7 : '';
              if (result6 !== null) {
                var result2 = [result4, result5, result6];
              } else {
                var result2 = null;
                pos = savedPos1;
              }
            } else {
              var result2 = null;
              pos = savedPos1;
            }
          } else {
            var result2 = null;
            pos = savedPos1;
          }
          var result3 = result2 !== null
            ? (function(head, text, children) { return {name:head.name, args:head.args, text:text, children:children}; })(result2[0], result2[1], result2[2])
            : null;
          if (result3 !== null) {
            var result1 = result3;
          } else {
            var result1 = null;
            pos = savedPos0;
          }
          if (result1 !== null) {
            var result0 = result1;
          } else {
            var result0 = null;;
          };
        }
        
        
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_nodehead() {
        var cacheKey = 'nodehead@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var savedReportMatchFailures = reportMatchFailures;
        reportMatchFailures = false;
        var savedPos0 = pos;
        var savedPos1 = pos;
        var result3 = parse_identifier();
        if (result3 !== null) {
          var result7 = parse_arglist();
          var result4 = result7 !== null ? result7 : '';
          if (result4 !== null) {
            var result6 = parse_whitespace();
            var result5 = result6 !== null ? result6 : '';
            if (result5 !== null) {
              var result1 = [result3, result4, result5];
            } else {
              var result1 = null;
              pos = savedPos1;
            }
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(name, args) {
                var arglist = {};
                if (args) {
                  args.map(function(a) {
                    arglist[a.key] = a.value;
                  });
                }
                return {name:name, args:arglist};
              })(result1[0], result1[1])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }
        reportMatchFailures = savedReportMatchFailures;
        if (reportMatchFailures && result0 === null) {
          matchFailed("node head");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_childblock() {
        var cacheKey = 'childblock@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        
        var savedPos0 = pos;
        var savedPos1 = pos;
        var result3 = parse_indent();
        if (result3 !== null) {
          var result4 = parse_nodelist();
          if (result4 !== null) {
            var result5 = parse_dedent();
            if (result5 !== null) {
              var result6 = parse_eol();
              if (result6 !== null) {
                var result1 = [result3, result4, result5, result6];
              } else {
                var result1 = null;
                pos = savedPos1;
              }
            } else {
              var result1 = null;
              pos = savedPos1;
            }
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(children) { return children; })(result1[1])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }
        
        
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_arglist() {
        var cacheKey = 'arglist@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var savedReportMatchFailures = reportMatchFailures;
        reportMatchFailures = false;
        var savedPos0 = pos;
        var result3 = parse_argument();
        if (result3 !== null) {
          var result1 = [];
          while (result3 !== null) {
            result1.push(result3);
            var result3 = parse_argument();
          }
        } else {
          var result1 = null;
        }
        var result2 = result1 !== null
          ? (function(args) { return args; })(result1)
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }
        reportMatchFailures = savedReportMatchFailures;
        if (reportMatchFailures && result0 === null) {
          matchFailed("argument list");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_argument() {
        var cacheKey = 'argument@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var savedReportMatchFailures = reportMatchFailures;
        reportMatchFailures = false;
        var savedPos0 = pos;
        var savedPos1 = pos;
        var result3 = parse_whitespace();
        if (result3 !== null) {
          var result4 = parse_identifier();
          if (result4 !== null) {
            if (input.substr(pos, 1) === "=") {
              var result5 = "=";
              pos += 1;
            } else {
              var result5 = null;
              if (reportMatchFailures) {
                matchFailed("\"=\"");
              }
            }
            if (result5 !== null) {
              var result6 = parse_value();
              if (result6 !== null) {
                var result1 = [result3, result4, result5, result6];
              } else {
                var result1 = null;
                pos = savedPos1;
              }
            } else {
              var result1 = null;
              pos = savedPos1;
            }
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(key, value) { return {key:key, value:value}; })(result1[1], result1[3])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }
        reportMatchFailures = savedReportMatchFailures;
        if (reportMatchFailures && result0 === null) {
          matchFailed("key/value pair");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_value() {
        var cacheKey = 'value@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var savedReportMatchFailures = reportMatchFailures;
        reportMatchFailures = false;
        var savedPos1 = pos;
        var savedPos2 = pos;
        if (input.substr(pos, 1) === "\"") {
          var result8 = "\"";
          pos += 1;
        } else {
          var result8 = null;
          if (reportMatchFailures) {
            matchFailed("\"\\\"\"");
          }
        }
        if (result8 !== null) {
          var result9 = [];
          var result11 = parse_quotedchar();
          while (result11 !== null) {
            result9.push(result11);
            var result11 = parse_quotedchar();
          }
          if (result9 !== null) {
            if (input.substr(pos, 1) === "\"") {
              var result10 = "\"";
              pos += 1;
            } else {
              var result10 = null;
              if (reportMatchFailures) {
                matchFailed("\"\\\"\"");
              }
            }
            if (result10 !== null) {
              var result6 = [result8, result9, result10];
            } else {
              var result6 = null;
              pos = savedPos2;
            }
          } else {
            var result6 = null;
            pos = savedPos2;
          }
        } else {
          var result6 = null;
          pos = savedPos2;
        }
        var result7 = result6 !== null
          ? (function(value) { return value.join(""); })(result6[1])
          : null;
        if (result7 !== null) {
          var result5 = result7;
        } else {
          var result5 = null;
          pos = savedPos1;
        }
        if (result5 !== null) {
          var result0 = result5;
        } else {
          var savedPos0 = pos;
          var result2 = [];
          if (input.substr(pos).match(/^[a-zA-Z0-9_\-]/) !== null) {
            var result4 = input.charAt(pos);
            pos++;
          } else {
            var result4 = null;
            if (reportMatchFailures) {
              matchFailed("[a-zA-Z0-9_\\-]");
            }
          }
          while (result4 !== null) {
            result2.push(result4);
            if (input.substr(pos).match(/^[a-zA-Z0-9_\-]/) !== null) {
              var result4 = input.charAt(pos);
              pos++;
            } else {
              var result4 = null;
              if (reportMatchFailures) {
                matchFailed("[a-zA-Z0-9_\\-]");
              }
            }
          }
          var result3 = result2 !== null
            ? (function(value) { return value.join(""); })(result2)
            : null;
          if (result3 !== null) {
            var result1 = result3;
          } else {
            var result1 = null;
            pos = savedPos0;
          }
          if (result1 !== null) {
            var result0 = result1;
          } else {
            var result0 = null;;
          };
        }
        reportMatchFailures = savedReportMatchFailures;
        if (reportMatchFailures && result0 === null) {
          matchFailed("value");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_quotedchar() {
        var cacheKey = 'quotedchar@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        
        var savedPos0 = pos;
        if (input.substr(pos, 2) === "\\\"") {
          var result3 = "\\\"";
          pos += 2;
        } else {
          var result3 = null;
          if (reportMatchFailures) {
            matchFailed("\"\\\\\\\"\"");
          }
        }
        var result4 = result3 !== null
          ? (function() { return "\""; })()
          : null;
        if (result4 !== null) {
          var result2 = result4;
        } else {
          var result2 = null;
          pos = savedPos0;
        }
        if (result2 !== null) {
          var result0 = result2;
        } else {
          if (input.substr(pos).match(/^[^"]/) !== null) {
            var result1 = input.charAt(pos);
            pos++;
          } else {
            var result1 = null;
            if (reportMatchFailures) {
              matchFailed("[^\"]");
            }
          }
          if (result1 !== null) {
            var result0 = result1;
          } else {
            var result0 = null;;
          };
        }
        
        
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_identifier() {
        var cacheKey = 'identifier@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var savedReportMatchFailures = reportMatchFailures;
        reportMatchFailures = false;
        var savedPos0 = pos;
        var savedPos1 = pos;
        if (input.substr(pos).match(/^[a-zA-Z_]/) !== null) {
          var result3 = input.charAt(pos);
          pos++;
        } else {
          var result3 = null;
          if (reportMatchFailures) {
            matchFailed("[a-zA-Z_]");
          }
        }
        if (result3 !== null) {
          var result4 = [];
          if (input.substr(pos).match(/^[a-zA-Z0-9\-_]/) !== null) {
            var result5 = input.charAt(pos);
            pos++;
          } else {
            var result5 = null;
            if (reportMatchFailures) {
              matchFailed("[a-zA-Z0-9\\-_]");
            }
          }
          while (result5 !== null) {
            result4.push(result5);
            if (input.substr(pos).match(/^[a-zA-Z0-9\-_]/) !== null) {
              var result5 = input.charAt(pos);
              pos++;
            } else {
              var result5 = null;
              if (reportMatchFailures) {
                matchFailed("[a-zA-Z0-9\\-_]");
              }
            }
          }
          if (result4 !== null) {
            var result1 = [result3, result4];
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(head, tail) { return head + tail.join(""); })(result1[0], result1[1])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }
        reportMatchFailures = savedReportMatchFailures;
        if (reportMatchFailures && result0 === null) {
          matchFailed("identifier");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_whitespace() {
        var cacheKey = 'whitespace@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var savedReportMatchFailures = reportMatchFailures;
        reportMatchFailures = false;
        if (input.substr(pos).match(/^[ 	]/) !== null) {
          var result1 = input.charAt(pos);
          pos++;
        } else {
          var result1 = null;
          if (reportMatchFailures) {
            matchFailed("[ 	]");
          }
        }
        if (result1 !== null) {
          var result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            if (input.substr(pos).match(/^[ 	]/) !== null) {
              var result1 = input.charAt(pos);
              pos++;
            } else {
              var result1 = null;
              if (reportMatchFailures) {
                matchFailed("[ 	]");
              }
            }
          }
        } else {
          var result0 = null;
        }
        reportMatchFailures = savedReportMatchFailures;
        if (reportMatchFailures && result0 === null) {
          matchFailed("whitespace");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_textline() {
        var cacheKey = 'textline@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var savedReportMatchFailures = reportMatchFailures;
        reportMatchFailures = false;
        var savedPos0 = pos;
        var savedPos1 = pos;
        var result3 = [];
        if (input.substr(pos).match(/^[^\n]/) !== null) {
          var result5 = input.charAt(pos);
          pos++;
        } else {
          var result5 = null;
          if (reportMatchFailures) {
            matchFailed("[^\\n]");
          }
        }
        while (result5 !== null) {
          result3.push(result5);
          if (input.substr(pos).match(/^[^\n]/) !== null) {
            var result5 = input.charAt(pos);
            pos++;
          } else {
            var result5 = null;
            if (reportMatchFailures) {
              matchFailed("[^\\n]");
            }
          }
        }
        if (result3 !== null) {
          var result4 = parse_eol();
          if (result4 !== null) {
            var result1 = [result3, result4];
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(text) { return text.join(""); })(result1[0])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }
        reportMatchFailures = savedReportMatchFailures;
        if (reportMatchFailures && result0 === null) {
          matchFailed("text line");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_rawtext() {
        var cacheKey = 'rawtext@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var savedReportMatchFailures = reportMatchFailures;
        reportMatchFailures = false;
        var savedPos0 = pos;
        var result1 = [];
        if (input.substr(pos).match(/^[^]/) !== null) {
          var result3 = input.charAt(pos);
          pos++;
        } else {
          var result3 = null;
          if (reportMatchFailures) {
            matchFailed("[^]");
          }
        }
        while (result3 !== null) {
          result1.push(result3);
          if (input.substr(pos).match(/^[^]/) !== null) {
            var result3 = input.charAt(pos);
            pos++;
          } else {
            var result3 = null;
            if (reportMatchFailures) {
              matchFailed("[^]");
            }
          }
        }
        var result2 = result1 !== null
          ? (function(heredoc) { while (heredoc.length > 0 && heredoc[heredoc.length - 1] == "\n") { heredoc.pop(); } return heredoc.join(""); })(result1)
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }
        reportMatchFailures = savedReportMatchFailures;
        if (reportMatchFailures && result0 === null) {
          matchFailed("heredoc contents");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_indent() {
        var cacheKey = 'indent@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var savedReportMatchFailures = reportMatchFailures;
        reportMatchFailures = false;
        if (input.substr(pos).match(/^[]/) !== null) {
          var result0 = input.charAt(pos);
          pos++;
        } else {
          var result0 = null;
          if (reportMatchFailures) {
            matchFailed("[]");
          }
        }
        reportMatchFailures = savedReportMatchFailures;
        if (reportMatchFailures && result0 === null) {
          matchFailed("indent marker");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_dedent() {
        var cacheKey = 'dedent@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var savedReportMatchFailures = reportMatchFailures;
        reportMatchFailures = false;
        if (input.substr(pos).match(/^[]/) !== null) {
          var result0 = input.charAt(pos);
          pos++;
        } else {
          var result0 = null;
          if (reportMatchFailures) {
            matchFailed("[]");
          }
        }
        reportMatchFailures = savedReportMatchFailures;
        if (reportMatchFailures && result0 === null) {
          matchFailed("dedent marker");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function parse_eol() {
        var cacheKey = 'eol@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }
        
        var savedReportMatchFailures = reportMatchFailures;
        reportMatchFailures = false;
        var savedPos0 = pos;
        if (input.substr(pos, 1) === "\r") {
          var result3 = "\r";
          pos += 1;
        } else {
          var result3 = null;
          if (reportMatchFailures) {
            matchFailed("\"\\r\"");
          }
        }
        var result1 = result3 !== null ? result3 : '';
        if (result1 !== null) {
          if (input.substr(pos, 1) === "\n") {
            var result2 = "\n";
            pos += 1;
          } else {
            var result2 = null;
            if (reportMatchFailures) {
              matchFailed("\"\\n\"");
            }
          }
          if (result2 !== null) {
            var result0 = [result1, result2];
          } else {
            var result0 = null;
            pos = savedPos0;
          }
        } else {
          var result0 = null;
          pos = savedPos0;
        }
        reportMatchFailures = savedReportMatchFailures;
        if (reportMatchFailures && result0 === null) {
          matchFailed("line break");
        }
        
        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }
      
      function buildErrorMessage() {
        function buildExpected(failuresExpected) {
          failuresExpected.sort();
          
          var lastFailure = null;
          var failuresExpectedUnique = [];
          for (var i = 0; i < failuresExpected.length; i++) {
            if (failuresExpected[i] !== lastFailure) {
              failuresExpectedUnique.push(failuresExpected[i]);
              lastFailure = failuresExpected[i];
            }
          }
          
          switch (failuresExpectedUnique.length) {
            case 0:
              return 'end of input';
            case 1:
              return failuresExpectedUnique[0];
            default:
              return failuresExpectedUnique.slice(0, failuresExpectedUnique.length - 1).join(', ')
                + ' or '
                + failuresExpectedUnique[failuresExpectedUnique.length - 1];
          }
        }
        
        var expected = buildExpected(rightmostMatchFailuresExpected);
        var actualPos = Math.max(pos, rightmostMatchFailuresPos);
        var actual = actualPos < input.length
          ? quote(input.charAt(actualPos))
          : 'end of input';
        
        return 'Expected ' + expected + ' but ' + actual + ' found.';
      }
      
      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */
        
        var line = 1;
        var column = 1;
        var seenCR = false;
        
        for (var i = 0; i <  rightmostMatchFailuresPos; i++) {
          var ch = input.charAt(i);
          if (ch === '\n') {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === '\r' | ch === '\u2028' || ch === '\u2029') {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }
        
        return { line: line, column: column };
      }
      
      
      
      var result = parseFunctions[startRule]();
      
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostMatchFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostMatchFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostMatchFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        var errorPosition = computeErrorPosition();
        throw new this.SyntaxError(
          buildErrorMessage(),
          errorPosition.line,
          errorPosition.column
        );
      }
      
      return result;
    },
    
    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };
  
  /* Thrown when a parser encounters a syntax error. */
  
  result.SyntaxError = function(message, line, column) {
    this.name = 'SyntaxError';
    this.message = message;
    this.line = line;
    this.column = column;
  };
  
  result.SyntaxError.prototype = Error.prototype;
  
  return result;
})();
(function() {
  var mnml, preprocess;
  if (typeof module === "undefined") {
    mnml = this.mnml;
  } else {
    mnml = module.exports;
    mnml.parser = require("./parser").parser;
  }
  mnml.parse = function(string) {
    var preprocessed;
    if (!(string != null)) {
      throw new Error("parse() requires a string to parse");
    }
    preprocessed = preprocess(string);
    return mnml.parser.parse(preprocessed);
  };
  preprocess = function(string) {
    var content, context, heredoc, indent, line, lines, output, _, _i, _len, _ref;
    lines = string.split("\n");
    context = [0];
    output = "";
    heredoc = false;
    for (_i = 0, _len = lines.length; _i < _len; _i++) {
      line = lines[_i];
      _ref = line.match(/^(\s*)(.*)$/), _ = _ref[0], indent = _ref[1], content = _ref[2];
      indent = indent.length;
      if (content.length === 0) {
        indent = context[context.length - 1];
      }
      if (heredoc) {
        if (context[context.length - 1] === -1) {
          context[context.length - 1] = indent;
        }
        if (indent >= context[context.length - 1]) {
          indent -= context[context.length - 1];
          output += "" + (Array(indent + 1).join(" ")) + content + "\n";
          continue;
        } else {
          output += "\002\n";
          context.pop();
          heredoc = false;
        }
      }
      if (content[0] === "#") {
        continue;
      }
      if (content.length === 0) {
        continue;
      }
      if (indent > context[context.length - 1]) {
        output += "\001\n";
        context.push(indent);
      } else {
        while (indent < context[context.length - 1]) {
          output += "\002\n";
          context.pop();
        }
      }
      output += content;
      if (!heredoc && content.match(/->\s*$/)) {
        output += "\001";
        context.push(-1);
        heredoc = true;
      }
      output += "\n";
    }
    while (context.length > 1) {
      output += "\002\n";
      context.pop();
    }
    return output;
  };
}).call(this);
