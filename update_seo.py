import os
import re

files = [
    'hell-minion.html',
    'berlin-berlin.html',
    'crowdsurfer.html',
    'gravity-switcher.html',
    'guidance.html',
    'the-new-dress.html',
    'resume.html'
]

seo_block_regex = re.compile(
    r'<!-- SEO and Social Share Tags -->\s*<meta name="description" content=".*?">\s*<meta property="og:title" content=".*?">\s*<meta property="og:description" content=".*?">\s*<meta property="og:type" content=".*?">\s*<meta property="og:url" content=".*?">\s*(<meta property="og:image" content=".*?">)?',
    re.DOTALL
)

for file in files:
    filepath = os.path.join('/Users/sagarshrestha/.gemini/antigravity/scratch/portfolio', file)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Extract Title
    title_match = re.search(r'<title>(.*?)</title>', content)
    title = title_match.group(1) if title_match else "Sagar Shrestha | Game Designer"
    
    # Extract image if it exists in the block
    image_match = re.search(r'<meta property="og:image" content="(.*?)">', content)
    image_url = image_match.group(1) if image_match else "https://sagarshrestha23.com.np/boom_miner_gameplay.png"
    
    new_seo_block = f"""<!-- SEO and Social Share Tags -->
    <meta name="description" content="{title} - A portfolio case study by Sagar Shrestha.">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{title} - A portfolio case study by Sagar Shrestha.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://sagarshrestha23.com.np/{file}">
    <meta property="og:image" content="{image_url}">"""

    # Replace the block
    if seo_block_regex.search(content):
        new_content = seo_block_regex.sub(new_seo_block, content)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated SEO tags in {file}")
    else:
        print(f"SEO block not found or already changed in {file}")
