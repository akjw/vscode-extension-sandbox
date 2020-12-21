module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const path = __webpack_require__(2);
function activate(context) {
    // Only allow a single Cat Coder
    let currentPanel = undefined;
    context.subscriptions.push(vscode.commands.registerCommand('catCoding.start', () => {
        if (currentPanel) {
            currentPanel.reveal(vscode.ViewColumn.One);
        }
        else {
            currentPanel = vscode.window.createWebviewPanel('catCoding', 'Cat Coding', vscode.ViewColumn.One, {
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))],
                enableScripts: true
                // has high memory overhead and should only be used when other persistence techniques will not work.
                // retainContextWhenHidden: true
            });
            const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'media', 'cat.gif'));
            const catGifSrc = currentPanel.webview.asWebviewUri(onDiskPath);
            currentPanel.webview.html = getWebviewContent();
            // currentPanel.webview.html = getWebviewContent(catGifSrc);
            currentPanel.onDidDispose(() => {
                currentPanel = undefined;
            }, undefined, context.subscriptions);
            // Handle messages from the webview
            currentPanel.webview.onDidReceiveMessage(message => {
                switch (message.command) {
                    case 'alert':
                        vscode.window.showErrorMessage(message.text);
                        return;
                }
            }, undefined, context.subscriptions);
        }
    }));
    // Our new command
    context.subscriptions.push(vscode.commands.registerCommand('catCoding.doRefactor', () => {
        if (!currentPanel) {
            return;
        }
        // Send a message to our webview.
        // You can send any JSON serializable data.
        currentPanel.webview.postMessage({ command: 'refactor' });
    }));
    // And make sure we register a serializer for our webview type
    // Persist state even when reloading window
    vscode.window.registerWebviewPanelSerializer('catCoding', new CatCodingSerializer());
    // context.subscriptions.push(
    //   vscode.commands.registerCommand('catCoding.start', () => {
    //     const panel = vscode.window.createWebviewPanel(
    //       'catCoding',
    //       'Cat Coding',
    //       vscode.ViewColumn.One,
    //       {
    //           // Only allow the webview to access resources in our extension's media directory
    //           localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))],
    //            // Enable scripts in the webview
    //           enableScripts: true
    //       }
    //     );
    //     // Get path to resource on disk
    //     const onDiskPath = vscode.Uri.file(
    //       path.join(context.extensionPath, 'media', 'cat.gif')
    //     );
    //     // And get the special URI to use with the webview
    //     const catGifSrc = panel.webview.asWebviewUri(onDiskPath);
    //     panel.webview.html = getWebviewContent(catGifSrc);
    //   })
    // );
}
exports.activate = activate;
class CatCodingSerializer {
    deserializeWebviewPanel(webviewPanel, state) {
        return __awaiter(this, void 0, void 0, function* () {
            // `state` is the state persisted using `setState` inside the webview
            console.log(`Got state: ${state}`);
            // Restore the content of our webview.
            //
            // Make sure we hold on to the `webviewPanel` passed in here and
            // also restore any event listeners we need on it.
            webviewPanel.webview.html = getWebviewContent();
        });
    }
}
// const cats = {
//   'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
//   'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
//   'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
// };
// export function activate(context: vscode.ExtensionContext) {
//   context.subscriptions.push(
//     vscode.commands.registerCommand('catCoding.start', () => {
//       const panel = vscode.window.createWebviewPanel(
//         'catCoding',
//         'Cat Coding',
//         vscode.ViewColumn.One,
//         {}
//       );
//       panel.webview.html = getWebviewContent('Coding Cat');
//       // Update contents based on view state changes
//       panel.onDidChangeViewState(
//         e => {
//           const panel = e.webviewPanel;
//           switch (panel.viewColumn) {
//             case vscode.ViewColumn.One:
//               updateWebviewForCat(panel, 'Coding Cat');
//               return;
//             case vscode.ViewColumn.Two:
//               updateWebviewForCat(panel, 'Compiling Cat');
//               return;
//             case vscode.ViewColumn.Three:
//               updateWebviewForCat(panel, 'Testing Cat');
//               return;
//           }
//         },
//         null,
//         context.subscriptions
//       );
//     })
//   );
// }
// export function activate(context: vscode.ExtensionContext) {
// Track currently webview panel
// let currentPanel: vscode.WebviewPanel | undefined = undefined;
//   context.subscriptions.push(
//     vscode.commands.registerCommand('catCoding.start', () => {
//       const columnToShowIn = vscode.window.activeTextEditor
//         ? vscode.window.activeTextEditor.viewColumn
//         : undefined;
//       if (currentPanel) {
//         //If we already have a panel, show it in the target column
//         currentPanel.reveal(columnToShowIn);
//       } else {
//         //Otherwise, create a new panel
//         currentPanel = vscode.window.createWebviewPanel(
//           'catCoding',
//           'Cat Coding',
//           columnToShowIn,
//           {}
//         );
//         currentPanel.webview.html = getWebviewContent('Coding Cat');
//         //Reset when the current panel is closed
//         currentPanel.onDidDispose(
//           () => {
//             currentPanel = undefined;
//           },
//           null,
//           context.subscriptions
//         );
//       }
//     })
// vscode.commands.registerCommand('catCoding.start', () => {
// Create and show a new webview
// const panel = vscode.window.createWebviewPanel(
//   'catCoding', // Identifies the type of the webview. Used internally
//   'Cat Coding', // Title of the panel displayed to the user
//   vscode.ViewColumn.One, // Editor column to show the new webview panel in.
//   {} // Webview options. More on these later.
// );
// let iteration = 0;
// const updateWebview = () => {
//   const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
//   panel.title = cat;
//   panel.webview.html = getWebviewContent(cat);
// };
// // Set initial content
// updateWebview();
// And schedule updates to the content every second
// const interval = setInterval(updateWebview, 1000);
// panel.onDidDispose(
//   () => {
// When the panel is closed, cancel any future updates to the webview content
//     clearInterval(interval);
//   },
//   null,
//   context.subscriptions
// );
/* programmatically close webview */
// panel.webview.html = getWebviewContent(cats['Coding Cat']);
// After 5sec, pragmatically close the webview panel
// const timeout = setTimeout(() => panel.dispose(), 5000);
// panel.onDidDispose(
//   () => {
// Handle user closing panel before the 5sec have passed
//     clearTimeout(timeout);
//   },
//   null,
//   context.subscriptions
// );
// })
//   );
// }
function getWebviewContent() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <h1 id="lines-of-code-counter">0</h1>

    <script>
          (function() {
            const vscode = acquireVsCodeApi();
            const counter = document.getElementById('lines-of-code-counter');


            // Check if we have an old state to restore from
            // Persist state even if panel is hidden
            const previousState = vscode.getState();
            let count = previousState ? previousState.count : 0;
            counter.textContent = count;
            
            setInterval(() => {
              counter.textContent = count++;
              // Update the saved state
              vscode.setState({ count });
            }, 100);
        }())
    </script>
</body>
</html>`;
}
// function getWebviewContent(cat: vscode.Uri) {
//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="Content-Security-Policy" content="default-src 'none';">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Cat Coding</title>
// </head>
// <body>
//     <img src="${cat}" width="300" />
//     <h1 id="lines-of-code-counter">0</h1>
//     <script>
//           (function() {
//             const vscode = acquireVsCodeApi();
//             const counter = document.getElementById('lines-of-code-counter');
//             let count = 0;
//             setInterval(() => {
//                 counter.textContent = count++;
//                 // Alert the extension when our cat introduces a bug
//                 if (Math.random() < 0.001 * count) {
//                     vscode.postMessage({
//                         command: 'alert',
//                         text: '🐛  on line ' + count
//                     })
//                 }
//             }, 100);
//         }())
//         // Handle the message inside the webview
//         window.addEventListener('message', event => {
//             const message = event.data; // The JSON data our extension sent
//             switch (message.command) {
//                 case 'refactor':
//                     count = Math.ceil(count * 0.5);
//                     counter.textContent = count;
//                     break;
//             }
//         });
//     </script>
// </body>
// </html>`;
// }
// function updateWebviewForCat(panel: vscode.WebviewPanel, cat: keyof typeof cats) {
//   panel.title = cat;
//   panel.webview.html = getWebviewContent(cat);
// }
// function getWebviewContent(cat: keyof typeof cats) {
//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Cat Coding</title>
// </head>
// <body>
//     <img src="${cats[cat]}" width="300" />
// </body>
// </html>`;
// }
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");;

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })()
;
//# sourceMappingURL=extension.js.map