import { AlgebraFunc, eAnswerType, IMathFunc, MathFunc } from "../MathFunc";
import { ITwoOperandFuncState } from "../types/types";

export class DivisionFunc extends AlgebraFunc implements IMathFunc<ITwoOperandFuncState, number> {
    title: string = "Division";
    generateState(): ITwoOperandFuncState {
        const b = this.randomInteger(1, 10);
        const result = this.randomInteger(1, 10);
        return {
            a: result * b,
            b: b
        }
    }
    
    answerType() { return eAnswerType.Numeric; }

    formula(state: ITwoOperandFuncState) {
        if (!state) return "";

        return `\\frac{${state.a}}{${state.b}}`;
    }

    answer(state: ITwoOperandFuncState) { return state.a / state.b }
    check(state: ITwoOperandFuncState, answer: number) {
        if (!state) return false;

        return this.checkAnswer(state.a / state.b, answer)
    }
}