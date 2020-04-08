let _on = false; // extension isn't on
const _react = 'asset-manifest.json'; // react manifest

const readTextFile = (file, callback) => {
  // file has to be in the root (/public)
  const rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('application/json');
  rawFile.open('GET', file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status === 200) {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
};
const disable = (tab) => {
  const code = `document.querySelector('#poolbase-chrome-extension').remove()`;

  chrome.tabs.executeScript(tab.id, { code: code });
  chrome.browserAction.setBadgeText({ text: '', tabId: tab.id });
};
const enable = (tab) => {
  // get the REACT manifest
  readTextFile(_react, function (text) {
    const _data = JSON.parse(text),
      _keys = Object.keys(_data.files),
      _js = [_data.files['main.js'], _data.files[_keys[3]], _data.files[_keys[5]]];
    console.info(_js);
    // inject all the JS files required
    _js.forEach((file) => {
      chrome.tabs.executeScript(tab.id, {
        file: file,
      });
    });
    // inject styles
    // chrome.tabs.insertCSS(tab.id, {
    //   	file: _data.files['main.css']
    // });

    // badge
    chrome.browserAction.setBadgeText({ text: 'ON', tabId: tab.id });
    chrome.browserAction.setBadgeBackgroundColor({ color: 'crimson' });
  });
};

const addUrl = async (url, title) => {
  return await Promise.resolve('lala');
};

// extension clicked on/off
chrome.browserAction.onClicked.addListener((tab) => {
  _on ? disable(tab) : enable(tab);
  _on = !_on;
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    const activeTab = tabs[0];
    const response = await addUrl(activeTab.url, activeTab.title);
    console.log(response);
    chrome.tabs.sendMessage(activeTab.id, {
      message: 'clicked_browser_action',
    });
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse({ message: Math.floor(Math.random() * 10 + 1) });
  return true;
});
