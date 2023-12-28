import { IMathFunc, MathFunc } from "../MathFunc";
import { ITwoOperandFuncState } from "./types";

export class DivisionFunc extends MathFunc implements IMathFunc<ITwoOperandFuncState> {
    title: string = "Division";
    generateState(): ITwoOperandFuncState {
        const b = this.randomInteger(1, 10);
        const result = this.randomInteger(1, 10);
        return {
            a: result * b,
            b: b
        }
    }

    formula(state: ITwoOperandFuncState) {
        if (!state) return "";

        return `\\frac{${state.a}}{${state.b}}`;
    }

    check(state: ITwoOperandFuncState, answer: number) {
        if (!state) return false;

        return this.checkAnswer(state.a / state.b, answer)
    }
}