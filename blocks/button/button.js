swot.button = {

    init: function() {

        $('body').on('click', '%button{back}', function() {
            swot.prev();
        });
    }
};