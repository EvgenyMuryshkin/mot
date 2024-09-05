import { AlgebraFunc, eAnswerType, IMathFunc, MathFunc } from "../MathFunc";
import { ITwoOperandFuncState } from "../types/types";

export class SubtractionFunc extends AlgebraFunc implements IMathFunc<ITwoOperandFuncState, number> {
    title: string = "Subtraction";
    generateState(): ITwoOperandFuncState {
        const a = this.randomInteger(1, 10);
        const b = this.randomInteger(1, 10);

        return {
            a: Math.max(a, b),
            b: Math.min(a, b)
        }
    }
    
    answerType() { return eAnswerType.Numeric; }

    formula(state: ITwoOperandFuncState) {
        if (!state) return "";

        return `${state.a} - ${state.b}`;
    }

    answer(state: ITwoOperandFuncState) { return state.a - state.b }
    check(state: ITwoOperandFuncState, answer: number) {
        if (!state) return false;

        return this.checkAnswer(state.a - state.b, answer)
    }
}