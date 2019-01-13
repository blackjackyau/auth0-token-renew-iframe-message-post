# Iframe Message Post: Auth0 Renew Token Case Study

## Motive
To understand how auth0 perform renew token on Implicit Grant without the CORS handshake

## Pre condition
No X-Frame-Options: SAMEORIGIN specified in the response header

## Description with Diagram

### Project flow
![alt text](iframe-message-post.png)

### Intepreted Auth0 renew token flow
![alt text](iframe-message-post-auth0.png)

### Sameple auth0 renew token response
```HTML
<!DOCTYPE html>
<html>

<head>
    <title>Authorization Response</title>
</head>

<body>
    <script type="text/javascript">
        (function (window, document) {
            var targetOrigin = "http://localhost:4200";
            var webMessageRequest = {};
            var authorizationResponse = {
                type: "authorization_response",
                response: {
                    "access_token": "${ACCESS_TOKEN}",
                    "scope": "openid profile write:messages read:messages",
                    "expires_in": 7200,
                    "token_type": "Bearer",
                    "state": "${STATE_TOKEN}",
                    "id_token": "${ID_TOKEN}"
                }
            };
            var mainWin = (window.opener) ? window.opener : window.parent;
            if (webMessageRequest["web_message_uri"] && webMessageRequest["web_message_target"]) {
                window.addEventListener("message", function (evt) {
                    if (evt.origin != targetOrigin) return;
                    switch (evt.data.type) {
                        case "relay_response":
                            var messageTargetWindow = evt.source.frames[webMessageRequest["web_message_target"]];
                            if (messageTargetWindow) {
                                messageTargetWindow.postMessage(authorizationResponse, webMessageRequest["web_message_uri"]);
                                window.close();
                            }
                            break;
                    }
                });
                mainWin.postMessage({
                    type: "relay_request"
                }, targetOrigin);
            } else {
                mainWin.postMessage(authorizationResponse, targetOrigin);
            }
        })(this, this.document);
    </script>
</body>

</html>
```

## Reference
* this piece of code is copied from https://blog.teamtreehouse.com/cross-domain-messaging-with-postmessage
* move the receiver part to https://blackjackyau.github.io/post-message/receiver.html
* added message post back code from receiver to controller
