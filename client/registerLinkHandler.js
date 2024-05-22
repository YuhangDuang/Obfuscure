// registerLinkHandler.js
document.getElementById('registerLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    browser.tabs.create({url: browser.runtime.getURL('register.html')}); // Open the registration page in a new tab
});
