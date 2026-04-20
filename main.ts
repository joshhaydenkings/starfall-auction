namespace SpriteKind {
    export const Gold = SpriteKind.create()
    export const Silver = SpriteKind.create()
    export const Junk = SpriteKind.create()
}
function triggerOverload () {
    if (overloaded == false) {
        overloaded = true
        controller.moveSprite(ship, 0, 0)
        ship.sayText("OVERLOADED!", 2000, false)
        scene.cameraShake(4, 500)
        junkStreak = 0
        pause(2000)
        if (gameActive == true) {
            controller.moveSprite(ship, normalSpeed, 0)
        }
        overloaded = false
    }
}
function spawnJunkCrate () {
    crate = sprites.create(img`
        2 2 2 2 2 2 2 2 
        2 e e c e e e 2 
        2 e c e e c e 2 
        2 c e e c e e 2 
        2 e e c e e c 2 
        2 e c e e c e 2 
        2 e e e c e e 2 
        2 2 2 2 2 2 2 2 
        `, SpriteKind.Junk)
    crate.setPosition(randint(10, 150), 0)
    crate.setVelocity(0, randint(40, 60) + fallSpeedBonus)
}
function spawnGoldCrate () {
    crate = sprites.create(img`
        4 4 4 4 4 4 4 4 
        4 5 5 5 5 5 5 4 
        4 5 3 3 3 3 5 4 
        4 5 3 1 1 3 5 4 
        4 5 3 1 1 3 5 4 
        4 5 3 3 3 3 5 4 
        4 5 5 5 5 5 5 4 
        4 4 4 4 4 4 4 4 
        `, SpriteKind.Gold)
    crate.setPosition(randint(10, 150), 0)
    crate.setVelocity(0, randint(55, 75) + fallSpeedBonus)
}
function spawnSilverCrate () {
    crate = sprites.create(img`
        1 1 1 1 1 1 1 1 
        1 d d d d d d 1 
        1 d c c c c d 1 
        1 d c 1 1 c d 1 
        1 d c 1 1 c d 1 
        1 d c c c c d 1 
        1 d d d d d d 1 
        1 1 1 1 1 1 1 1 
        `, SpriteKind.Silver)
    crate.setPosition(randint(10, 150), 0)
    crate.setVelocity(0, randint(45, 65) + fallSpeedBonus)
}
info.onCountdownEnd(function () {
    if (value == targetScore) {
        gameActive = false
        game.gameOver(true)
    } else {
        gameActive = false
        game.gameOver(true)
    }
})
function spawnCrate () {
    if (gameActive == true) {
        roll = randint(1, 10)
        if (roll <= 2) {
            spawnGoldCrate()
        } else if (roll <= 6) {
            spawnSilverCrate()
        } else {
            spawnJunkCrate()
        }
    }
}
info.onLifeZero(function () {
    gameActive = false
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Junk, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(-2)
    junkStreak += 1
    music.play(music.tonePlayable(131, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    if (junkStreak >= 3) {
        triggerOverload()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Silver, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    junkStreak = 0
    music.play(music.tonePlayable(392, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gold, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(3)
    junkStreak = 0
    music.play(music.tonePlayable(523, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
})
let roll = 0
let value = 0
let crate: Sprite = null
let targetScore = 0
let fallSpeedBonus = 0
let gameActive = false
let overloaded = false
let junkStreak = 0
let normalSpeed = 0
let ship: Sprite = null
game.splash("Starfall Auction")
game.splash("Gold +3 Silver +1 Junk -2")
game.splash("Reach 20 before time runs out")
info.setScore(0)
info.setLife(3)
info.startCountdown(90)
scene.setBackgroundColor(15)
ship = sprites.create(img`
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . 1 9 9 1 . . . . . . 
    . . . . . 1 9 9 9 9 1 . . . . . 
    . . . . 1 9 9 8 8 9 9 1 . . . . 
    . . . 1 9 9 8 8 8 8 9 9 1 . . . 
    . . 1 9 9 8 8 1 1 8 8 9 9 1 . . 
    . . 1 9 8 8 8 1 1 8 8 8 9 1 . . 
    . 1 9 8 8 8 8 8 8 8 8 8 8 9 1 . 
    1 9 8 8 8 8 8 8 8 8 8 8 8 8 9 1 
    . 1 9 8 8 8 8 8 8 8 8 8 8 9 1 . 
    . . 1 9 8 8 8 8 8 8 8 8 9 1 . . 
    . . . 1 9 8 8 8 8 8 8 9 1 . . . 
    . . . 1 9 9 8 . . 8 9 9 1 . . . 
    . . 1 9 9 . 8 . . 8 . 9 9 1 . . 
    . 1 9 9 . . 1 . . 1 . . 9 9 1 . 
    . . 1 . . . . . . . . . . 1 . . 
    `, SpriteKind.Player)
ship.setPosition(80, 108)
ship.setStayInScreen(true)
controller.moveSprite(ship, 120, 0)
normalSpeed = 120
junkStreak = 0
overloaded = false
gameActive = true
fallSpeedBonus = 0
targetScore = 20
game.onUpdate(function () {
    if (gameActive == true) {
        for (let value of sprites.allOfKind(SpriteKind.Gold)) {
            if (value.y > 120) {
                sprites.destroy(value)
                info.changeLifeBy(-1)
            }
        }
        for (let value of sprites.allOfKind(SpriteKind.Silver)) {
            if (value.y > 120) {
                sprites.destroy(value)
                info.changeLifeBy(-1)
            }
        }
        for (let value of sprites.allOfKind(SpriteKind.Junk)) {
            if (value.y > 120) {
                sprites.destroy(value)
                info.changeLifeBy(-1)
            }
        }
        if (value > targetScore) {
            gameActive = false
            game.gameOver(true)
        }
    }
})
game.onUpdateInterval(2000, function () {
    spawnCrate()
})
game.onUpdateInterval(10000, function () {
    if (gameActive == true) {
        fallSpeedBonus += 5
    }
})
