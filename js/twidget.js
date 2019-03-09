function twidgetServerLoad() {
	var inputURL = getAllUrlParams();
	var apiURL = getGithubAPI(inputURL);
	alert(apiURL);
}


function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var input_url = window.location.search.substring(1);
  return input_url;
}

function getGithubAPI(url){
	var ghUrl = url.replace("^(https?):\/\/(raw)*(\.)*github(?:usercontent)?\.com\/([^\/]+\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)", "\1://raw.githack.com/\4/\5");
	var matches = ghUrl.match("/^(\w+:\/\/(raw).githack.com\/([^\/]+)\/([^\/]+))\/([^\/]+)\/(.*)/i");
	
	let apiUrl = `https://api.github.com/repos/${matches[3]}/${matches[4]}/git/refs/heads/${matches[5]}`;

	return apiUrl;
}