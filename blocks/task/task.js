swot.task = {

    task: null,

    result: {},
    
    show: function(group) {

        this.task = swot.task.genTask(swot.settings.groups[group].words);
        this.result = {
            right: 0,
            wrong: 0
        };

        return {
            html: $('#task').tmpl({
                count: this.task.length,
                tasks: this.task
            }),
            callback: this.events
        };
    },

    events: function() {

        this.slider.init();
        swot.progress.change(1, this.task.task.length);

        $('%task(input)').keypress(function(e) {
            if(e.which === 13) {
                nextAndCheck.call(this, $(this).val());
            }
        });

        $('%task(test-link)').click(function() {
            nextAndCheck.call(this, $(this).text());
        });

        function nextAndCheck(answer) {
            
            var elem = swot.slider.next();
            
            setTimeout(function() {
                $('%task:eq(' + (elem + 1) + ')>%task(input)').focus();
            }, 800);
            
            swot.task.check(answer, swot.task.task[elem].translation, elem);
        }
    },

    check: function(answer, translation, index) {

        if(answer.toLowerCase() === translation.toLowerCase()) {
            this.result.right++;
            $('%points').prepend('<li class="points__item points__item_green">*</li>');
        }
        else {
            this.result.wrong++;
            $('%points').prepend('<li class="points__item points__item_red">*</li>');
        }

        if(!swot.progress.change(index + 2, swot.task.task.length)) {
            location.hash = 'result';
        }
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