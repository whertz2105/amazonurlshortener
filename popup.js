function shortenAmazonUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith('amazon.com')) {
      const dpIndex = u.pathname.indexOf('/dp/');
      if (dpIndex !== -1) {
        const asin = u.pathname.substring(dpIndex + 4).split('/')[0];
        return `https://${u.hostname}/dp/${asin}`;
      }
    }
  } catch (e) {}
  return url;
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const tab = tabs[0];
    const shortened = shortenAmazonUrl(tab.url);
    const urlDiv = document.getElementById('url');
    urlDiv.textContent = shortened;
    document.getElementById('copy').addEventListener('click', () => {
      navigator.clipboard.writeText(shortened);
    });
  });
});
