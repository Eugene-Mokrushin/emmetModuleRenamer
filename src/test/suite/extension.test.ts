import * as vscode from "vscode";
import * as assert from "assert";
import * as fs from "fs";

import * as myExtenstion from "../../extension";

const emmetTestCase = `import testCl from "test.module.less";<h1 class="appTitle appTitle1 appTitle1 appTitle1">React App</h1>`;
const moduleTestCase = `import testCl from "test.module.less";<h1 className={~!{testCl.appTitle} !{testCl.appTitle1} !{testCl.appTitle1} !{testCl.appTitle1}~}>React App</h1>`;

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

    // Test getFileExtension function
    test("getFileFExtension should return the correct file extension", () => {
      assert.strictEqual(myExtenstion.getFileExtension("test.tsx"), "tsx");
      assert.strictEqual(myExtenstion.getFileExtension("test.jsx"), "jsx");
      assert.strictEqual(myExtenstion.getFileExtension("test.html"), "html");
    });

    // Test getReplaceString function
    test("getReplaceString should return the correct replace string", () => {
      const classNamesMap = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "header.module.less": "styles.header",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "top.module.less": "styles.top",
      };
      const className = "header top";
      assert.strictEqual(
        myExtenstion.getReplaceString(classNamesMap, className),
        "className={`${styles.header.header} ${styles.header.top}`}"
      );
    });

    // Test parseClassNames function
    test("parseClassNames should return the correct class names", () => {
      const value = "className={styles.header}";
      assert.strictEqual(myExtenstion.parseClassNames(value), "header");
    });
});
