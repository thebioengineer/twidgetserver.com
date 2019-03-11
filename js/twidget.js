function onTwidgetServerLoad() {
	var cdn_url = getCDNurl()
	return cdn_url;
}

function getCDNurl(){
	var returnURL = window.location.href;
	var inputURL = getAllUrlParams();
	if (inputURL!=""){
		returnURL = getCDN(inputURL);
	}
	return returnURL;
}

function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var input_url = window.location.search.substring(1);
  return input_url;
}

function getCDN(url){
	cdnurl = '';
	var ghUrl = url.replace(/^(https?):\/\/(raw.)?github(?:usercontent)?\.com\/([^\/]+\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,'$1://raw.githack.com/$3/$4');
	var matches = ghUrl.match(/^(\w+:\/\/(raw).githack.com\/([^\/]+)\/([^\/]+))\/([^\/]+)\/([^\/]+)\/(.*)/i);
	let apiUrl = `https://api.github.com/repos/${matches[3]}/${matches[4]}/git/refs/heads/${matches[6]}`;
	fetch(apiUrl).then(res => { if (res.ok) return res.json(); }).then(data => {
              sha = data.object.sha ;
			  cdnurl = cdnize(`${matches[1]}/${sha}/${matches[7]}`);
			  updatePage(cdnurl);
            });
	cdnurl = returnCDNurl();
	return cdnurl;
}

function cdnize(url) {
    return url.replace(/^(\w+):\/\/(\w+)/, "$1://$2cdn");
}

function updatePage(url){
	updateMetaTags(url);
    createIframe(url);
	alert(url);
}

function createIframe(url){
	var node = document.createElement("iframe");                 // Create an <iframe> node
	node.setAttribute("src", url);
	node.setAttribute("class", "widgetContainer");

	document.getElementById("iframe-container").appendChild(node);     // Append <iframe> to <div> with id="iframe-container"
}

function updateMetaTags(url){
	createMetaTag("twitter:card","player");
	createMetaTag("twitter:title", "Twidget served by twidgetserver.com");
	createMetaTag("twitter:description", "Click start the Twidget");
	createMetaTag("twitter:player", url);
	createMetaTag("twitter:player:width", "600");
	createMetaTag("twitter:player:height", "450");
	createMetaTag("twitter:image", "http://www.edu.uwo.ca/img/click_to_play.png");		
}

function createMetaTag(property,value){
	var node = document.createElement("meta");
	node.setAttribute("name",property);
	node.setAttribute("content",value);
	document.getElementsByTagName('head')[0].appendChild( node ); // Append <meta> to <head>
}