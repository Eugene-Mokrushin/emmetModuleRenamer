const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand('emmet-classes-to-module.renameClassesToModuleClasses', function () {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const document = editor.document;
      const supportedExtensions = ['tsx', 'jsx', 'html'];
      const classNameRegex = /className="([^"]*)"/g;
      const importRegex = /(?<!\/\/\s*)import\s+([^;\n]+)\s+from\s+["'](.+\.module\.(scss|css|less))["'];?/g;
      const classNamesMap = {};

      if (supportedExtensions.includes(getFileExtension(document.fileName))) {
        const text = document.getText();
        let importMatch;
        while ((importMatch = importRegex.exec(text))) {
          const importedModuleName = importMatch[1].trim();
          const importPath = importMatch[2].trim();
          classNamesMap[importPath] = importedModuleName;
        }

        editor.edit(editBuilder => {
          let match;
          while ((match = classNameRegex.exec(text))) {
            const className = match[1];
            const replaceString = getReplaceString(classNamesMap, className);

            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);

            editBuilder.replace(new vscode.Range(startPos, endPos), replaceString);
          }
        });

        vscode.window.showInformationMessage('Class names replaced with module format!');
      } else {
        vscode.window.showInformationMessage('The current file does not have a supported extension (.tsx, .jsx, or .html).');
      }
    }
  });

  context.subscriptions.push(disposable);
}
function deactivate() { }

function getFileExtension(fileName) {
  const parts = fileName.split('.');
  return parts[parts.length - 1];
}

function getReplaceString(classNamesMap, className) {
  const moduleRegex = /\.module\.(scss|css|less)$/;

  for (const importPath in classNamesMap) {
    if (moduleRegex.test(importPath)) {
      const importedModuleName = classNamesMap[importPath];
      return `className={${importedModuleName}.${className}}`;
    }
  }

  return `className={styles.${className}}`;
}

module.exports = {
  activate,
  deactivate
}
