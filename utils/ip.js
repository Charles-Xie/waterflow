var os = require('os');

module.exports = function() {
    var IPv4, hostName;

    hostName = os.hostname();
    for (var i = 0; i < os.networkInterfaces()['Wi-Fi'].length; i++) {
        if (os.networkInterfaces()['Wi-Fi'][i].family == 'IPv4') {
            IPv4 = os.networkInterfaces()['Wi-Fi'][i].address;
        }
    }
    // console.log('-----------local IP: ' + IPv4 + '-----------');

    this.getAddress = function() {
        return IPv4;
    };

    this.getHostName = function() {
        return hostName;
    };
}
