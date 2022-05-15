***
# <p  align="center">[Tank 3D Game](https://noebernigaud.github.io/Tank3D/src/) <font size="4">with [*Babylon.js*](https://www.babylonjs.com/)</font><p>
## <p  align="center">by *D.N.A. Production*<p>
***

| <b>Trailer</b> | <b>Gameplay</b> |
|:-------------------------:|:-------------------------:|
|[![TRAILER](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE) | [![GAMEPLAY](https://img.youtube.com/vi/6_SWAfjujOU/0.jpg)](https://www.youtube.com/watch?v=6_SWAfjujOU)|
  
[<b>CLICK HERE TO PLAY THE GAME</b>](https://noebernigaud.github.io/Tank3D/src/)
  
***

# Goal 
  The goal of this project was the creation of a 3D Tank Game with [<b>Babylon.js</b>](https://www.babylonjs.com/) in Spring of 2022 for the Game on Web 2022 contest. The theme was "You are unique".
  
***

# The *D.N.A. Production* team

VENTURELLI Antoine | FISSORE Davide | BERNIGAUD Noé 
:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://zupimages.net/up/22/19/39hp.png" alt="Venturelli Antoine" width="200"/> | <img src="https://zupimages.net/up/22/19/di99.png" alt="Architecture Dossiers" width="200"/> | <img src="https://zupimages.net/up/22/19/dak6.png" alt="BERNIGAUD Noé" width="200"/>

We are three students at the University of Côte d'Azur in M1 of Computer Science. Together, we form <b>*D.N.A. Production*</b>, a team formed to develop this project from start to end.
  
While at the start we decided that everybody would do a little bit of everything, with time we naturaly all grew some affinity for particular domains and made them our speciality:
  
<ul>
  <li>VENTURELLI Antoine was our models, particules effects, and textures specialist.</li>
  <li>FISSORE Davide was in charge of the menus and the elemental bricks behind the project's implementations.</li>
  <li>BERNIGAUD Noe was taking care of features' algorithms, and the musics and sound effects.</li>
</ul>

However, despite our specialization that occured during the project, we always stayed polyvalent and one of the main strenght of our team was our ability to meet very regularly and help each other out in all domains of the development.

We also want to mention <b>BUFFA Michel</b>, who encouraged us to participate to the contest and was our Babylonjs professor.
  
***

# Code Development, Implemented Features

## Origin

[<img align="right" src="https://img.youtube.com/vi/WTyHxY0fWx0/0.jpg" width="400"/>](https://www.youtube.com/watch?v=WTyHxY0fWx0)
  
The concept has been based on Noé Bernigaud's project of a Tank game in 2D written in Javascript on [<b>this Github repository</b>](https://github.com/noebernigaud/TankGame), which itself was inspired from the game WiiPlay - Tanks. With Babylonjs, we saw an opportunity to push the game much further and expand the game's feature to make a more complete game out of it.

While the idea was taken from there, nothing from the code is common between both version as we had to remake everything and use the physic engine.
  
*Check the original game's video [here](https://www.youtube.com/watch?v=jf7G_LtHStw) or by clicking on the image.*

<br clear="right"/>
  
<br>
  
***

## Engine
  
[<img align="right" src="https://img.youtube.com/vi/jf7G_LtHStw/0.jpg" width="400"/>](https://www.youtube.com/watch?v=jf7G_LtHStw)

At first, we started by building the engine of the engine, which would later rule all the game's interactions and mechanics.This was the most difficult part of the development, as problems that would seem quite simple could take a lot of time to solve. Moreover, we were beginners in Babylonjs, and bending the physic engine to our needs wasn't always easy.
<ul>
   <li>At the beginning, the gravity didn't look like it was working correctly. Tanks felt like ballons, as they were falling very slowly. We eventually realized that this was due to the scale of our world being accidentaly gigantic, and therefore re-sized all the object's dimension by dividing them by 40, which corrected the issue.
  <li>We had a lot of trouble implementing the tank's movements, in particular setting up the friction, to create natural movement. Using the Babylonjs engine's friction feature was preventing the tank to move correctly, but setting it to 0 would make the tank glide like if it was on ice. Therefore, we had to create our own mechanism to have a dynamic friction parameter and apply forces that would emulate a natural-looking friction when moving the tank.</li>
  <li>Another major difficulty was the import and usage of our first models. Understanding them and how they work was particularly challenging as we had no prior experience in 3D rendering.</li>
  </ul>

The engine's development is also the period where we created the bricks of the interaction between the player and the game, and made our first animations. The game was rather basic at this point and there was no gameplay, but it had all the fundations to build up the rest of our game. There was still a couple of issues in the engine that we would eventually correct later, but we were quite happy about this first step and ready to start implementing the game's feature.
  
*Check the video of the engine during development [here](https://www.youtube.com/watch?v=jf7G_LtHStw) or by clicking on the image.*
  
***

## World Development

What marked the transition between the engine's development and the features development was the introduction of the heightmap. This was a game-changer both for graphics and gameplay. After that, we developped menus, different levels, added new models, and changed our empty world into a beautiful island. We also introduced the sounds and music, and build a function to make sound's volumes dynamic depending on the distance of the emitter relative to the player.

A difficulty we encountered during this stage of development was the light. Since the beginning, all our objects had an emissive light (they were all phosphorescent), which wasn't looking natural and also was preventing us to diplay shadows properly. When changing lights, we also had to change our tank model as the previous one wasn't reacting well to that change.

The opponents' AI was then deployed, as well as multiple level objectives. One of the main challenge for the AI was to keep it simple but also make it look natural and interesting, and we are very happy about the current result. Another big part was to make the AI stay in the island and not go into the water, and to make it target the player, which were respectively solved with invisible delimiters and invisible rays.

Later on, we built levels with specific missions, such as timed levels, levels where you would have to find some items, or ennemies that could only be damaged once the player fullfil a condition. This variety in the gameplay and objectives allows the game to be less repetitive, and keep players on their toes.

We also introduced the different biomes (earth, sand, and snow) to make the visual experience more diverse, and give each biome their own identity. A fun thing about the biomes is that they actually all are loaded right at the start of the game - the two that are not currently used are below, invisible and uninteractible. We move the biomes up and down depending on which one we need, and render only the one we're using. It kind of works like a theatre piece, where the different scenes are hidden behind the curtains waiting for their turn to be displayed.
  
***

## Controls

The next part was to improve the controls - up until now, the aim was donne with the keyboard's arrow keys. You can still do it now, but we wanted to also give to the player the possibility to aim with their mouse, as it would feel much more natural, dynamic, and precise. Requesting pointerlock to capture the mouse into the game was tricky as navigators have strict standards regarding this, and we also wanted to give back the mouse to the player in menus, but we were eventually successful in its implementation.
  
***

## Bonuses
  
[<img align="right" src="https://img.youtube.com/vi/hYFZF-LxNEM/0.jpg" width="400"/>](https://www.youtube.com/watch?v=hYFZF-LxNEM)

At this point, the game was starting to look like a complete game. We had gameplay with different levels and ennemies, a good-looking map, a rudimentary menu, and the tank felt pleasant to control. However, it was still lacking some fun gameplay and discovery factor. It was time to implement the bonus feature, which would make our game into a roguelike, very fitting of the theme "You are unique".

Special bonuses were a particularly fun stage of the development, as they made the game a lot more enjoyable. While they took a lot of time to implement, the whole engine we already built was making the whole process a lot easier, giving more space to our imagination and to testing.

With 3 choices among the 9 different "Special" Bonuses, and 11 choices among the 5 generic "Normal" Bonuses and "Special" Bonuses level-up, there are more than 1200000 possible different tanks that can be built through a game. This makes the game a lot more interesting to re-play, and give sense to the theme "you are unique", as the tank you are playing by the end of the game is very likely unique across all games played and all players.
  
***

## Performances

One major concern for the game was performance issue. Quickly after introducing the Heightmap and complex models, we began to experiment large fps drops, to the point where the game was not enjoyable anymore. The game wasn't very CPU-intensive as we wrote our code while being able of its complexity, but it was the rendering that was difficult for computers.

By default, a lot of computers use their integrated GPU by default for web application, which isn't built for 3D-rendering. It is impossible to force from the code the computer to use its dedicated GPU, which is much more powerful, as it has to be done in the computer's system parameters. Therefore, we had to take the performance issue at heart, so the game could run even on integrated GPUs.

Particules, models, and the Heightmap were all re-adjusted to make the game run at a good fps number and make things enjoyable again, even on slow integrated GPU. Furthermore, The AI also had to be re-optimized. One fun thing that had to be corrected was the update of the health bars, which was taking a surprisingly high amount of ressources.

Note: if you think you web browser might be running on your computer's integrated GPU and want to make it run on your dedicated one (if you have one), check out [<b>this tutorial (Windows)</b>](https://www.amd.com/en/support/kb/faq/gpu-110). While the game should run fine even on low-end integrated GPUs, using the dedicated GPU will help make sure you don't experience any fps drop even in the most ressource-intensive situations.


***
# 3D Model and Texture sources
This work is based on:<br>
| Model | Author | License |
| :---- |:------:| -------:|
| [Barrel_01](https://polyhaven.com/a/Barrel_01) | [Jorge Camacho](https://www.artstation.com/jorgeandrespinedac) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| [Sci-fi Energy Capsule](https://sketchfab.com/3d-models/sci-fi-energy-capsule-20b23d4a703e4f7ebfb105b6b140b6fe)  |   [EspinArt3D](https://sketchfab.com/Jorgeart.Games)        |  [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Battle Tank](https://sketchfab.com/3d-models/battle-tank-5fcc302b89414348811eaa1ad4dc435f) | [_Alexandr](https://sketchfab.com/a_l_e_x_a_n_d_e_r) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Palm Trees](https://sketchfab.com/3d-models/palm-trees-20f8a8d5054b4191afb7cf3270dbd586) | [ElectroNick](https://sketchfab.com/ElectroNick) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Lowply future tank](https://sketchfab.com/3d-models/lowply-future-tank-8bb68f28c2244f00b249820c18661dc7) | [Mark Bai](https://sketchfab.com/bcfbox) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Crate box](https://sketchfab.com/3d-models/crate-box-e1a6856037c54d0d9019aedf61315569) | [KloWorks](https://sketchfab.com/kloworks) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Cactus 1 (Downloadable)](https://sketchfab.com/3d-models/cactus-1-downloadable-976b67b80efd4a7388ec85bfc4e39ecf) | [rhcreations](https://sketchfab.com/rhcreations) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Cactus 2 (Downloadable)](https://sketchfab.com/3d-models/cactus-2-downloadable-290ead6382604fb6b623dd0dc3deb07c) | [rhcreations](https://sketchfab.com/rhcreations) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Coconut Tree Low poly](https://sketchfab.com/3d-models/coconut-tree-low-poly-8c5d6b661b2f4c37834d87cd187eb907) | [Pixel_Monster](https://sketchfab.com/ar.jethin) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Poor Desert House](https://sketchfab.com/3d-models/poor-desert-house-64310fbd9b1640cdbf04f5f12ad58ba2) | [Fjordreig](https://sketchfab.com/Fjordreig) | [CC-BY-NC-4.0](http://creativecommons.org/licenses/by-nc/4.0/) |
| [Desertrock2 - 3D scan](https://sketchfab.com/3d-models/desertrock2-3d-scan-3af5bdab1a854c7c922c5afd39aab498) | [Eve Bat Studios](https://sketchfab.com/EveBatStudios) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [simple tank](https://sketchfab.com/3d-models/simple-tank-db0f1bde8e1648d2963f16b372d069ed) | [Haider Al_Asady](https://sketchfab.com/haiderhabbeb313) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Egyptian sculpture cat photogrammetry](https://sketchfab.com/3d-models/egyptian-sculpture-cat-photogrammetry-f1c2824a271e4a9d8c587fdc7e9eaa0a) | [vicente betoret ferrero](https://sketchfab.com/deathcow) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Egyptian jackal](https://sketchfab.com/3d-models/egyptian-jackal-eaa55e6879584f7bbb1fff2f483d0b04) | [vicente betoret ferrero](https://sketchfab.com/deathcow) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Moon Knight's Boomerang (low poly)](https://sketchfab.com/3d-models/moon-knights-boomerang-low-poly-f70c7ef4677849fcad5c773f17c1cb35) | [sergeilihandristov](https://sketchfab.com/sergeilihandristov) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Dark Green Ground Palm](https://sketchfab.com/3d-models/dark-green-ground-palm-9cddc307acca4e9f81a5d849d45f0c36) | [The_Structure_World](https://sketchfab.com/The_Structure_World) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Palm Trees](https://sketchfab.com/3d-models/palm-trees-20f8a8d5054b4191afb7cf3270dbd586) | [ElectroNick](https://sketchfab.com/ElectroNick) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [AMMO BOX](https://sketchfab.com/3d-models/ammo-box-69e948afac224745a943db329407d746) | [miskinrahul](https://sketchfab.com/miskinrahul) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Tank Tiger](https://sketchfab.com/3d-models/tank-tiger-c23b94ebfb2c47d1980716ad3183fdee) | [imp16s](https://sketchfab.com/loguntsova) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Futuristic Tank](https://sketchfab.com/3d-models/futuristic-tank-f059495c88f54c8ba290046106bb294d) | [Tom Zimmermann](https://sketchfab.com/tomm8) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Moss Rock 14 (Free) Rock Pack Vol.2](https://sketchfab.com/3d-models/moss-rock-14-free-rock-pack-vol2-f612d3d436784570a19893e89c94019f) | [Kless Gyzen](https://sketchfab.com/klessgyzen) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [The fir - winter and summer](https://sketchfab.com/3d-models/the-fir-winter-and-summer-da0fe1f2d385483d9bf5626834056653) | [LadyIReyna](https://sketchfab.com/LadyIReyna) | [CC-BY-NC-4.0](http://creativecommons.org/licenses/by-nc/4.0/) |
| [[Free Asset] Snowy Rock 01](https://sketchfab.com/3d-models/free-asset-snowy-rock-01-d97d4f6d5b6d45a2aa77000eb1234118) | [scrampunk](https://sketchfab.com/scrampunk) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Ствол боярышника.](https://sketchfab.com/3d-models/49d89d1ab81f4ef0b10754e8c0f85a1b) | [dima051983](https://sketchfab.com/dima051983) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Tank Tiger 2](https://sketchfab.com/3d-models/tank-tiger-2-f23650309a294143a7811737ca314219) | [maximus0075550](https://sketchfab.com/maximus0075550) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Tumbleweed Jumping](https://sketchfab.com/3d-models/tumbleweed-jumping-00247b1c98ee440dad9a6abbc43a29bf) | [ThymKruijt](https://sketchfab.com/superkiller080) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |
| [Wintercabin](https://sketchfab.com/3d-models/wintercabin-f2a4802437294455973260c141cc304d) | [Thunder](https://sketchfab.com/thunderpwn) | [CC-BY-SA-4.0](http://creativecommons.org/licenses/by-sa/4.0/) |
| [Single Room Building WWII](https://sketchfab.com/3d-models/single-room-building-wwii-95dec2f46ca3487984341d9ad433218e) | [danieljorge435](https://sketchfab.com/danieljorge435) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) |

| Texture | Author | License |
| :------ |:------:| -------:|
| [Coast Sand Rocks 02](https://polyhaven.com/a/coast_sand_rocks_02) | [Rob Tuytel](https://www.artstation.com/tuytel) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| [Coast Sand 02](https://polyhaven.com/a/coast_sand_rocks_02) | [Rob Tuytel](https://www.artstation.com/tuytel) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| [Snow 02](https://polyhaven.com/a/coast_sand_rocks_02) | [Rob Tuytel](https://www.artstation.com/tuytel) | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |


# Audio sources

[Crush8-Bit.ogg](https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg), 
[Explosion2.wav](http://schaeffer.ludo.free.fr/worms/DATA/Wav/Effects/Explosion2.wav), 
[plop.mp3](https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/plop.mp3), 
[Collision8-Bit.ogg](http://commondatastorage.googleapis.com/codeskulptor-assets/Collision8-Bit.ogg), 
[minplace.wav](http://www.utc.fr/si28/ProjetsUpload/P2006_si28p004/flash_puzzle/sons/rush/mineplace.wav), 
[Human-Applause-LargeCrowd01.mp3](http://sfxcontent.s3.amazonaws.com/soundfx/Human-Applause-LargeCrowd01.mp3)
