all: src

test: all
	vows --spec

clean:
	rm lib/*.js

src:
	pegjs src/parser.pegjs lib/parser.js
	coffee -c -o lib src

.PHONY: clean test src
