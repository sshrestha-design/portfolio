import glob
import re

files = [
    "boom-miner.html",
    "hell-minion.html",
    "berlin-berlin.html",
    "crowdsurfer.html",
    "gravity-switcher.html",
    "guidance.html",
    "the-new-dress.html"
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Find the link we just placed under subtitle
    # Example: <a href="https://sagar-shrestha.itch.io/boom-miner" target="_blank" class="cv-btn" style="margin-top: 0;">PLAY ON ITCH.IO</a>
    # We might have different links, but they all say "PLAY ON ITCH.IO"
    a_tag_match = re.search(r'\s*<a href="([^"]+)"[^>]*>PLAY ON ITCH\.IO</a>', content)
    
    if a_tag_match:
        url = a_tag_match.group(1)
        a_tag_full = a_tag_match.group(0)
        
        # Remove the a tag from where it is now
        content = content.replace(a_tag_full, '')
        
        # Now find the theme-toggle button
        # <button id="theme-toggle">INVERT</button>
        # We want to replace it with a flex container
        
        flex_container = f'''<div style="position: fixed; top: 20px; right: 20px; display: flex; gap: 1rem; align-items: center; z-index: 1000; background: var(--bg-color); padding: 5px; box-shadow: -5px 5px 0 var(--border-color); border: 2px solid var(--border-color);">
        <a href="{url}" target="_blank" style="color: var(--text-color); font-weight: 900; text-transform: uppercase; text-decoration: none; transition: all 0.2s; padding: 5px 10px;" onmouseover="this.style.background='var(--accent-color)'; this.style.color='#ffffff';" onmouseout="this.style.background='transparent'; this.style.color='var(--text-color)';">PLAY IT &rarr;</a>
        <button id="theme-toggle" style="position: static; margin: 0; border: none; border-left: 2px solid var(--border-color); box-shadow: none;">INVERT</button>
    </div>'''
        
        # Wait, if there's already a flex container from a previous script? No, in case studies we didn't add it.
        # But let's just make it simple. 
        
        simple_flex = f'''<div style="position: fixed; top: 20px; right: 20px; display: flex; gap: 1rem; align-items: center; z-index: 1000;">
        <a href="{url}" target="_blank" class="cv-btn" style="margin: 0;">PLAY IT</a>
        <button id="theme-toggle" style="position: static; margin: 0;">INVERT</button>
    </div>'''

        content = re.sub(r'<button id="theme-toggle">INVERT</button>', simple_flex, content)
        
        with open(file, 'w') as f:
            f.write(content)

print("Moved play buttons to fixed top right")
