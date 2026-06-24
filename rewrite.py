import os
import re

files = {
    "boom-miner.html": """<img src="boom_miner_gameplay.png" style="width:100%; border:4px solid var(--border-color); box-shadow: 15px 15px 0 var(--border-color); margin-bottom: 4rem;">
            
            <h2>THE DIRECTIVE</h2>
            <p class="bio">Speed is violence. <i>Boom Miner</i> is a fast-paced, highly volatile speed platformer where you play as Bopo, tearing through a futuristic underground mine while being relentlessly hunted. Every structure, every wall, every platform in the mine is collateral damage. If it stands in your way, you blow it up.</p>

            <h2 style="margin-top: 3rem;">THE PIVOT</h2>
            <p class="bio">The original theme was 'Destroy'. I started with a methodical, top-down Bomberman clone—and it was boring. I ripped the brakes out. A "happy accident" with an old physics script injected the prototype with a frenetic, Spelunky-esque inertia. I realized pacing is everything, so I violently pivoted the entire design into a high-speed platformer. I leaned into the chaos.</p>

            <h2 style="margin-top: 3rem;">THE ENGINE OF CHAOS</h2>
            <ul class="text-list">
                <li>
                    <strong>Non-Linear Destruction:</strong>
                    <span>There is no fixed path. The level is a suggestion. You carve your own route by blowing the architecture to pieces as you go.</span>
                </li>
                <li>
                    <strong>Relentless Predators:</strong>
                    <span>Platformer-based AI that refuses to stop. They will hunt the player to the ends of the level until dealt with.</span>
                </li>
            </ul>

            <h2 style="margin-top: 3rem;">THE AUTOPSY</h2>
            <p class="bio"><strong>The Blood:</strong> The game succeeded in delivering a fresh color palette, heavy "game juice," and a core loop that feels kinetic and highly volatile.</p>
            <p class="bio" style="margin-top: 1rem;"><strong>The Flaw:</strong> I gave the player too much freedom without enough structural boundaries. Without strict spatial constraints, players could break out of bounds, bleeding out the tension. It was a harsh lesson in ruthless scoping—never introduce too many mechanics before the structural foundation is locked.</p>""",

    "hell-minion.html": """<img src="https://img.itch.zone/aW1nLzI2MDgzMzE3LnBuZw==/315x250%23c/Gwsu2d.png" style="width:100%; border:4px solid var(--border-color); box-shadow: 15px 15px 0 var(--border-color); margin-bottom: 4rem;">
            
            <h2>THE DIRECTIVE</h2>
            <p class="bio">Layla, a fierce Demonslayer, is trapped in purgatory. The GateKeeper strips away her armory and forces her to survive his relentless minions. This is a boss-survival bullet hell stripped down to its most agonizing core: you have absolutely no attacks. Your only weapon is your ability to jump.</p>

            <h2 style="margin-top: 3rem;">THE PIVOT</h2>
            <p class="bio">The theme was "Jump." A standard 2D platformer would have been the cowardly choice. Instead, I forced a jump mechanic into a top-down perspective. The challenge: How do you make jumping visceral from above? You turn it into a frantic evasion tactic against music-synced bullet hell patterns and rivers of lava.</p>

            <h2 style="margin-top: 3rem;">THE ENGINE OF CHAOS</h2>
            <ul class="text-list">
                <li>
                    <strong>Stripped Down Survival:</strong>
                    <span>One button. No weapons. Time-based survival where jumping over projectiles is the only action keeping you alive.</span>
                </li>
                <li>
                    <strong>Rhythmic Violence:</strong>
                    <span>Enemy attacks are mathematically synced to the rhythm of the intense, driving background score.</span>
                </li>
            </ul>

            <h2 style="margin-top: 3rem;">THE AUTOPSY</h2>
            <p class="bio"><strong>The Blood:</strong> The core mechanic is brutally polished. The sound design acts as random response effects, injecting massive personality, proving that jumping fits top-down horror perfectly.</p>
            <p class="bio" style="margin-top: 1rem;"><strong>The Flaw:</strong> I accidentally formatted my hard drive during prototyping and lost everything. A complete restart in blood and tears. Mechanically, the level design had a critical blind spot: a boss could be completely ignored by safely jumping back and forth between two safe tiles. Tension requires inescapable danger.</p>""",

    "berlin-berlin.html": """<img src="https://img.itch.zone/aW1nLzI2MDgzMzcyLnBuZw==/315x250%23c/kDC288.png" style="width:100%; border:4px solid var(--border-color); box-shadow: 15px 15px 0 var(--border-color); margin-bottom: 4rem;">
            
            <h2>THE DIRECTIVE</h2>
            <p class="bio">An aggressive, stylized interactive narrative built around a strict 4-color Gameboy palette. A raw visual exploration of Berlin's underground energy, reduced to its bare minimum pixels.</p>

            <h2 style="margin-top: 3rem;">THE PIVOT</h2>
            <p class="bio">I wanted to build an atmospheric experience without relying on modern high-fidelity rendering. The constraint was the catalyst: forcefully restricting the entire visual identity to a stark, retro color limit to evoke a deeply specific mood.</p>

            <h2 style="margin-top: 3rem;">THE ENGINE OF CHAOS</h2>
            <ul class="text-list">
                <li>
                    <strong>Brutal Constraints:</strong>
                    <span>A strict 4-color palette forces visual storytelling to rely purely on high-contrast shapes, silhouettes, and lighting.</span>
                </li>
                <li>
                    <strong>Atmospheric Navigation:</strong>
                    <span>Movement and discovery dictate the narrative pacing.</span>
                </li>
            </ul>

            <h2 style="margin-top: 3rem;">THE AUTOPSY</h2>
            <p class="bio"><strong>The Blood:</strong> The oppressive, limited color palette successfully achieved a distinct, heavy atmosphere that modern rendering couldn't replicate.</p>
            <p class="bio" style="margin-top: 1rem;"><strong>The Flaw:</strong> Focusing so heavily on aesthetic constraints meant mechanical depth took a backseat. It stands as a visual mood piece, but demands stronger interactive hooks.</p>""",

    "crowdsurfer.html": """<img src="https://img.itch.zone/aW1nLzE3OTQxOTY4LnBuZw==/315x250%23c/5UriP0.png" style="width:100%; border:4px solid var(--border-color); box-shadow: 15px 15px 0 var(--border-color); margin-bottom: 4rem;">
            
            <h2>THE DIRECTIVE</h2>
            <p class="bio">A relentless 1-button runner capturing the visceral chaos of a heavy metal concert. You have zero control over your trajectory. You are a body floating on a sea of hands, relying entirely on the timing of your dives to stay afloat.</p>

            <h2 style="margin-top: 3rem;">THE PIVOT</h2>
            <p class="bio">For the weekly theme "One Button," the obvious, lazy answer is a Flappy Bird clone. I needed a scenario where a single input wasn't just a mechanic—it was a narrative reality. A crowd-surfer has no directional agency. They only have gravity and timing. The mechanics are the metaphor.</p>

            <h2 style="margin-top: 3rem;">THE ENGINE OF CHAOS</h2>
            <ul class="text-list">
                <li>
                    <strong>Absolute Minimal Input:</strong>
                    <span>Hit 'Space' to dive. Hesitate, and you drown in the pit.</span>
                </li>
                <li>
                    <strong>The Mantra:</strong>
                    <span>Fast - Loud - Difficult. Modern 64x64 pixel art bathed in ambient, aggressive concert lighting.</span>
                </li>
            </ul>

            <h2 style="margin-top: 3rem;">THE AUTOPSY</h2>
            <p class="bio"><strong>The Blood:</strong> Taking a conceptual, thematic idea and forging it into a raw, functional jump prototype proved the vision was sound.</p>
            <p class="bio" style="margin-top: 1rem;"><strong>The Flaw:</strong> Introducing enemy lights broke the architecture. The generation scripts fell out of sync, creating unavoidable death traps. The code bled out. A lesson in owning structural failures as an inevitable part of the design process.</p>""",

    "gravity-switcher.html": """<img src="https://img.itch.zone/aW1nLzc3MTYyOTMuZ2lm/315x250%23c/l7uw2e.gif" style="width:100%; border:4px solid var(--border-color); box-shadow: 15px 15px 0 var(--border-color); margin-bottom: 4rem;">
            
            <h2>THE DIRECTIVE</h2>
            <p class="bio">A spatial puzzle platformer that weaponizes perspective. The core mechanic is total environmental manipulation—shifting the gravitational axis to bend the architecture of the level to your will.</p>

            <h2 style="margin-top: 3rem;">THE PIVOT</h2>
            <p class="bio">I wanted to strip away cheap, traditional lock-and-key tropes. The goal was to build a game where the only tool required to solve the puzzle is the player's ability to violently reorient their mental map of physical space.</p>

            <h2 style="margin-top: 3rem;">THE ENGINE OF CHAOS</h2>
            <ul class="text-list">
                <li>
                    <strong>Architectural Subversion:</strong>
                    <span>Shift gravitational pull to the walls or ceiling, instantly transforming the floorplan into a hazard.</span>
                </li>
                <li>
                    <strong>Cognitive Load:</strong>
                    <span>Forces the player to constantly shatter and rebuild their understanding of the environment's layout.</span>
                </li>
            </ul>

            <h2 style="margin-top: 3rem;">THE AUTOPSY</h2>
            <p class="bio"><strong>The Blood:</strong> Implementing a global gravity shift demands ruthless precision in the physics engine and collision detection. When tuned perfectly, it forcefully generates those vital "Aha!" moments by breaking the player's standard perspective.</p>""",

    "guidance.html": """<img src="https://img.itch.zone/aW1nLzE4MjA1ODkzLnBuZw==/315x250%23c/v8DU0q.png" style="width:100%; border:4px solid var(--border-color); box-shadow: 15px 15px 0 var(--border-color); margin-bottom: 4rem;">
            
            <h2>THE DIRECTIVE</h2>
            <p class="bio">A completely hands-free, high-contrast maze runner engineered specifically for my grandmother. It is controlled entirely by speaking directional commands in native Nepali.</p>

            <h2 style="margin-top: 3rem;">THE PIVOT</h2>
            <p class="bio">The theme was "Gift." A recent heart attack had left my grandmother partially paralyzed on her left side, rendering traditional controllers useless. The challenge wasn't just mechanical; it was deeply personal. I had to rip out the concept of physical input entirely to build a medium she could command with her voice.</p>

            <h2 style="margin-top: 3rem;">THE ENGINE OF CHAOS</h2>
            <ul class="text-list">
                <li>
                    <strong>Vocal Architecture:</strong>
                    <span>Weaponized Unity's KeywordRecognizer API to process audio input and execute movement in real-time.</span>
                </li>
                <li>
                    <strong>Native Command Structure:</strong>
                    <span>Controls strictly mapped to spoken Nepali: <em>Daaya</em> (Right), <em>Baaya</em> (Left), <em>Mathi</em> (Up), <em>Taala</em> (Down).</span>
                </li>
            </ul>

            <h2 style="margin-top: 3rem;">THE AUTOPSY</h2>
            <p class="bio"><strong>The Blood:</strong> It worked. Watching her realize the digital space was obeying her voice was a profound success in alternative input design.</p>
            <p class="bio" style="margin-top: 1rem;"><strong>The Realization:</strong> Games are not just disposable amusement. They are therapeutic mediums, rehabilitation protocols, and powerful architectural tools for accessibility. Design is problem-solving.</p>""",

    "the-new-dress.html": """<img src="https://img.itch.zone/aW1nLzM3OTY3MjQucG5n/315x250%23c/5xPCV3.png" style="width:100%; border:4px solid var(--border-color); box-shadow: 15px 15px 0 var(--border-color); margin-bottom: 4rem;">
            
            <h2>THE DIRECTIVE</h2>
            <p class="bio">An interactive fiction experience that strips away twitch mechanics, forcing the narrative pacing and character choices to bear the full weight of the gameplay. A study in mood and consequence.</p>

            <h2 style="margin-top: 3rem;">THE PIVOT</h2>
            <p class="bio">I wanted to build an experience completely devoid of action. The challenge was proving that atmospheric tension, deliberate text pacing, and stark visual states can be just as engaging as a high-speed combat loop.</p>

            <h2 style="margin-top: 3rem;">THE ENGINE OF CHAOS</h2>
            <ul class="text-list">
                <li>
                    <strong>Narrative Fractures:</strong>
                    <span>Player choices don't just alter dialogue—they dictate the flow of the story and its ultimate, inescapable resolution.</span>
                </li>
                <li>
                    <strong>Atmospheric Weight:</strong>
                    <span>Relies heavily on visual pacing and psychological storytelling rather than mechanical difficulty.</span>
                </li>
            </ul>

            <h2 style="margin-top: 3rem;">THE AUTOPSY</h2>
            <p class="bio"><strong>The Blood:</strong> Stripping away action forces the spotlight onto branching logic and emotional resonance. It proved that pacing a paragraph of text requires the same exact psychological tension as pacing a boss fight.</p>"""
}

for filename, new_content in files.items():
    filepath = os.path.join("/Users/sagarshrestha/.gemini/antigravity/scratch/portfolio", filename)
    with open(filepath, 'r') as f:
        html = f.read()
    
    pattern = r'<img src="[^>]+>.*?(?=<h2 style="margin-top: 4rem;">PLAY IT</h2>)'
    html = re.sub(pattern, new_content + "\n\n            ", html, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(html)
print("Auteur rewrites complete!")
