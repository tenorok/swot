swot.groups = {

    load: function() {

        return $('#groups').tmpl({
            groups: swot.settings.groups
        });

        // swot.settings.forEach(function(e, i) {
            
        //     console.log(e.group);
        //     for(word in e.words) {
        //         console.log(word, e.words[word]);
        //     }
        // });
    }
};