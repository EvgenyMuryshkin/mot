import { AlgebraFunc, eAnswerType, IMathFunc, MathFunc } from "../MathFunc";
import { ITwoOperandFuncState } from "../types/types";

export class AdditionFunc extends AlgebraFunc implements IMathFunc<ITwoOperandFuncState, number> {
    title: string = "Addition";
    generateState(): ITwoOperandFuncState {
        return {
            a: this.randomInteger(1, 10),
            b: this.randomInteger(1, 10)
        }
    }
    
    answerType() { return eAnswerType.Numeric; }

    formula(state: ITwoOperandFuncState) {
        if (!state) return "";

        return `${state.a} + ${state.b}`;
    }

    answer(state: ITwoOperandFuncState) { return state.a + state.b }
    check(state: ITwoOperandFuncState, answer: number) {
        if (!state) return false;

        return this.checkAnswer(state.a + state.b, answer)
    }
}