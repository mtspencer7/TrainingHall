(function waitForDS() {
    console.log('Inject script running');

    try {
        // Delay slightly to ensure the iframe content is fully loaded before looking for DS
        setTimeout(() => {
            // First, check if DS exists in the current iframe context
            if (typeof DS !== 'undefined' && DS.arrDPs && DS.arrDPs.length > 0) {
                console.log('DS object found in current iframe.');

                // Access the report name from the DS object
                const reportName = DS.arrDPs[0].name;
                console.log('Report name extracted:', reportName);

                // Send the report name back to the content script
                window.parent.postMessage({
                    type: 'FROM_PAGE',
                    reportName: reportName
                }, '*');

            } else {
                console.warn('DS object not found in current iframe, looking for nested iframe...');

                // If DS doesn't exist, try to find the nested iframe
                const nestedIframe = document.getElementById('webiViewFrame'); // Adjust ID as needed

                if (nestedIframe) {
                    console.log('Nested iframe found:', nestedIframe);

                    // Access the window object of the nested iframe
                    const nestedWindow = nestedIframe.contentWindow;

                    // Check if DS exists in the nested iframe's window object
                    if (nestedWindow.DS && nestedWindow.DS.arrDPs && nestedWindow.DS.arrDPs.length > 0) {
                        console.log('DS object found in nested iframe.');

                        // Access the report name from the DS object
                        const reportName = nestedWindow.DS.arrDPs[0].name;

                        console.log('Report name extracted:', reportName);

                        // Send the report name back to the content script
                        window.parent.postMessage({
                            type: 'FROM_PAGE',
                            reportName: reportName
                        }, '*');
                    } else {
                        console.warn('DS object not found in nested iframe');
                        //setTimeout(waitForDS, 2000);  // Retry every 2000ms to allow more time for iframe loading
                    }
                } else {
                    console.warn('Nested iframe not found');
                    //setTimeout(waitForDS, 2000);  // Retry every 2000ms to allow more time for iframe loading
                }
            }
        }, 1500); // Delay by 1500ms before checking for DS
    } catch (e) {
        console.error('Error accessing DS or iframe content:', e);
        //setTimeout(waitForDS, 2000);  // Retry if access fails due to timing or security
    }
})();
