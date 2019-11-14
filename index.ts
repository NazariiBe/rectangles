function flow(... fs: Function[]) {
    return (val) => fs.reduce((result, f) => f(result), val)
}

function combine(... fs: Function[]) {
    return flow(...fs.reverse())
}

function map<T>(f: (value: T, index: number, array: T[]) => unknown): Function {
    return (arr: T[]) => arr.map(f)
}

function filter<T>(f: (value: T) => boolean): Function {
    return (arr: T[]) => arr.filter(f)
}

function reduce<T>(f: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): Function {
    if (initialValue != undefined)
        return (arr: T[]) => arr.reduce(f, initialValue)
    else
        return (arr: T[]) => arr.reduce(f)
}

class Rectangle {
    private width: number
    private height: number
    private color: string 

    constructor(width: number, heigth: number, color: string) {
        this.width = width
        this.height = heigth
        this.color = color
    }

    public getColor(): string {
        return this.color
    }

    public getPerimeter(): number {
        return this.width * 2 + this.height * 2
    }

    public getSquare(): number {
        return this.height * this.width;
    }

    public isQuadrate(): boolean {
        return this.width == this.height
    }
}

function generateRectangles(totalCount: number): Rectangle[] {
    const rectangles: Rectangle[] = []
    for (let i: number = 0; i < totalCount; i++) {
        const width: number = getRandomInt(1, 10)
        const heigth: number = getRandomInt(1, 10)
        const color: string = colors[getRandomInt(0, colors.length - 1)]

        rectangles.push(new Rectangle(width, heigth, color))
    }
    return rectangles
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const colors: string[] = ["red", "green", "blue", "black"]
const rectangles: Rectangle[] = generateRectangles(100)

function hasColor(color: string): (r: Rectangle) => boolean {
    return (r: Rectangle) => r.getColor() == color
}

const isRed = hasColor("red")
const isBlack = hasColor("black")

flow(
    filter(isBlack),
    filter((r: Rectangle) => r.isQuadrate()),
    map((r: Rectangle) => r.getSquare()),
    reduce((a: number, b: number) => a = Math.max(a, b), 0),
    console.log
)(rectangles)

flow(
    filter(isRed),
    map((r: Rectangle) => r.getPerimeter()),
    reduce((result: number, current: number) => result += current, 0),
    console.log
)(rectangles)