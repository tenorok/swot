var swot = {
    
    init: function() {
        
        this.monitor();
        this.groups.load();
        this.back.init();
    },

    monitor: function() {

        $(window).bind('hashchange', function() {
            
            var hash = location.hash.slice(1);

            if(hash && hash !== '') {

                var task = swot.genTask(swot.settings.groups[hash].words);

                console.log(task);

                $('.page').bemSetMod('position', 'right');
            }
        });
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
swot.groups = {

    load: function() {

        var that = this;

        $('#groups').tmpl({
            groups: swot.settings.groups
        }).appendTo('.page__left');

        // swot.settings.forEach(function(e, i) {
            
        //     console.log(e.group);
        //     for(word in e.words) {
        //         console.log(word, e.words[word]);
        //     }
        // });
    }
};
swot.back = {

    init: function() {

        $('%back').click(function() {
            $('%page').bemDelMod('position');
        });
    }
}