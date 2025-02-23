const _width = 800, _height = 600;
let lbat, rbat, ball;

function setup() {
    createCanvas(_width, _height);
    lbat = new lBat();
    rbat = new rBat();
    ball = new Ball();
}

function draw() {
    background(150);
    lbat.display();
    lbat.update();
    rbat.display();
    rbat.update();
    scoreboard();
    ball.update();
    ball.display();
}

class Bat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.d = {
            y: _height / 4,
            x: _height / 36
        }
        this.score = 0;
    }

    display() {
        rect(this.x, this.y, this.d.x, this.d.y);
    }
}

class lBat extends Bat {
    constructor() {
        super(15, 50);
    }
    
    update() {
        if(keyIsDown(83) && this.y <= _height - this.d.y) this.y += 5;
        else if(keyIsDown(87) && this.y >= 0) this.y -= 5;

        if(ball.y >= this.y && ball.y <= this.y + this.d.y && ball.x - ball.d / 2 <= this.x + this.d.x) {
            ball.velo.x *= -1;
        }
    }
}

class rBat extends Bat {
    constructor() {
        super(_width - 15 - _height / 36, 50);
    }

    update() {
        if(keyIsDown(40) && this.y <= _height - this.d.y) this.y += 5;
        else if(keyIsDown(38) && this.y >= 0) this.y -= 5;

        if(ball.y >= this.y && ball.y <= this.y + this.d.y && ball.x + ball.d / 2 >= this.x) {
            ball.velo.x *= -1;
        }
    }
}

class Ball {
    constructor() {
        this.x = _width / 2;
        this.y = _height / 2;
        this.d = _height / 15;
        this.velo = {x: -3, y: 3};
    }

    display() {
        circle(this.x, this.y, this.d);
    }

    update() {
        this.x += this.velo.x;
        this.y += this.velo.y;
        if(this.x + this.d / 2 > _width) goal('r');
        else if(this.x - this.d / 2 < 0) goal('l');

        if(this.y + this.d / 2 > _height) this.velo.y *= -1;
        else if(this.y - this.d / 2 < 0) this.velo.y *= -1;
    }
}

function goal(side) {
    switch(side) {
        case 'l':
            ball.velo.x *= -1;
            rbat.score++;
            break;
        case 'r':
            ball.velo.x *= -1
            lbat.score++;
    }
}

function scoreboard() {
    push();
    noFill();
    rect(_width / 3, 0, _width / 3, _height / 6);
    pop();
    push();
    textSize(_width / 10);
    textAlign(CENTER, CENTER);
    text(lbat.score, _width / 3 + _width / 12, _height / 12);
    text(":", _width / 2, _height / 14);
    text(rbat.score, _width - (_width / 3 + _width / 12), _height / 12)
    pop();
}