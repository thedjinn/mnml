# mnml - Minimalistic General Purpose Markup Language

Mnml (pronounced *minimal*) is a general purpose markup language specifically designed to be able to express tree-like structures with minimal syntax while retaining readability.

## Example document

Mnml has a really simple structure so a quick look at the following example document should explain all the characteristics of the format:

    # This is a mnml document.
    # A pound at the beginning of the line indicates a comment.

    # The basic building block of a mnml document is called a tag. The
    # simplest form of a tag is just a tag name, like this:
    object

    # Note that there is no fixed set of tags, the choice of tags used
    # is left to the program that is used to interpret the tags. This
    # means that you can use mnml to design your own config file format,
    # text document or DSL.

    # A tag can have optional keyword arguments. The value of these
    # arguments may be an unquoted set of characters or a quoted string
    # if the value contains whitespace. Mnml treats all values as strings,
    # but you may interpret them as you wish.
    font family="Helvetica Neue" size=20 weight=bold

    # A tag also has a text value associated with it. Everything after the
    # arguments (if they exist) or the tag name is used as the text value.
    # Here are some examples:
    title The Magnificent Page
    task owner="John Doe" due=tomorrow Take out the trash

    # Sometimes a single line of text content is not enough. For this mnml
    # provides heredocs. A heredoc is basically an indented multiline
    # string. It is indicated by placing an arrow at the end of the line.
    # Here is an example:
    paragraph color=red ->
      This is a long piece of text.
      It can span multiple lines.

      Line breaks are preserved.
        And so is any extra indentation.
      Trailing newlines are removed.

    # The heredoc maintains any additional indentation after the first line
    # (which defines the left margin), so it is perfectly suited for code,
    # markup or anything else that has significant whitespace.

    # Now, a tree-based markup language is not complete without the ability
    # to nest tags, so mnml also supports this, in a similar fashion to Haml
    # or Python:
    window
      title My Program Window
      groupbox Some checkboxes to click on
        checkbox First item
        checkbox Second item

      sidebar width=narrow
        label Hello World!

    # Note: heredocs and child tags are mutually exclusive!

## Parser usage

### Node.js

Reading a mnml file in your Node.js project is really simple. First make sure you have the `mnml` package installed:

    npm install mnml

Then for parsing a file you can use the following snippet of code:

    var mnml = require("mnml");

    mnml.parseFile("path/to/file.mnml", function(ast) {
        console.log(ast);
    });

The `parseFile` function accepts a callback which is called with the abstract syntax tree of the document. The AST is represented as a tree of objects with the following structure:

    {
        name: "task",
        args: {
            owner: "John Doe",
            due: "tomorrow"
        },
        text: "Take out the trash",
        children: []
    }

The value passed to the parse callback is an array of these objects. When there is no text given the `text` property is an empty string.

Additionally, you may also want to parse a file synchronously:

    var ast = mnml.parseFileSync("path/to/file.mnml");

In some cases you don't want to deal with files but directly parse a string. This is also possible:

    var ast = mnml.parse("foo bar=baz");

### Browser

You can parse mnml strings inside the browser too. A browser-ready version of the mnml parser can be found in the `browser` directory of the Git repository.

To use it, first make sure to load the script. You can choose between a normal and a minified version.

    <script src="mnml.min.js"></script>

Now you are ready to parse strings:

    var ast = mnml.parse("foo bar=baz");

## Vim plugin

If you want to edit mnml files in Vim then have a look at the [vim-mnml](https://github.com/thedjinn/vim-mnml) plugin. This plugin adds both syntax highlighting and indentation support for the mnml file format. Files which have the `mnml` extension will automatically use it.

## Contributing

If you want to file a bug report for a parser issue, then please provide a failing test.

If you want to contribute code then follow these steps:

 * Check if your idea hasn't been implemented or fixed yet
 * Fork the project
 * Start a feature/bugfix branch
 * Create your awesome piece of code
 * Add tests for it
 * Commit, push and submit a pull request

Please do not mess around with the makefile or package description files. Also, pull requests without tests will not be accepted.

## License

Copyright (c) 2011 [Emil Loer](http://emilloer.com).

Permission  is  hereby granted, free of charge, to any person obtaining a copy of  this  software  and  associated  documentation files  (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is  furnished to do so, subject to the following conditions:

The  above  copyright  notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF  ANY  KIND, EXPRESS  OR  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE  AND  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER  IN  AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN  THE SOFTWARE.
