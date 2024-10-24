function enableDownloadAndPrint() {
  const iframe = document.querySelector(".viewer__file--active");
  if (iframe && iframe.src.includes("canDownload=0")) {
    // Modify the iframe's URL to allow downloading
    iframe.src = iframe.src.replace("canDownload=0", "canDownload=1");

    // Wait for the iframe to load before triggering the print dialog
    iframe.onload = () => {
      window.print(); // This will open the print dialog (CMD + P)
    };
  }
}
