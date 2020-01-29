const createPiece = (type) => {
    if (type === "T") {
        //color: palevioletred  #db91ac
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
    } else if (type === "Z") {
        //color: saddlebrown #933d26
        return [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ];
    } else if (type === "S") {
        //color: 
        return [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ];
    } else if (type === "L") {
        //color: orange
        return [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ];
    } else if (type === "J") {
        //color: blue
        return [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ];
    } else if (type === "I") {
        //color: cyan
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ];
    } else if (type === "O") {
        //color: yellow
        return [
            [1, 1],
            [1, 1]
        ];
    };
};