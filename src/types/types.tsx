export interface ITwoOperandFuncState {
    a: number;
    b: number;
}

export interface IGeometryObject {
    color?: string;
    strokeWidth?: number;
}

export interface IPoint extends IGeometryObject {
    x: number;
    y: number;
}

export interface ILine extends IGeometryObject {
    m: number;
    b: number; 
    constX?: number;
}

export interface ISegment extends IGeometryObject {
    s1: IPoint;
    s2: IPoint;
}

export interface ICircle extends IGeometryObject {
    c: IPoint;
    r: number;
}

export class MathTools {
    static lineFromPoints(l1: IPoint, l2: IPoint): ILine {
        if (l2.x == l1.x)
            return { m: 0, b: 0, constX: l1.x };

        const m = (l2.y - l1.y) / (l2.x - l1.x);
        const b = l1.y - m * l1.x;

        return { m, b };
    }

    static lineAtX(line: ILine, x: number): IPoint {
        return { x, y: line.m * x + line.b };
    }
    static linePoints(line: ILine, infValue: number): IPoint[] {
        if (!line) return [];

        if (line.constX) {
            return [{ x: line.constX, y: -infValue }, { x: line.constX, y: infValue }]; 
        }

        return [
            MathTools.lineAtX(line, -infValue),
            MathTools.lineAtX(line, infValue),
        ]
    }
}