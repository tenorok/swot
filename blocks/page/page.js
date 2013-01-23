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

                var hashInfo = hash.split('-');

                switch(hashInfo[0]) {

                    case 'prev':
                        return swot.prev();

                    case 'list':
                        return swot.next(hash, swot.groups.load());
                }
                
                var task = swot.genTask(swot.settings.groups[hash].words);
                console.log(task);   
            }
        });
    },

    // Массив экранов
    stack: [],

    prev: function() {

        if(this.stack.length > 1) {

            this.stack.pop();
            $('%page(display):last').remove();
            this.calcWidth();
        }
    },

    next: function(name, html) {
        
        this.stack.push({
            name: name,
            html: html
        });

        $('%page').append(html);
        this.calcWidth();
    },

    calcWidth: function() {
        
        var stackLen = this.stack.length;

        $('%page').css('width', stackLen * 100 + '%');
        $('%page(display)').css('width', 100 / stackLen + '%');
        $('%page').css('margin-left', -100 * (stackLen - 1) + '%');
        
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
                    type: getRandomVal(types)
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