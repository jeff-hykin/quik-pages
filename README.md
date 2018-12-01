# quik-pages
A plug-in for quik-server that makes it easy to manage webpages
<br>Handles history for single-page-apps and also adds pages to the JSX chain

# How do I use it?
Add the plugin to quik server `let quikPageManager = server.quikAdd("quik-pages")`
<br>Then in your main frontend file (website.jsx)
```javascript
let yourHomePageElementOrFunctionThatReturnsAnElement = document.createElement("body")
// add all your pages here
pageManager.pages = {
    Home : yourHomePageElementOrFunctionThatReturnsAnElement
}

// tell it what you want to do when a specific page is loaded
pageManger.load = (pageName) => {
    if (pageName == "home" || pageName == "") {
        document.body = pageManager.Home
    }
}

// load the current page after loading this file for the first time
pageManager.load() // no arguments = use current page url
```
<br>
<br>
If you have included quik-dom or manually included good-JSX then the example could look like this:
```javascript
let yourHomePageElementOrFunctionThatReturnsAnElement = <body>Hey you're on the homepage</body>
// add all your pages here
pageManager.pages = {
    Home : yourHomePageElementOrFunctionThatReturnsAnElement
}

// tell it what you want to do when a specific page is loaded
pageManger.load = (pageName) => {
    if (pageName == "home" || pageName == "") {
        document.body = <Home/>
    }
}
// load the current page after loading this file for the first time
pageManager.load() // no arguments = use current page url
```