chrome.action.onClicked.addListener((tab) => {
  //chrome.runtime.reload();	//powinno załadować od nowa wszystko, łącznie z jQuery
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['thirdParty/jquery-3.7.1.min.js',  'content.js']
  });
});
//'service-worker-side-panel',