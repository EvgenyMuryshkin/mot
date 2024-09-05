import React, { useState } from 'react';
import './App.scss';
import { MathView } from './MathView';
import { eAnswerType, IMathFunc } from './MathFunc';
import { AdditionFunc } from './functions/addition';
import { SubtractionFunc } from './functions/subtraction';
import { MultiplicationFunc } from './functions/multiplication';
import { DivisionFunc } from './functions/division';
import { LinePlottingFunc } from './functions/line-plotting';
import { ILine, IPoint, MathTools } from './types/types';
import { CoordinatesPlane2D } from './components/CoordinatesPlane2D';

const functions: IMathFunc<any, any>[] = [
  new AdditionFunc(),
  new SubtractionFunc(),
  new MultiplicationFunc(),
  new DivisionFunc(),
  new LinePlottingFunc()
]

function App() {
  const [currentFunction, setCurrentFunction] = useState<IMathFunc<any, any> | null>(null);
  const [currentState, setCurrentState] = useState<any>(null);
  const [currentAnswer, setCurrentAnswer] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [points, setPoints] = useState<IPoint[]>([]);
  const [lines, setLines] = useState<ILine[]>([]);
  const [isChecked, setIsChecked] = useState<boolean | null>(null);

  const formula = currentFunction?.formula(currentState);
  const answerType = currentFunction?.answerType();

  let answerComponent: JSX.Element = null;
  switch (answerType) {
    case eAnswerType.Numeric: {
      answerComponent = <input 
        type='number' 
        value={currentAnswer} 
        onChange={e => setCurrentAnswer(parseInt(e.target.value))}
      />
    } break;
    case eAnswerType.Line: {      
      answerComponent = (
        <CoordinatesPlane2D
          snapToIntegers={true}
          points={points}
          lines={lines}
          segments={[]}
          setPoints={newPoints => {
            if (isChecked !== null) return;
            
            while (newPoints.length > 2) {
              newPoints = newPoints.splice(2);
            }
            setPoints(newPoints);
          }}
          />
      );
    } break;
  }

  const checkAnswer = () => {
    if (isChecked !== null) return;

    switch(answerType) {
      case eAnswerType.Numeric: {
        if (currentFunction.check(currentState, currentAnswer)) {
          setIsChecked(true);
          setCorrectAnswers(correctAnswers + 1);
          setCurrentState(currentFunction?.generateState());
          setCurrentAnswer(0);
        }
        else {
          setIsChecked(false);
          setWrongAnswers(wrongAnswers + 1);
        }
      } break;
      case eAnswerType.Line: {
        const currentAnswer: ILine = { 
          ...MathTools.lineFromPoints(points[0], points[1]), 
          color: "red",
          strokeWidth: 3
        }

        const rightAnswer: ILine = { 
          ...currentFunction.answer(currentState), 
          color: "lime",
          strokeWidth: 3
        }
        
        if (currentFunction.check(currentState, currentAnswer)) {
          setIsChecked(true);
          setCorrectAnswers(correctAnswers + 1);
          setLines([rightAnswer]);

          /*
          setCurrentState(currentFunction?.generateState());
          setPoints([]);
          setLines([]);
          */
        }
        else {
          setIsChecked(false);
          setWrongAnswers(wrongAnswers + 1);
          setLines([currentAnswer, rightAnswer]);
        }
      } break;
    }
  }

  const answerTitle = <span>
    {isChecked === null ? "Answer" : "Answer is "}
    {isChecked === true && <strong>CORRECT</strong>}
    {isChecked === false && <strong>INCORRECT</strong>}
  </span>

  return (
    <div className="App">
      <div className='catalogue'>
        {functions.map((f, idx) => {
        return <div 
          className='functionSelector'
          key={idx} 
          onClick={() => {
          setCurrentFunction(f);
          setCurrentState(f.generateState());
        }}>{f.title}</div>})}
      </div>
      {
        !currentFunction && <div className='workspace'>&lt;== Please select tasks</div>
      }
      {currentFunction && <div className='workspace'>
        <div>
          {currentFunction?.title}
        </div>
        <div>
          {formula && <MathView formula={formula}/>}
        </div>
        <div>
          {answerTitle}
        </div>
        <div>
          {answerComponent}
        </div>
        <div>
          <button onClick={() => {
              checkAnswer();
            }}>Check</button>
          <button disabled={currentFunction == null} onClick={() => {
            setIsChecked(null);
            setCurrentState(currentFunction?.generateState());
            setPoints([]);
            setLines([]);
          }}>Next</button>        
        </div>
        </div>
      }
      <div className='results'>
        <table>
          <tr>
            <td>Correct: </td>
            <td>{correctAnswers}</td>
          </tr>
          <tr>
            <td>Wrong: </td>
            <td>{wrongAnswers}</td>
          </tr>
          <tr>
            <td>Total: </td>
            <td>{correctAnswers + wrongAnswers}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
