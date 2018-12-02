let thisModule
module.exports = thisModule = {
    frontend : () => {
        // create the global object
        window.pageManager = {
            pages : {},
        }
        Object.defineProperty(window.pageManager, "load", {
            get: function() { 
                return (path) => {
                    // if no path given then use the current page path
                    if (path == null) {
                        // remove the first slash before calling the users load function
                        path = window.location.pathname.replace(/^\//,"")
                    }
                    window.history.pushState({url:path},"",path)
                    window.pageManager.loadWithoutAddingToHistory(path)
                }
            },
            set: function (newValue) {
                window.pageManager.loadWithoutAddingToHistory = newValue
            }
        })
        // set the default loader function
        window.pageManager.load = () => console.error(`Somewhere in the code window.pageManager.load() was called before being set`)
        // add the listener for back/forward buttons
        window.addEventListener("popstate", (e)=> {
            // if theres a loader and a url, then use them to load the page
            if (window.pageManager.loadWithoutAddingToHistory && e.state.url != null) {
                window.pageManager.loadWithoutAddingToHistory(e.state.url)
            }
        })
    },
    generateFrontend: () => {
        return `(${thisModule.frontend})()`
    }
}