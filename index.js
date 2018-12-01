let thisModule
module.exports = thisModule = {
    frontend : () => {
        // create the global object
        window.pageManager = {
            pages : {},
        }
        let privatePagesObject = Symbol("pages")
        window.pageManager[privatePagesObject] = {} // TODO make this a proxy object to allow individual setting of pages
        Object.defineProperty(window.pageManager, "pages", {
            get: ()=>window.pageManager[privatePagesObject],
            set: (newValue)=> {
                for (let eachName in newValue) {
                    if (eachName[0].toUpperCase() != eachName[0]) {
                        console.error("Please make the key ", eachName, " start with a capital letter so it doesnt conflict with html tags")
                    } else {
                        window.pageManager[privatePagesObject][eachName] = newValue[eachName]
                    }
                }
            }
        })
        Object.defineProperty(window.pageManager, "load", {
            get: function() { 
                return (path) => {
                    // if no path given then use the current page path
                    if (path == null) {
                        // path = the pathname minus the first slash
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
            if (window.pageManager.loadWithoutAddingToHistory && e.state.url) {
                window.pageManager.loadWithoutAddingToHistory(e.state.url)
            }
        })
        // 
        // add a jsx renderer for the pages if good-jsx exists
        // 
        if (!window.jsxChain) {
            window.jsxChain = []
        }
        // if the element is a page then return the page otherwise return undefined
        window.jsxChain.push((elementName, properties, ...children) => {
            let page = window.pageManager.pages[elementName]
            if (page == null) {
                return
            }
            // if its a function then run it with the jsx arguments
            if (page instanceof Function) {
                return page(properties, ...children)
            }
            return page
        })
    },
    generateFrontend: () => {
        return `(${thisModule.frontend})()`
    }
}