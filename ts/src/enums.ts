enum Directions {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

enum Directions2 {
    UP = 5,
    DOWN,
    LEFT,
    RIGHT
}

function enumFunc(x: Directions) {
    console.log(x);
}

console.log(Directions.DOWN, Directions.RIGHT);
console.log(Directions2.DOWN, Directions2.RIGHT);
enumFunc(Directions.UP);
