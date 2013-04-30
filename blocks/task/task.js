swot.task = {

    task: null,

    result: {},
    
    show: function(group) {

        var groupInfo = swot.settings.groups[group];

        this.task = swot.task.genTask(groupInfo.words);
        this.result = {
            right: 0,
            wrong: 0
        };

        return {
            html: $('#task').tmpl({
                count: this.task.length,
                group: groupInfo.name.toLowerCase(),
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

        if(checkAnswer()) {

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

        function checkAnswer() {

            if(typeof translation == 'string') {
                return identicalWord(translation) == identicalWord(answer);
            }
            else {
                for(var t = 0, len = translation.length; t < len; t++) {
                    if(identicalWord(translation[t]) == identicalWord(answer)) {
                        return true;
                    }
                }
                return false;
            }

            function identicalWord(word) {
                return word.toLowerCase().replace('ё', 'е');
            }
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
            for(var word in words) {

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
                        question = getStringVal(words[word]);
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
                    lang  = lang.slice(2),
                    randomVal;

                for(var i = 0; i < count - 1; i++) {
                    items.push(getStringVal(getRandomVal(words[lang])));
                }

                items.splice(Math.floor(Math.random() * count), 0, getStringVal(answer[lang]));

                return items;
            }
        }

        function getStringVal(val) {
            return (typeof val == 'string') ? val : val[0];
        }
    }
};