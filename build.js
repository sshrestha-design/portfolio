const fs = require('fs');
const path = require('path');

try {
    const cssPath = path.join(__dirname, 'style.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    const minifiedCss = css.replace(/\s+/g, ' ').replace(/\/\*.*?\*\//g, '').trim();

    const files = fs.readdirSync(__dirname);
    const htmlFiles = files.filter(f => f.endsWith('.html'));

    const fontRegex = /<link\s+rel="preconnect"\s+href="https:\/\/fonts\.googleapis\.com">\s*<link\s+rel="preconnect"\s+href="https:\/\/fonts\.gstatic\.com"\s+crossorigin>\s*<link\s+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:wght@400;700;900&display=swap"\s+rel="stylesheet">/gs;

    const fontPreload = `<link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" media="print" onload="this.media='all'">
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap">
        </noscript>`;

    for (const file of htmlFiles) {
        const filePath = path.join(__dirname, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Replace Google Fonts
        if (content.match(fontRegex)) {
            content = content.replace(fontRegex, fontPreload);
        } else {
            // Fallback
            const singleLineRegex = /<link\s+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:wght@400;700;900&display=swap"\s+rel="stylesheet">/g;
            content = content.replace(singleLineRegex, fontPreload);
        }
        
        // Replace style.css with inlined minified CSS
        const styleRegex = /<link rel="stylesheet" href="style\.css">/g;
        content = content.replace(styleRegex, `<style>${minifiedCss}</style>`);

        // Defer script.js
        const scriptRegex = /<script src="script\.js"><\/script>/g;
        content = content.replace(scriptRegex, `<script defer src="script.js"></script>`);
        
        fs.writeFileSync(filePath, content);
    }

    console.log('Build complete. CSS inlined and fonts deferred.');
} catch (error) {
    console.error("BUILD FAILED WITH ERROR:", error);
    process.exit(1);
}
