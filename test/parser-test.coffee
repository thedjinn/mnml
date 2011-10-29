vows = require "vows"
assert = require "assert"
mnml = require "../lib/mnml"

vows.describe("parser").addBatch
  "parse":
    "raises when there is nothing to parse": ->
      assert.throws -> mnml.parse()

    "returns empty array when no tags are given": ->
      assert.deepEqual mnml.parse(""), []
      assert.deepEqual mnml.parse("    \n   \n\n\n   \n  "), []

    "accepts tags": ->
      result = mnml.parse "foo\nbar\n\n\nquux"
      assert.equal result.length, 3
      assert.equal result[0].name, "foo"
      assert.equal result[1].name, "bar"
      assert.equal result[2].name, "quux"

    "accepts tags with inline text": ->
      result = mnml.parse "foo this is text\nbar more text here\n\n\nquux and some text here"
      assert.equal result.length, 3
      assert.equal result[0].text, "this is text"
      assert.equal result[1].text, "more text here"
      assert.equal result[2].text, "and some text here"

    "accepts tags with heredocs": ->
      # note: the third example has trailing whitespace after the arrow
      result = mnml.parse """
                          foo ->
                            here we have
                            some

                            heredoc text

                          bar    ->
                            here's another one

                          quux ->   
                            quite wonderful
                              the indentation
                            also works!
                          """
      assert.equal result.length, 3
      assert.equal result[0].text, "here we have\nsome\n\nheredoc text"
      assert.equal result[1].text, "here's another one"
      assert.equal result[2].text, "quite wonderful\n  the indentation\nalso works!"

    "does not treat inline text with an arrow as a heredoc": ->
        result = mnml.parse """
                            foo example -> one
                              not a heredoc
                            bar -> example two
                              not a heredoc
                            """
        assert.equal result.length, 2
        assert.equal result[0].children.length, 1
        assert.equal result[1].children.length, 1
        assert.equal result[0].text, "example -> one"
        assert.equal result[1].text, "-> example two"

    "accepts tags with unquoted arguments": ->
      result = mnml.parse """
                          foo arg1=value1    arg2=value2 arg3=value3
                          bar arg4= arg5=value5

                          quux arg6=value6
                          """
      assert.equal result.length, 3
      assert.deepEqual result[0].args, {arg1: "value1", arg2: "value2", arg3: "value3"}
      assert.deepEqual result[1].args, {arg4: "", arg5: "value5"}
      assert.deepEqual result[2].args, {arg6: "value6"}

    "accepts tags with quoted arguments": ->
      result = mnml.parse """
                          foo arg1="first value" arg2=second arg3="third value"
                          bar arg4=""    arg5="fifth value"
                          
                          quux arg6="the longest value is the sixth one"
                          """
      assert.equal result.length, 3
      assert.deepEqual result[0].args, {arg1: "first value", arg2: "second", arg3: "third value"}
      assert.deepEqual result[1].args, {arg4: "", arg5: "fifth value"}
      assert.deepEqual result[2].args, {arg6: "the longest value is the sixth one"}

    "accepts escaped quotes in quoted arguments": ->
      result = mnml.parse """
                          foo arg1="hello\\"world" arg2=test
                          """
      assert.equal result.length, 1
      assert.deepEqual result[0].args, {arg1: "hello\"world", arg2: "test"}

    "accepts single character argument names": ->
      result = mnml.parse "foo x=hello y=\"world\" text"
      assert.equal result.length, 1
      assert.deepEqual result[0].args, {x: "hello", y: "world"}
      assert.equal result[0].text, "text"

    "accepts nested tags": ->
      result = mnml.parse """
                          first with text
                            second with more text
                              third with=arguments and text
                              fourth ->
                                with a heredoc

                            fifth
                              sixth

                          seventh
                          """

      assert.equal result.length, 2
      assert.equal result[0].children.length, 2
      assert.equal result[0].children[0].children.length, 2
      assert.equal result[0].children[0].children[0].children.length, 0
      assert.equal result[0].children[0].children[1].children.length, 0
      assert.equal result[0].children[0].children[1].name, "fourth"
      assert.equal result[0].children[1].children.length, 1
      assert.equal result[0].children[1].children[0].children.length, 0
      assert.equal result[1].children.length, 0

    "accepts comments": ->
      result = mnml.parse """
                          # first comment
                          tag
                          tag with text
                          tag # this is not a comment
                          tag
                            tag
                            # second comment
                          # third comment
                          """
      assert.equal result.length, 4
      assert.equal result[2].text, "# this is not a comment"

.export module
