const vscode = require('vscode');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const command = 'danieloSnippets.sayHello';
  console.log('activating...');
  
  const commandHandler = (name) => {
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
    let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;

			// Get the word within the selection
			let word = document.getText(selection);
			let reversed = word.split('').reverse().join('');
			editor.edit(editBuilder => {
				editBuilder.replace(selection, reversed);
			});
		}
  };

  context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}

module.exports = {
  activate
};