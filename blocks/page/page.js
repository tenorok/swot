var swot = {
    
    init: function() {
        
        this.monitor();
        this.button.init();
        return swot.next('home', this.groups.load());
    },

    monitor: function() {

        $(window).bind('hashchange', function() {
            
            var hash = location.hash.slice(1);

            if(hash && hash !== '') {

                var hashInfo = hash.split('-'),
                    hashName = hashInfo.slice(1).join('-');

                switch(hashInfo[0]) {

                    case 'prev':
                        return swot.prev(hashName);

                    case 'words':
                        return swot.next(hash, swot.words.show(hashName));

                    case 'task':
                        var task = swot.task.show(hashName);
                        swot.next(hash, task.html, task.callback);
                        return;
                }
            }
        });
    },

    // Массив экранов
    stack: [],

    prev: function(name) {

        if(this.stack.length < 2)
            return;

        if(name !== undefined) {

            var displayIndex = null;
            
            this.stack.every(function(e, i) {
                if(e.name === name) {
                    displayIndex = i;
                    return false;
                }
                return true;
            });

            if(displayIndex) {
                
                this.changeDisplay(displayIndex + 1, function() {
                    for(var d = swot.stack.length; d > displayIndex + 1; d--) {
                        removeLastDisplay();
                    }
                });

                return;
            }
        }

        function removeLastDisplay() {
            swot.stack.pop();
            $('%page(display):last').remove();
        }

        // Если имя не задано или оно не нашлось
        this.changeDisplay(swot.stack.length - 1, removeLastDisplay);
    },

    next: function(name, html, callback) {
        
        this.stack.push({
            name: name,
            html: html
        });

        $('%page').append(html);
        this.changeDisplay();

        if(callback !== undefined) {
            callback.call(this);
        }
    },

    changeDisplay: function(stackLen, callback) {
        
        stackLen = stackLen || this.stack.length;

        $('%page').css('margin-left', -100 * (stackLen - 1) + '%');

        var that = this;

        if(callback !== undefined) {
            setTimeout(function() {
                callback.call(that);
                calcPageWidth();
            }, 800);
        }
        else {
            calcPageWidth();
        }

        function calcPageWidth() {
            $('%page').css('width', stackLen * 100 + '%');
            $('%page(display)').css('width', 100 / stackLen + '%');
        }
        
        return stackLen;
    }
};

$(function() {
    swot.init();
});