.DEFAULT_GOAL :=

BORSCHIK := ./node_modules/.bin/borschik

all::
	borschik -t js -i js/.borschik -o js/common.js -m no
	borschik -t css -i css/.borschik -o css/common.css

.PHONY: install
install::
	npm install borschik