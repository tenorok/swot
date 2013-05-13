swot.slider = {

    transitionDur: 0,
    
    init: function() {
        
        this.width = $('%slider(item)').width();
        this.transitionDur = swot.getTransitionDur($('%slider(wrap)'));

        $('%slider(wrap)').css({
            'width': $('%slider(item)').length * this.width + 'px'
        });
    },

    prev: function(callback) {
        return this.slide(-1, callback);
    },

    next: function(callback) {
        return this.slide(1, callback);
    },

    slide: function(direction, callback) {
        var currentMargin = parseInt($('%slider(wrap)').css('margin-left')),
            currentElem = Math.abs(currentMargin / this.width);

        $('%slider(wrap)').css({
            'margin-left': -(currentElem + direction) * 100 + '%'
        });

        setTimeout(callback, this.transitionDur);

        return currentElem;
    }
};