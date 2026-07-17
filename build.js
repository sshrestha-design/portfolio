const fs = require('fs');
const path = require('path');

try {
    const cssPath = path.join(__dirname, 'css', 'style.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    const minifiedCss = css.replace(/\s+/g, ' ').replace(/\/\*.*?\*\//g, '').trim();

    const fontRegex = /<link\s+rel="preconnect"\s+href="https:\/\/fonts\.googleapis\.com">\s*<link\s+rel="preconnect"\s+href="https:\/\/fonts\.gstatic\.com"\s+crossorigin>\s*<link\s+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:wght@400;700;900&display=swap"\s+rel="stylesheet">/gs;

    const fontPreload = `<link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" media="print" onload="this.media='all'">
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap">
        </noscript>`;

    function processHtmlFiles(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                // Ignore node_modules, .git, etc.
                if (!['node_modules', '.git', 'css', 'js', 'assets'].includes(file)) {
                    processHtmlFiles(fullPath);
                }
            } else if (file.endsWith('.html')) {
                let content = fs.readFileSync(fullPath, 'utf-8');
                
                // Replace Google Fonts
                if (content.match(fontRegex)) {
                    content = content.replace(fontRegex, fontPreload);
                } else {
                    const singleLineRegex = /<link\s+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:wght@400;700;900&display=swap"\s+rel="stylesheet">/g;
                    content = content.replace(singleLineRegex, fontPreload);
                }
                
                // Replace style.css with inlined minified CSS
                // We'll look for variations of the stylesheet link since paths might be relative
                const styleRegex = /<link\s+rel="stylesheet"\s+href="(?:\.\.\/)*css\/style\.css">/g;
                content = content.replace(styleRegex, `<style>${minifiedCss}</style>`);
                
                // Also support legacy style.css in case
                const legacyStyleRegex = /<link\s+rel="stylesheet"\s+href="style\.css">/g;
                content = content.replace(legacyStyleRegex, `<style>${minifiedCss}</style>`);

                // Defer script.js - look for the non-deferred version and defer it
                const scriptRegex = /<script\s+src="((?:\.\.\/)*js\/script\.js)"><\/script>/g;
                content = content.replace(scriptRegex, `<script defer src="$1"></script>`);
                
                const legacyScriptRegex = /<script\s+src="script\.js"><\/script>/g;
                content = content.replace(legacyScriptRegex, `<script defer src="js/script.js"></script>`);

                fs.writeFileSync(fullPath, content);
            }
        }
    }

    processHtmlFiles(__dirname);
    console.log('Build complete. CSS inlined and fonts deferred.');
} catch (error) {
    console.error("BUILD FAILED WITH ERROR:", error);
    process.exit(1);
}
