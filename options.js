document.addEventListener("DOMContentLoaded", () => {
    const addHostButton = document.getElementById("addHost");
    const input = document.getElementById("hostInput");
    const list = document.getElementById("hostList");

    if (!addHostButton || !input || !list) {
        console.warn("[IR35 Highlighter] Missing one or more UI elements: addHost, hostInput, or hostList.");
        return;
    }

    // Load existing allowed hosts and populate the list
    chrome.storage.local.get({ allowedHosts: [] }, (data) => {
        const allowedHosts = data.allowedHosts || [];

        allowedHosts.forEach(host => {
            const li = document.createElement("li");
            li.textContent = host;
            list.appendChild(li);
        });
    });

    // Add new host to storage and UI
    addHostButton.addEventListener("click", () => {
        const newHost = input.value.trim().toLowerCase();
        if (!newHost) return;

        chrome.storage.local.get({ allowedHosts: [] }, (data) => {
            const allowedHosts = data.allowedHosts || [];

            if (!allowedHosts.includes(newHost)) {
                allowedHosts.push(newHost);

                chrome.storage.local.set({ allowedHosts }, () => {
                    const li = document.createElement("li");
                    li.textContent = newHost;
                    list.appendChild(li);
                    input.value = "";
                });
            }
        });
    });
});
