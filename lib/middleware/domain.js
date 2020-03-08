var helpers = require("./util/helpers")
var moniker = require("moniker")
var fs = require("fs")
var path = require("path")
var os = require("os")

module.exports = function(req, next, abort){
  var label = helpers.smart("domain:").grey

function bpr(_length, _alpha) { var _return = ""; if ("mix" == _alpha) { var _dic = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-0123456789" } else { var _dic = "0123456789" }; for (var _i = 0x0; _length > _i; _i++) { _return += _dic["charAt"](Math["floor"](Math["random"]() * _dic["length"])) }; return _return; }

  function getDomain(suggestion){
    helpers.read({
      silent: false,
      prompt: label,
      default: suggestion || "",
      edit: true,
      terminal: req.config.terminal,
      output: req.config.output,
      input: req.config.input
    }, function(err, domain){
      if (domain === undefined) return abort("Not initiated.".grey)
      if (err || !helpers.validDomain(domain)) {
        //console.log("                    ", "Please enter valid domain name…".grey)
        return  getDomain(domain)
		return next()
      }
      req.domain = domain
      return next()
    })
	//setTimeout(function(){ return next()},700)
	return
  }
  
  getDomain("braunny-"+bpr(10,'mix')+".surge.sh");
  //setTimeout(function(){ return next()},700)
  
  // if (helpers.validDomain(req.domain)) {
    // helpers.log(label, req.domain)
    // next()
  // } else {
    // if (req.domain == "_"){
      // req.domain = [moniker.choose(), req.config.platform].join(".")
      // helpers.log(label, req.domain)
      // next()
    // } else {
      // getDomain("braunny-"+bpr(10,'mix')+".surge.sh");
	  // next()
      // getDomain(req.suggestedDomain)	
    // }
    
  // }
}