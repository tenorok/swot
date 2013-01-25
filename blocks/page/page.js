var swot = {
    
    init: function() {
        
        this.monitor();
        this.button.init();
        return swot.next('home', this.groups.load());
    },

    monitor: function() {

        $(window).bind('hashchange', function() {
            
            var hash = location.hash.slice(1);

            if(hash && hash !== '') {

                var hashInfo = hash.split('-'),
                    hashName = hashInfo.slice(1).join('-');

                switch(hashInfo[0]) {

                    case 'prev':
                        return swot.prev(hashName);

                    case 'words':
                        return swot.next(hash, swot.words.show(hashName));

                    case 'task':
                        var task = swot.genTask(swot.settings.groups[hashName].words);
                        console.log(task);
                        break;
                }
            }
        });
    },

    // Массив экранов
    stack: [],

    prev: function(name) {

        if(this.stack.length < 2)
            return;

        if(name !== undefined) {

            var displayIndex = null;
            
            this.stack.every(function(e, i) {
                if(e.name === name) {
                    displayIndex = i;
                    return false;
                }
                return true;
            });

            if(displayIndex) {
                
                this.changeDisplay(displayIndex + 1, function() {
                    for(var d = swot.stack.length; d > displayIndex + 1; d--) {
                        removeLastDisplay();
                    }
                });

                return;
            }
        }

        function removeLastDisplay() {
            swot.stack.pop();
            $('%page(display):last').remove();
        }

        // Если имя не задано или оно не нашлось
        this.changeDisplay(swot.stack.length - 1, removeLastDisplay);
    },

    next: function(name, html) {
        
        this.stack.push({
            name: name,
            html: html
        });

        $('%page').append(html);
        this.changeDisplay();
    },

    changeDisplay: function(stackLen, callback) {
        
        stackLen = stackLen || this.stack.length;

        $('%page').css('margin-left', -100 * (stackLen - 1) + '%');

        if(callback !== undefined) {
            setTimeout(function() {
                callback();
                calcPageWidth();
            }, 800);
        }
        else {
            calcPageWidth();
        }

        function calcPageWidth() {
            $('%page').css('width', stackLen * 100 + '%');
            $('%page(display)').css('width', 100 / stackLen + '%');
        }
        
        return stackLen;
    },

    genTask: function(words) {

        var set  = swot.settings,
            task = [],
            langs = getIncludedVals(['enru', 'ruen']),
            types = getIncludedVals(['write', 'test']),
            planeWords = {
                en: [],
                ru: []
            };

        for(var i = 0; i < set.loop; i++) {
            for(word in words) {

                if(i === 0) {
                    planeWords.en.push(word);
                    planeWords.ru.push(words[word]);
                }

                task.push({
                    en: word,
                    ru: words[word],
                    lang: getRandomVal(langs),
                    type: getRandomVal(types),
                    img: chanceShowImage()
                });
            }
        }

        if(swot.settings.random) {
            task = task.sort(function() {
                return Math.random() - 0.5;
            });
        }

        return genTestItems(task, planeWords);

        function getIncludedVals(vals) {

            var included = [];

            vals.forEach(function(e) {
                if(swot.settings[e]) {
                    included.push(e);
                }
            });

            return included;
        }

        function getRandomVal(vals) {
            return vals[Math.floor(Math.random() * vals.length)];
        }

        function chanceShowImage() {
            return Math.round(Math.random() * 100) < swot.settings.image;
        }

        function genTestItems(task, words) {
            
            task.forEach(function(e) {
                if(e.type === 'test') {
                    e.items = getItems(e.lang, {
                        en: e.en,
                        ru: e.ru
                    });
                }
            });

            return task;
            
            function getItems(lang, answer) {

                var items = [],
                    count = swot.settings.testItems,
                    lang  = lang.slice(2);

                for(var i = 0; i < count - 1; i++) {
                    items.push(getRandomVal(words[lang]));
                }

                items.splice(Math.floor(Math.random() * count), 0, answer[lang]);

                return items;
            }
        }
    }
};

$(function() {
    swot.init();
});