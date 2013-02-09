swot.words = {

    show: function(i) {

        var groupInfo = swot.settings.groups[i],
            words = groupInfo.words,
            groupArray = [];

        for(word in words) {
            groupArray.push({
                en_small: word.toLowerCase().replace(/\s+/g, ''),
                en: word,
                ru: (typeof words[word] == 'string') ? words[word] : words[word].join(', ')
            });
        }
        
        return $('#words').tmpl({
            task: i,
            group: groupInfo.name.toLowerCase(),
            words: groupArray
        });
    }
};