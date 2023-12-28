import { IMathFunc, MathFunc } from "../MathFunc";
import { ITwoOperandFuncState } from "./types";

export class SubtractionFunc extends MathFunc implements IMathFunc<ITwoOperandFuncState> {
    title: string = "Subtraction";
    generateState(): ITwoOperandFuncState {
        const a = this.randomInteger(1, 10);
        const b = this.randomInteger(1, 10);

        return {
            a: Math.max(a, b),
            b: Math.min(a, b)
        }
    }

    formula(state: ITwoOperandFuncState) {
        if (!state) return "";

        return `${state.a} - ${state.b}`;
    }

    check(state: ITwoOperandFuncState, answer: number) {
        if (!state) return false;

        return this.checkAnswer(state.a - state.b, answer)
    }
}