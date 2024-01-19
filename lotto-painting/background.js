chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['thirdParty/jquery-3.7.1.min.js','content.js']
  });
});

const LOTTO_RESULTS = 'https://www.lotto.pl/lotto/wyniki-i-wygrane';

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  //włącza sidePanel
  if (LOTTO_RESULTS === url.origin) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true
    });
  } else {
    // wyłącza sidePanel
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});