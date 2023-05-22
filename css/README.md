## CSS Folder

The `css` folder contains the original CSS files. You can find various CSS files such as `styles.css`, `layout.css`, and more in this folder. These files are usually human-readable and editable.

## Min Folder

The `min` folder contains the minified versions of the CSS files. Minification is the process of removing unnecessary characters and spaces from the CSS code, resulting in smaller file sizes. The minified files have the same names as their corresponding original CSS files but with the `.min.css` extension, such as `styles.min.css` and `layout.min.css`.

Minified CSS files are often used in production environments to optimize website performance by reducing file size and improving page load times.

## Usage

To use the minified CSS files in your project, you can simply link them in your HTML files like this:

```html
<link rel="stylesheet" href="min/styles.min.css">
<link rel="stylesheet" href="min/layout.min.css">
<!-- Add more links for other minified CSS files -->
