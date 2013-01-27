swot.slider = {

    width: 600,
    
    init: function() {
        $('%slider(wrap)').css({
            'width': $('%slider(item)').length * this.width + 'px'
        });
    },

    prev: function() {
        return this.slide(-1);
    },

    next: function() {
        return this.slide(1);
    },

    slide: function(direction) {
        var currentMargin = parseInt($('%slider(wrap)').css('margin-left')),
            currentElem = Math.abs(currentMargin / this.width);

        $('%slider(wrap)').css({
            'margin-left': -(currentElem + direction) * 100 + '%'
        });

        return currentElem;
    }
};