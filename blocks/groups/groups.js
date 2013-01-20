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