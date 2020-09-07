const addUrl = async (url, title) => {
  return await Promise.resolve('lala');
};

// extension clicked on/off

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse({ message: Math.floor(Math.random() * 10 + 1) });
  return true;
});
