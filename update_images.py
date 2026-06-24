import urllib.request
import re
import os
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

urls = {
    "boom-miner.html": "https://sagar-shrestha.itch.io/boom-miner",
    "hell-minion.html": "https://sagar-shrestha.itch.io/hellminion",
    "berlin-berlin.html": "https://sagar-shrestha.itch.io/berlin-berlin",
    "crowdsurfer.html": "https://sagar-shrestha.itch.io/crowdsurfer",
    "gravity-switcher.html": "https://sagar-shrestha.itch.io/gravity-switcher",
    "guidance.html": "https://sagar-shrestha.itch.io/guidance",
    "the-new-dress.html": "https://sagar-shrestha.itch.io/the-new-dress"
}

def get_screenshot(itch_url):
    try:
        req = urllib.request.Request(itch_url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'data-image_box="[^"]*"\s+href="([^"]+)"', html)
        if match:
            return match.group(1)
        match = re.search(r'<img[^>]+src="([^"]+)"[^>]*class="[^"]*screenshot[^"]*"', html)
        if match:
            return match.group(1)
        match = re.search(r'<a href="([^"]+)" data-image_box', html)
        if match:
            return match.group(1)
    except Exception as e:
        print(f"Failed {itch_url}: {e}")
    return None

images = {}
for html_file, url in urls.items():
    img = get_screenshot(url)
    print(f"{html_file}: {img}")
    if img:
        images[html_file] = img

for html_file, img_url in images.items():
    path = os.path.join('/Users/sagarshrestha/.gemini/antigravity/scratch/portfolio', html_file)
    if os.path.exists(path):
        with open(path, 'r') as f:
            content = f.read()
        content = re.sub(r'<img src="[^"]+"( style="width:100%; border:4px)', f'<img src="{img_url}"\\1', content)
        with open(path, 'w') as f:
            f.write(content)

index_path = '/Users/sagarshrestha/.gemini/antigravity/scratch/portfolio/index.html'
with open(index_path, 'r') as f:
    index_content = f.read()

for html_file, img_url in images.items():
    pattern = rf'(<a href="{html_file}" data-img=")[^"]+(")'
    index_content = re.sub(pattern, rf'\g<1>{img_url}\g<2>', index_content)

with open(index_path, 'w') as f:
    f.write(index_content)
print("Updated all files")
