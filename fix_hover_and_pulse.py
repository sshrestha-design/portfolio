import glob
import re

# Update HTML files to use the .play-btn-pulse class
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

    # Right now it's class="cv-btn" for the PLAY IT button in the top right
    # Wait, in the previous script I might have accidentally removed class="cv-btn".
    # Let's just find ">PLAY IT</a>" and replace its class
    
    # Actually, in the previous run the replacement was:
    # <a href="{url}" target="_blank" class="cv-btn" style="margin: 0;">PLAY IT</a>
    
    content = content.replace('class="cv-btn" style="margin: 0;">PLAY IT</a>', 'class="cv-btn play-btn-pulse" style="margin: 0;">PLAY IT</a>')
    
    with open(file, 'w') as f:
        f.write(content)

print("Updated HTML files with pulsing class.")
