console.log("gapi code ran");
      function authenticate() {
        return gapi.auth2.getAuthInstance()
          .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
          .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
      }
      function loadClient() {
        gapi.client.setApiKey("");
        return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
          .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
      }
      // Make sure the client is loaded and sign-in is complete before calling this method.
      function ytsearch(searchterm) {
        console.log(searchterm);
        return gapi.client.youtube.search.list({
          "part": "snippet",
          "maxResults": 1,
          "type":"video",
          "q": searchterm
        })
          .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
            console.log("video id:", response.result.items[0].id.videoId);
          },
            function (err) { console.error("Execute error", err); });
      }
      
      gapi.load("client:auth2", function () {
        gapi.auth2.init({ client_id: "63394597738-aphgmefnm649json040n8agi4p7bbsqe.apps.googleusercontent.com" });
      });