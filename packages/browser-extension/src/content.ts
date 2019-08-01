chrome.runtime.onMessage.addListener(function(request, sender, sendResponse): void {
  if (request.message === 'clicked_browser_action') {
    console.log(window.location);
  }
});
