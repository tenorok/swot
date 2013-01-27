swot.result = {

    show: function(count, right, wrong) {

        var count = swot.task.task.length,
            right = swot.task.result.right,
            wrong = swot.task.result.wrong,
            percents = this.calcPercents(count, right, wrong);
        
        return $('#result').tmpl({
            count: count,
            right: right,
            wrong: wrong,
            right_percent: percents.rightPercent,
            wrong_percent: percents.wrongPercent
        });
    },

    calcPercents: function(count, right, wrong) {
        
        return {
            rightPercent: (right * 100 / count).toFixed(2),
            wrongPercent: (wrong * 100 / count).toFixed(2)
        };
    }
};