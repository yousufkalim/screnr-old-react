let baseUrl = "";
let url = "";
if (window.location.host === "screnrhealth.com") {
  baseUrl = "https://api.screnrhealth.com/api";
  url = "https://api.screnrhealth.com/";
} else if (window.location.host === "screnr-ui.web.app") {
  baseUrl = "https://screnr.falconit.com.pk/api";
  url = "https://screnr.falconit.com.pk/";
} else {
  baseUrl = "http://localhost:5000/api";
  url = "http://localhost:5000/";
}

module.exports = { baseUrl };
