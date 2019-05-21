const vscode = require('vscode');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed


const updateSelection = updater => {
  const editor = vscode.window.activeTextEditor;
  if(!editor) return;
  const { document, selection } = editor;
  const text = document.getText(selection);
  editor.edit(editBuilder => editBuilder.replace(selection,updater(text)));
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const command = 'danieloSnippets.convertToArrayString';
  // vscode.window.showInformationMessage('Danielo is here to help....');
  
  const commandHandler = () => {
    updateSelection(text => JSON.stringify(text.split('\n'),null,2));
  };

  context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}

module.exports = {
  activate
};