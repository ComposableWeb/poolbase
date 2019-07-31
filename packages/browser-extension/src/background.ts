chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, async function(
    tabs
  ) {
    const activeTab = tabs[0];
    const response = await savePage(activeTab.url, activeTab.title);
    console.log(response);
    chrome.tabs.sendMessage(activeTab.id, {
      message: 'clicked_browser_action',
    });
  });
});

async function savePage<T>(url: string, title: string): Promise<T> {
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
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}
