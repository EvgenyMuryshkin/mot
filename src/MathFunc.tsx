export interface IMathFunc<TState extends any = any> {
    title: string;
    generateState: () => TState;
    formula: (state: TState) => string;
    check: (state: TState, answer: number) => boolean;
}

export class MathFunc {
    protected randomInteger(minInclusive: number, maxInclusive: number) {
        return Math.round(minInclusive + Math.random() * (maxInclusive - minInclusive));
    }
    
    protected checkAnswer(extected: number, actual: number) {
        return Math.abs(extected - actual) < 1e-5;
    }
}