import * as vscode from 'vscode';
import * as path from 'path';


export function activate(context: vscode.ExtensionContext) {
let currentPanel: vscode.WebviewPanel | undefined = undefined;
    context.subscriptions.push(
    vscode.commands.registerCommand('ide-prototype.mkGraph', () => {
        // ensure that doc opens as new panel instead of new tab
        vscode.commands.executeCommand('vscode.setEditorLayout', { groups: [{ orientation: 0, groups: [{}, {orientation: 1, groups: [{}, {}], size: 0.5}], size: 0.5 }] })

        currentPanel = vscode.window.createWebviewPanel(
          'mkGraph',
          'L4 Graph',
          vscode.ViewColumn.Beside,
          {
            // Only allow the webview to access resources in our extension's media directory
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))],
          }
        );
  
        // Get path to resource on disk
        const onDiskPath = vscode.Uri.file(
          path.join(context.extensionPath, 'media', 'cabbage.png')
        );
  
        // And get the special URI to use with the webview
        const graphSrc = currentPanel.webview.asWebviewUri(onDiskPath);
  
        currentPanel.webview.html = getWebviewContent(graphSrc);
    
    }))

  const myScheme = 'markdown';
	const myProvider = new class implements vscode.TextDocumentContentProvider {

		// emitter and its event
		// onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
		// onDidChange = this.onDidChangeEmitter.event;

		provideTextDocumentContent(uri: vscode.Uri): string {
      let displayText = 'The Sale of Cabbages is Restricted. Everybody may sell the item, when the item is a cabbage and sale is onLegalDate or (unlikely) the seller has Exemption.'
      return displayText;
		}
  };
  
  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider));

	context.subscriptions.push(vscode.commands.registerCommand('markdown.show', async () => {
			const uri = vscode.Uri.parse('markdown:' + 'L4'); // 'name of tab itself 
      const doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
      const col = vscode.ViewColumn.Two ? vscode.ViewColumn.Three : vscode.ViewColumn.Two // set as new panel position

      // ensure that doc opens as new panel instead of new tab
      vscode.commands.executeCommand('vscode.setEditorLayout', { groups: [{ orientation: 0, groups: [{}, { orientation: 1, groups: [{}, {}], size: 0.5}], size: 0.5 }] })
     
			await vscode.window.showTextDocument(doc, col);
	}));
}

function getWebviewContent(graph: vscode.Uri) {
  return `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>L4 Graph</title>
          </head>
          <body>
              <img src="${graph}" width="500" />
          </body>
          </html>`;
}
