document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("downloadBtn");

  // Check if the iframe is present and update the button state
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        function: checkIframe,
      },
      (results) => {
        if (results[0].result) {
          downloadBtn.disabled = false;
        }
      }
    );
  });

  // When the button is clicked, update the iframe URL and trigger print
  downloadBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: enableDownloadAndPrint,
      });
    });
  });
});

// Function that checks if the iframe with the given attributes is present
function checkIframe() {
  const iframe = document.querySelector(".viewer__file--active");
  return iframe && iframe.src.includes("canDownload=0");
}

// Function that modifies the iframe URL and triggers print (this needs to be available in the same context)
function enableDownloadAndPrint() {
  const iframe = document.querySelector(".viewer__file--active");
  if (iframe && iframe.src.includes("canDownload=0")) {
    // Modify the iframe's URL to allow downloading
    iframe.src = iframe.src.replace("canDownload=0", "canDownload=1");

    // Wait for the iframe to load before triggering the print dialog
    iframe.onload = () => {
      //wait for 1.5 seconds before printing
      setTimeout(() => {
        //press btton with id print in iframe
        iframe.contentDocument.getElementById("print").click();
      }, 1500);
    };
  }
}
