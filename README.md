***
# <p  align="center">[Tank 3D Game with Babylonjs](https://noebernigaud.github.io/Tank3D/src/)<p>
## <p  align="center">by DNA games<p>
***

| <b>Trailer</b> | <b>Gameplay</b> |
|:-------------------------:|:-------------------------:|
|[![TRAILER](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE) | [![TRAILER](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)|
  
***

# Goal 
  The goal of this project was the creation of a 3D Tank Game with [<b>Babylon.js</b>](https://www.babylonjs.com/) in Spring of 2022 for the Game on Web 2022 contest. The theme was "you are unique".
  
***

# The DNA games team

VENTURELLI Antoine | FISSORE Davide | BERNIGAUD Noé 
:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://zupimages.net/up/22/19/39hp.png" alt="Venturelli Antoine" width="200"/> | <img src="https://zupimages.net/up/22/19/di99.png" alt="Architecture Dossiers" width="200"/> | <img src="https://zupimages.net/up/22/19/dak6.png" alt="BERNIGAUD Noé" width="200"/>

We are three students at the University of Côte d'Azur in M1 of Computer Science. Together, we form <b>DNA games</b>, a team formed to develop this project from start to end.

We also want to mention <b>BUFFA Michel</b>, who encouraged us to participate to the contest and was our Babylonjs professor.
  
***

# Code Development, Implemented Features

## Origin

[<img align="left" src="https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg" width="200"/>](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)
  
The concept has been based on Noé Bernigaud's project of a Tank game in 2D written in Javascript on [<b>this Github repository</b>](https://github.com/noebernigaud/TankGame), which itself was inspired from the game WiiPlay - Tanks. With Babylonjs, we saw an opportunity to push the game much further and expand the game's feature to make a more complete game out of it.

While the idea was taken from there, nothing from the code is common between both version as we had to remake everything and use the physic engine.

<br clear="right"/>
  
<br>
  
***

## Engine
  
[<img align="left" src="https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg" width="200"/>](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)

At first, we started by building the engine of the engine, which would later rule all the game's interactions and mechanics.This was the most difficult part of the development, as problems that would seem quite simple could take a lot of time to solve. Moreover, we were beginners in Babylonjs, and bending the physic engine to our needs wasn't always the easy.

Some noteworthy difficulties were the implementation of the tank's movements, in particular setting up the friction, to create natural movement. Another difficult part was the physic of the bullets. We wanted them to be rather slow so the players could avoid them, making the game a lot more fun, but we also wanted to use the physic engine to make the bullets bounce.

The engine's development is also the period where we learned to use our first tank models, created the bricks of the interaction between the player and the game, and made our first animations. the game was rather basic at this point and there was no gameplay, but it had all the fundations to build up the rest of our game.

Here is a version of the game by the end of the engine's development LINK. There was still a couple of issues in the engine that we would eventually correct later, but we were quite happy about this first step and ready to start implementing the game's feature.
  
***

## World Development

What marked the transition between the engine's development and the features development was the introduction of the heightmap. This was a game-changer both for graphics and gameplay. After that, we developped menus, different levels, added new models, and changed our empty world into a beautiful island. We also introduced the sounds and music, and build a function to make sound's volumes dynamic depending on the distance of the emitter relative to the player.

The opponents' AI was then deployed, as well as multiple level objectives. One of the main challenge for the AI was to keep it simple but also make it look natural and interesting, and we are very happy about the current result. Another big part was to make the AI stay in the island and not go into the water, and to make it target the player, which were respectively solved with invisible delimiters and invisible rays.

Later on, we built levels with specific missions, such as timed levels, levels where you would have to find some items, or ennemies that could only be damaged once the player fullfil a condition. This variety in the gameplay and objectives allows the game to be less repetitive, and keep players on their toes.
  
***

## Controls

The next part was to improve the controls - up until now, the aim was donne with the keyboard's arrow keys. You can still do it now, but we wanted to also give to the player the possibility to aim with their mouse, as it would feel much more natural, dynamic, and precise. Requesting pointerlock to capture the mouse into the game was tricky as navigators have strict standards regarding this, and we also wanted to give back the mouse to the player in menus, but we were eventually successful in its implementation.
  
***

## Bonuses
  
[<img align="left" src="https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg" width="200"/>](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)

At this point, the game was starting to look like a complete game. We had gameplay with different levels and ennemies, a good-looking map, a rudimentary menu, and the tank felt pleasant to control. However, it was still lacking some fun gameplay and discovery factor. It was time to implement the bonus feature, which would make our game into a roguelike, very fitting of the theme "You are unique".

Special bonuses were a particularly fun stage of the development, as they made the game a lot more enjoyable. While they took a lot of time to implement, the whole engine we already built was making the whole process a lot easier, giving more space to our imagination and to testing.

With 9 Special Bonuses, 5 Normal ones, and 9 Normal Bonuses associated to their special bonuses there are approximatively 5000 possible (3 parmis 9 x (7 normal bonus opportunities x 8 possible bonus)) different tanks that can be built through game. This makes the game a lot more interesting to re-play, and give sense to the theme "you are unique", as the tank you are playing by the end of the game is likely unique across all games played and all players.
  
***

## Performances

One major concern for the game was performance issue. Quickly after introducing the Heightmap and complex models, we began to experiment large fps drops, to the point where the game was not enjoyable anymore. The game wasn't very CPU-intensive as we wrote our code while being able of its complexity, but it was the rendering that was difficult for computers.

By default, a lot of computers use their integrated GPU by default for web application, which isn't built for 3D-rendering. It is impossible to force from the code the computer to use its dedicated GPU, which is much more powerful, as it has to be done in the computer's system parameters. Therefore, we had to take the performance issue at heart, so the game could run even on integrated GPUs.

Particules, models, and the Heightmap were all re-adjusted to make the game run at a good fps number and make things enjoyable again, even on slow integrated GPU.

Note: if you think you web browser might be running on your computer's integrated GPU and want to make it run on your dedicated one (if you have one), check out [<b>this tutorial (Windows)</b>](https://www.amd.com/en/support/kb/faq/gpu-110). While the game should run fine even on low-end integrated GPUs, using the dedicated GPU will help make sure you don't experience any fps drop aven in the most ressource-intensive situations.
  
***

# Audio source 

[Crush8-Bit.ogg](https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg), 
[Explosion2.wav](http://schaeffer.ludo.free.fr/worms/DATA/Wav/Effects/Explosion2.wav), 
[plop.mp3](https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/plop.mp3), 
[Collision8-Bit.ogg](http://commondatastorage.googleapis.com/codeskulptor-assets/Collision8-Bit.ogg), 
[minplace.wav](http://www.utc.fr/si28/ProjetsUpload/P2006_si28p004/flash_puzzle/sons/rush/mineplace.wav), 
[Human-Applause-LargeCrowd01.mp3](http://sfxcontent.s3.amazonaws.com/soundfx/Human-Applause-LargeCrowd01.mp3)
