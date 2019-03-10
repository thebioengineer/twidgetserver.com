function twidgetServerLoad() {
	var cdn_url = getCDNurl()
	alert(cdn_url);
}

function getCDNurl(){
	var inputURL = getAllUrlParams();
	var apiURL = getCDN(inputURL);
	var sha 
}

function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var input_url = window.location.search.substring(1);
  return input_url;
}

function getCDN(url){
	var ghUrl = url.replace(/^(https?):\/\/(raw.)?github(?:usercontent)?\.com\/([^\/]+\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,'$1://raw.githack.com/$3/$4');
	var matches = ghUrl.match(/^(\w+:\/\/(raw).githack.com\/([^\/]+)\/([^\/]+))\/([^\/]+)\/([^\/]+)\/(.*)/i);
	let apiUrl = `https://api.github.com/repos/${matches[3]}/${matches[4]}/git/refs/heads/${matches[6]}`;
	var sha = getSHA(apiUrl,matches[7]);
	var cdnurl = cdnize(`${matches[1]}/${sha}/${matches[7]}`);
	return cdnurl;
}

function getSHA(apiURL,match){
	var sha = '';
	fetch(apiURL)
            .then(res => { if (res.ok) return res.json(); })
            .then(data => {
              sha = data && data.object && data.object.sha ? data.object.sha : match;
            });
	return sha;
}

function cdnize(url) {
    return url.replace(/^(\w+):\/\/(\w+)/, "$1://$2cdn");
}