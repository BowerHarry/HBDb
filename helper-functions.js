const liveService = false;

const wsURLRoot = liveService ? "https://hbdb-1459b.nw.r.appspot.com" : "http://localhost:8080";

export function wsURL(address) {
  return wsURLRoot + address
}

export function params(json) {
  var params = new URLSearchParams();
  for (const key in json) {
    params.append(key, json[key]);
  }
  return params
}

function setNativeValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    let event = new Event("input", { target: element, bubbles: true });
    // React 16
    let tracker = element._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
}

function clearSearchBar() {
  var input = document.getElementById("search-bar");
  setNativeValue(input, "");
}

export async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);                    

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export class user {
  username;
  tmdbAPIKey;
  googleAPIKey;
  mdblistAPIKey;
  scrapenetworkAPIKey;

  constructor(json) {
      this.username = json.username;
      this.tmdbAPIKey = json.tmdbAPIKey;
      this.googleAPIKey = json.googleAPIKey;
      this.mdblistAPIKey = json.mdblistAPIKey;
      this.scrapenetworkAPIKey = json.scrapenetworkAPIKey;
  }
}