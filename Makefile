all: src

test: all
	vows --spec

clean:
	rm lib/core.js
	rm lib/mnml.js
	rm lib/filehandling.js
	rm lib/parser.js
	rm browser/mnml.js
	rm browser/mnml.min.js

src:
	pegjs src/parser.pegjs lib/parser.js
	sed -i '' "s/module.exports/if (typeof module === \"undefined\") { var mnml = this.mnml = {}; } else { var mnml = module.exports; } mnml.parser/" lib/parser.js
	coffee -c -o lib src
	cat lib/parser.js lib/core.js > browser/mnml.js
	uglifyjs browser/mnml.js > browser/mnml.min.js

.PHONY: clean test src
