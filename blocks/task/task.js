swot.task = {

    show: function(group) {
        
        var task = swot.task.genTask(swot.settings.groups[group].words),

        html = $('#task').tmpl({
            count: task.length,
            tasks: task
        });

        return {
            html: html,
            callback: function() {
                this.slider.init();
            }
        };
    },

    genTask: function(words) {

        var set  = swot.settings,
            task = [],
            langs = getIncludedVals(['enru', 'ruen']),
            types = getIncludedVals(['write', 'test']),
            planeWords = {
                en: [],
                ru: []
            },
            lang,
            question,
            translation;

        for(var i = 0; i < set.loop; i++) {
            for(word in words) {

                if(i === 0) {
                    planeWords.en.push(word);
                    planeWords.ru.push(words[word]);
                }

                lang = getRandomVal(langs);

                switch(lang) {
                    case 'enru':
                        question = word;
                        translation = words[word];
                        break;
                    case 'ruen':
                        question = words[word];
                        translation = word;
                        break;
                }

                task.push({
                    en: word,
                    ru: words[word],
                    question: question,
                    translation: translation,
                    lang: lang,
                    type: getRandomVal(types),
                    img: chanceShowImage(word)
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

        function chanceShowImage(word) {
            if(Math.round(Math.random() * 100) < swot.settings.image) {
                return word.toLowerCase().replace(/\s+/g, '');
            }
            else {
                return false;
            }
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