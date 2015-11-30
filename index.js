var crypto = require('crypto');

var _voxrtc = {
  username: '',
  secret: '',
  expires: ''
};

var Voxbone = function(opts) {
  _voxrtc.username = opts.voxrtcUsername;
  _voxrtc.secret = opts.voxrtcSecret;
  _voxrtc.expires = opts.voxrtcExpiresInSeconds;
};

Voxbone.prototype = {
    //Delivery Report constructor that passes parameters to the http sendSMSRequest request
   generate: function(){

    var cleanHmacDigest = function (hmac) {
        while ((hmac.length % 4 != 0)) {
            hmac += '=';
        }
        hmac = hmac.replace('/ /g', '+');
        return hmac;
    };

    var username = _voxrtc.username;
    var secret = _voxrtc.secret;
    var hmac = crypto.createHmac('sha1', secret);
    var expires_in_seconds = _voxrtc.expires || 300;
    var expires = Math.round(Date.now()/1000) + expires_in_seconds;
    var text = expires + ':' + username;
    hmac.update(text);
    var key = cleanHmacDigest(hmac.digest('base64'));
    return '{ key: \'' + key + '\', expires: ' + expires + ', username: \'' + username + '\'}';
}

};


module.exports = Voxbone;
