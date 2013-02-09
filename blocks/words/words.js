swot.words = {

    show: function(i) {

        var groupInfo = swot.settings.groups[i],
            words = groupInfo.words,
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
            group: groupInfo.name.toLowerCase(),
            words: groupArray
        });
    }
};