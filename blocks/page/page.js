var swot = {
    
    dom: {},

    init: function() {

        dom.page = $('%page');

        this.monitor();
        this.button.init();
        return swot.next('home', this.groups.load());
    },

    add: function(words) {

        this.settings.groups = this.settings.groups || [];
        this.settings.groups.push(words);
    },

    transitionDur: 0,

    monitor: function() {

        this.transitionDur = this.getTransitionDur(this.dom.page);

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
                        return swot.next(hash, task.html, task.callback);

                    case 'result':
                        return swot.next('result', swot.result.show());
                }
            }
        });
    },

    getTransitionDur: function(elem) {
        return parseFloat(elem.css('transition-duration')) * 1000;
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

            if(displayIndex >= 0) {
                
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

        this.dom.page.append(html);
        this.changeDisplay();

        if(callback !== undefined) {
            callback.call(this);
        }
    },

    changeDisplay: function(stackLen, callback) {
        
        stackLen = stackLen || this.stack.length;

        this.dom.page.css('margin-left', -100 * (stackLen - 1) + '%');

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
            this.dom.page.css('width', stackLen * 100 + '%');
            $('%page(display)').css('width', 100 / stackLen + '%');
        }
        
        return stackLen;
    }
};

$(function() {
    swot.init();
});