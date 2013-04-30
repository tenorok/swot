.DEFAULT_GOAL :=

BORSCHIK := ./node_modules/.bin/borschik
UGLIFYJS := ./node_modules/.bin/uglifyjs

all::
	$(BORSCHIK) -t js -i common/.js -o common/common.js -m no
	$(BORSCHIK) -t css -i common/.css -o common/common.css

.PHONY: install
install::
	npm install
	export PATH=./node_modules/.bin:$PATH
	make

.PHONY: production
production::
	rm -rf production
	mkdir -p production/common
	cp common/common.css production/common/common.css
	cp common/common.js production/common/common.js
	$(UGLIFYJS) -o production/common/common.js production/common/common.js
	cp -r words/ production/words/
	cp -r lib/ production/lib/
	cp index.html production/index.html
	cp settings.js production/settings.js