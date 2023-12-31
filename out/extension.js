"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = exports.getReplaceString = exports.parseClassNames = exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
/**
 * @param {vscode.ExtensionContext} context
 */
const supportedExtensions = ["tsx", "jsx", "html"];
function activate(context) {
    let disposable = vscode.commands.registerCommand("emmet-classes-to-module.renameClassesToModuleClasses", function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const classNameRegex = /class(?:Name)?="([^"]*)"/g;
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
                editor.edit((editBuilder) => {
                    let match;
                    while ((match = classNameRegex.exec(text))) {
                        const className = match[1];
                        const replaceString = getReplaceString(classNamesMap, className);
                        const startPos = document.positionAt(match.index);
                        const endPos = document.positionAt(match.index + match[0].length);
                        editBuilder.replace(new vscode.Range(startPos, endPos), replaceString);
                    }
                });
                vscode.window.showInformationMessage("Class names replaced with module format!");
            }
            else {
                vscode.window.showInformationMessage("The current file does not have a supported extension (.tsx, .jsx, or .html).");
            }
        }
    });
    let disposableReverse = vscode.commands.registerCommand("emmet-classes-to-module.renameModuleClassesToClasses", function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const classAttributeRegex = /(class|className)=\{(.*)\}/g;
            if (supportedExtensions.includes(getFileExtension(document.fileName))) {
                editor.edit((editBuilder) => {
                    const text = document.getText();
                    let match;
                    while ((match = classAttributeRegex.exec(text))) {
                        const attribute = match[0];
                        if (attribute) {
                            const classNames = parseClassNames(attribute);
                            const newClassAttribute = `class="${classNames}"`;
                            const startPos = document.positionAt(match.index);
                            const endPos = document.positionAt(match.index + attribute.length);
                            editBuilder.replace(new vscode.Range(startPos, endPos), newClassAttribute);
                        }
                    }
                });
                vscode.window.showInformationMessage("Module class names replaced with regular class format!");
            }
            else {
                vscode.window.showInformationMessage("The current file does not have a supported extension (.tsx, .jsx, or .html).");
            }
        }
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposableReverse);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function getFileExtension(fileName) {
    const parts = fileName.split(".");
    return parts[parts.length - 1];
}
exports.getFileExtension = getFileExtension;
function getReplaceString(classNamesMap, className) {
    const moduleRegex = /\.module\.(scss|css|less)$/;
    const manyClasses = className.split(" ");
    for (const importPath in classNamesMap) {
        if (moduleRegex.test(importPath)) {
            const importedModuleName = classNamesMap[importPath];
            if (manyClasses.length > 1) {
                const final = manyClasses.map((cl) => {
                    return "${" + importedModuleName + "." + cl + "}";
                });
                return "className={`" + `${final.join(" ")}` + "`}";
            }
            else {
                return `className={${importedModuleName}.${className}}`;
            }
        }
    }
    if (manyClasses.length > 1) {
        const final = manyClasses.map((cl) => {
            return "${styles." + cl + "}";
        });
        return "className={`" + `${final.join(" ")}` + "`}";
    }
    else {
        return `className={styles.${className}}`;
    }
}
exports.getReplaceString = getReplaceString;
function parseClassNames(value) {
    const pure = value.replace(/(class|className)=\{(.*)\}/g, "$2");
    const classNames = pure.split(" ");
    const final = classNames.map((cl) => {
        let finalClass = cl;
        if (/\./g.test(cl)) {
            finalClass = finalClass.split(".")[1];
        }
        finalClass = finalClass
            .replaceAll("{", "")
            .replaceAll("}", "")
            .replaceAll("`", "")
            .replaceAll("$", "");
        return finalClass;
    });
    return [...new Set(final)].join(" ");
}
exports.parseClassNames = parseClassNames;
exports.default = activate;
//# sourceMappingURL=extension.js.map