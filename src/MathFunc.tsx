import { ITwoOperandFuncState } from "./types/types";

export interface IAnswer {

}

export interface INumericAnswer extends IAnswer {

}

export enum eAnswerType {
    Numeric,
    Line
}

export interface IQuestionFunc<TState extends any = any, TAnswer extends any = any> {
    title: string;
    formula: (state: TState) => string;
    answerType: () => eAnswerType;
    generateState: () => TState;
    check: (state: TState, answer: TAnswer) => boolean;
    answer: (state: TState) => TAnswer;
} 

export interface IMathFunc<TState extends any, TAnswer extends IAnswer> extends IQuestionFunc<TState, TAnswer> {
}

export class MathFunc {
    protected signString(value: number) {
        return value < 0 ? "-" : "+";
    }

    protected randomInteger(
        minInclusive: number, 
        maxInclusive: number) {
        return Math.round(minInclusive + Math.random() * (maxInclusive - minInclusive));
    }

    protected checkAnswer(extected: number, actual: number) {
        return Math.abs(extected - actual) < 1e-5;
    }
}

export class AlgebraFunc extends MathFunc {   
}

export class Geometry2DFunc extends MathFunc {   
}