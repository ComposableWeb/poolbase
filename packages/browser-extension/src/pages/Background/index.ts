import '@poolbase/common/src/logger';
import i18next, { defaultOptions } from '../../common/i18n';
defaultOptions.ns = [...defaultOptions.ns, 'browser-ext-background'];
i18next.init(defaultOptions).then((t) => {
  console.info(t('siteTitle'));
});

let _on = false; // extension isn't on
let _popupOpen = false; // popup isn't open
const disable = (tab) => {
  chrome.browserAction.setBadgeText({ text: '', tabId: tab.id });
};
const enable = (tab) => {
  chrome.browserAction.setBadgeText({ text: 'ON', tabId: tab.id });
  chrome.browserAction.setBadgeBackgroundColor({ color: 'crimson' });
};

chrome.browserAction.onClicked.addListener((tab) => {
  _on ? disable(tab) : enable(tab);
  _on = !_on;
  _popupOpen = !_popupOpen;
  console.info(tab, 'hello');
  _popupOpen && chrome.browserAction.setPopup({ popup: 'popup.html' });
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  // chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  //   const activeTab = tabs[0];
  //   const response = await addUrl(activeTab.url, activeTab.title);
  //   console.log(response);
  //   chrome.tabs.sendMessage(activeTab.id, {
  //     message: 'clicked_browser_action',
  //   });
  // });
});
