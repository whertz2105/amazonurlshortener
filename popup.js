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
    document.getElementById('copy').addEventListener('click', e => {
      navigator.clipboard.writeText(shortened).then(() => {
        const popup = document.createElement('div');
        popup.textContent = 'Link copied';
        popup.className = 'copied-popup';
        popup.style.top = `${e.clientY - 20}px`;
        popup.style.left = `${e.clientX}px`;
        document.body.appendChild(popup);
        requestAnimationFrame(() => {
          popup.style.opacity = '1';
        });
        setTimeout(() => {
          popup.style.opacity = '0';
          popup.addEventListener('transitionend', () => popup.remove(), { once: true });
        }, 3000);
      });
    });
  });
});
