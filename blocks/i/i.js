swot.i = {

    isDevice: function(device) {

        return (navigator.platform.toLowerCase().search(device.toLowerCase()) >= 0) ? true : false;
    }
};