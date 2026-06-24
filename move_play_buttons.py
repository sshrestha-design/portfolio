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

    # Find the PLAY IT section
    # Usually: 
    # <h2 style="margin-top: 4rem;">PLAY IT</h2>
    # <a href="..." target="_blank" class="cv-btn" style="margin-top: 0;">PLAY ON ITCH.IO</a>
    
    play_it_match = re.search(r'\s*<h2[^>]*>PLAY IT</h2>\s*<a[^>]+>PLAY ON ITCH\.IO</a>', content)
    if play_it_match:
        play_it_block = play_it_match.group(0)
        
        # Remove from bottom
        content = content.replace(play_it_block, '')
        
        # Extract just the <a> tag
        a_tag_match = re.search(r'<a[^>]+>PLAY ON ITCH\.IO</a>', play_it_block)
        if a_tag_match:
            a_tag = a_tag_match.group(0)
            
            # Find the header section to insert the button
            # <p class="subtitle">SPEED PLATFORMER PROTOTYPE</p>
            header_match = re.search(r'(<p class="subtitle">.*?</p>)', content)
            if header_match:
                # Add it right below the subtitle, maybe wrap it in a div or just directly
                new_header = header_match.group(1) + '\n        ' + a_tag
                content = content.replace(header_match.group(1), new_header)

        with open(file, 'w') as f:
            f.write(content)

print("Moved play buttons")
