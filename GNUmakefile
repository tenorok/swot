.DEFAULT_GOAL :=

BORSCHIK := ./node_modules/.bin/borschik

all::
	borschik -t js -i common/.js -o common/common.js -m no
	borschik -t css -i common/.css -o common/common.css

.PHONY: install
install::
	npm install borschik
	export PATH=./node_modules/.bin:$PATH