import React, { useRef, useState } from 'react';
import { CoordinatesPlane2D } from '../components/CoordinatesPlane2D';
import { ILine, IPoint } from '../types/types';
import { eAnswerType, Geometry2DFunc, IMathFunc } from '../MathFunc';

interface IPlottingState {
    m: number;
    b: number;
}

export class LinePlottingFunc extends Geometry2DFunc implements IMathFunc<IPlottingState, ILine> {
    title: string = "Line Plotting";

    formula(state: IPlottingState) {
        return `y = ${state.m} * x ${this.signString(state.b)} ${Math.abs(state.b)}`;
    }
    
    answerType() { return eAnswerType.Line; }

    generateState(): IPlottingState {
        return {
            m: this.randomInteger(-5, 5),
            b: this.randomInteger(-5, 5)
        }
    };

    answer(state: IPlottingState): ILine { 
        return { m: state.m, b: state.b };
    }

    check(state: IPlottingState, answer: ILine) {
        console.log(state, answer);
        return this.checkAnswer(state.m, answer.m) && this.checkAnswer(state.b, answer.b);
    }
}