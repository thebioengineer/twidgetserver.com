function twidgetServerLoad() {
	var apiURL = getAllUrlParams();
	// var apiURL = getGithubAPI(inputURL);
	alert(apiURL);
}


function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var input_url = window.location.search.substring(1);
  return input_url;
}

function getGithubAPI(url){
	var ghUrl = url.replace("^(https?):\/\/(raw)*(\.)*github(?:usercontent)?\.com\/([^\/]+\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)", "\1://raw.githack.com/\4/\5");
	var ghAPI = ghUrl.replace("^(\w+:\/\/(raw).githack.com\/([^\/]+)\/([^\/]+))\/([^\/]+)\/([^\/]+)\/(.*)",
                 'https://api.github.com/repos/\3/\4/git/refs/heads/\6');
	return ghAPI;
}