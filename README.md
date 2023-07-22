# Emmet Classes to Module Classes VSCode Extension

## Description

The **Emmet Classes to Module Classes** is a Visual Studio Code (VSCode) extension that helps you refactor your code when working with CSS Modules. It allows you to convert your standard `className="Something"` attributes to the appropriate CSS Modules format, which is `className={styles.Something}`. Additionally, if you are using different imported stylesheets for your CSS Modules, this extension will automatically recognize the import statements and use the imported module name in the replacement.

## Features

- Automatically converts className="Something" attributes to className={styles.Something} for CSS Modules.
- Recognizes import statements for CSS Modules and uses the imported module name in the replacement.
- Supports `.tsx`, `.jsx`, and `.html` files.

## How to Use

1. Install the extension from the Visual Studio Code Marketplace by searching for "Emmet Classes to Module" and clicking the "Install" button.

2. Open a project that contains files with CSS classes in the format className="Something".

3. To use the extension, place your cursor anywhere in the file, and then:

- `CTRL + SHIFT + P` and write "Rename Classes to Module Classes" from the context menu and select, or
- Use the hotkey `CTRL(CMD) + SHIFT + ALT + M` to trigger the refactoring process.

4. The extension will find all occurrences of `className="Something"` and replace them with `className={styles.Something}`.

5. If you have already imported a stylesheet with the .module.scss, .module.css, or .module.less extension, the extension will use the imported module name (e.g.: `import classesTest from "test.module.scss"` - will translate to `className={classesTest.Something}`) to construct the replacement.

## Supported File Types

This extension supports the following file types:

- `.tsx` (TypeScript React)
- `.jsx` (JavaScript React)
- `.html` (HTML with JSX)

## Notes

- Before using the extension, ensure you have saved your files to avoid losing any unsaved changes during the refactoring process.
- If import statements is commented or import statement doesn't have `.module`, the extension will not consider it during the replacement process and will simple perform the replacement with `className={styles.Something}`.


## Feedback and Issues

If you encounter any issues or have suggestions for improvements, please [submit an issue on GitHub](https://github.com/Eugene-Mokrushin/emmetModuleRenamer/issues).

## Contribution

Contributions are welcome! If you'd like to improve the extension, fix bugs, or add new features, feel free to [fork the repository on GitHub](https://github.com/Eugene-Mokrushin/emmetModuleRenamer) and submit a pull request.

## License

This extension is licensed under the [MIT License](https://github.com/Eugene-Mokrushin/emmetModuleRenamer/blob/main/LICENSE).
