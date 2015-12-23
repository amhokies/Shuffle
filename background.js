
var rule = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { hostEquals: 'www.hulu.com' },
        }),
        new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { hostEquals: 'www.netflix.com' }
        })
    ],

    actions: [ new chrome.declarativeContent.ShowPageAction() ]
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([rule]);
    });
});
