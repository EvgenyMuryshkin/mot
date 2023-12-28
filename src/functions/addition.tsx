import { IMathFunc, MathFunc } from "../MathFunc";
import { ITwoOperandFuncState } from "./types";

export class AdditionFunc extends MathFunc implements IMathFunc<ITwoOperandFuncState> {
    title: string = "Addition";
    generateState(): ITwoOperandFuncState {
        return {
            a: this.randomInteger(1, 10),
            b: this.randomInteger(1, 10)
        }
    }

    formula(state: ITwoOperandFuncState) {
        if (!state) return "";

        return `${state.a} + ${state.b}`;
    }

    check(state: ITwoOperandFuncState, answer: number) {
        if (!state) return false;

        return this.checkAnswer(state.a + state.b, answer)
    }
}