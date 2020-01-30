
function GamePlay() {
    this.level = 0;
    this.lines = 0
    this.points = 0;
}

GamePlay.prototype.addPoints = function addPoints(numLines) {
    switch(numLines) {
        case 1:
            return this.points += (40 * (this.level + 1));
        case 2:
            return this.points += (100 * (this.level + 1));
        case 3:
            return this.points += (300 * (this.level + 1));
        case 4:
            return this.points += (1200 * (this.level + 1))
    }
}