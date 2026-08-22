const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'projects');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    
    // Fix layout classes
    content = content.replace(/<main class="dashboard-container">/g, '<main class="page-container">');
    content = content.replace(/<div class="dashboard-left">/g, '<div class="project-header">');
    content = content.replace(/<div class="dashboard-right">/g, '<div class="project-content">');
    content = content.replace(/<section class="dashboard-section active"/g, '<section class="content-section"');
    
    // Fix link back to portfolio (was portfolio.html, now index.html)
    content = content.replace(/href="\.\.\/portfolio\.html"/g, 'href="../index.html"');
    
    // Fix hardcoded brutalist styles
    content = content.replace(/style="[^"]*box-shadow:[^"]*"/g, 'style="width: 100%; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);"');
    content = content.replace(/border-top: 2px solid var\(--border-color\);/g, '');
    content = content.replace(/border-bottom: 2px solid var\(--border-color\);/g, '');
    content = content.replace(/text-transform: uppercase;/g, '');
    
    // Remove "THE DIRECTIVE", "THE PIVOT", etc and make them standard
    content = content.replace(/<h2[^>]*>THE DIRECTIVE<\/h2>/g, '<h2>Overview</h2>');
    content = content.replace(/<h2[^>]*>THE PIVOT<\/h2>/g, '<h2>Development</h2>');
    content = content.replace(/<h2[^>]*>THE ENGINE OF CHAOS<\/h2>/g, '<h2>Key Mechanics</h2>');
    content = content.replace(/<h2[^>]*>THE AUTOPSY<\/h2>/g, '<h2>Post-Mortem</h2>');
    content = content.replace(/<p class="subtitle">([^<]+)<\/p>/g, (match, p1) => `<p class="subtitle">${p1.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</p>`);
    content = content.replace(/<h1[^>]*>([^<]+)<\/h1>/g, (match, p1) => `<h1>${p1.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</h1>`);

    fs.writeFileSync(path.join(dir, file), content);
}
console.log('Fixed projects');
