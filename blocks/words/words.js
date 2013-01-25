swot.words = {

    show: function(i) {

        var words = swot.settings.groups[i].words,
            groupArray = [];

        for(word in words) {
            groupArray.push({
                en_small: word.toLowerCase().replace(/\s+/g, ''),
                en: word,
                ru: words[word]
            });
        }
        
        return $('#words').tmpl({
            task: i,
            words: groupArray
        });
    }
};