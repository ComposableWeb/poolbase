async function savePage(url: string, title: string) {
  return fetch('https://us-central1-poolbase-123.cloudfunctions.net/savePage', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      title,
    }),
  }).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

chrome.browserAction.onClicked.addListener(function(tab): void {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    const activeTab = tabs[0];
    const response = await savePage(activeTab.url, activeTab.title);
    console.log(response);
    chrome.tabs.sendMessage(activeTab.id, {
      message: 'clicked_browser_action',
    });
  });
});
