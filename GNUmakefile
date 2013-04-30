.DEFAULT_GOAL :=

.PHONY: production
production::
	rm -rf production
	mkdir -p production/common
	cp common/common.css production/common/common.css
	cp common/common.js production/common/common.js
	cp -r words/ production/words/
	cp -r lib/ production/lib/
	cp index.html production/index.html
	cp settings.js production/settings.js