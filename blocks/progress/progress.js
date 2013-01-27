swot.progress = {

    change: function(index, length) {

        if(index > length)
            return false;
        
        $('%progress(line)').css({
            width: index * 100 / length + '%'
        });

        $('%progress(current)').text(index);

        return true;
    }
};