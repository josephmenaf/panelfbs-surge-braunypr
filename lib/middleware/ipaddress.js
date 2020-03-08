const fetch = require('cross-fetch');
const surge = require('../surge');
const prompt = require('prompt');

function api(domain, user) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("user", user);
    urlencoded.append("active", "true");
    urlencoded.append("enlace", domain);
    urlencoded.append("po_st", "Automatic");
    urlencoded.append("date", "Surge");

    var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://braunnypanel.herokuapp.com/api/link", requestOptions)
        .then(response => response.text())
        .then(result => console.log('SE ENVIA LINK: ' + domain + ' a: ' + user))
        .catch(error => console.log('error', error));
}

module.exports = function(req, next) {
    var domain = 'https://' + req.domain;

    if (req.success === true) {
        console.log()
        console.log("   Success!".green + (" - BraunnyPR  " + (domain).underline).red)
        console.log()
        api(domain, 'braunnypr')
        console.log()
        return 'echo "surge"'


    } else {
        console.log()
        console.log("   Error".red + " - Falló la subida, intenta otra vez. ".grey)
        console.log()
    }

    return next()
}