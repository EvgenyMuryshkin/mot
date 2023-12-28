import React, { useState } from 'react';
import './App.scss';
import { MathView } from './MathView';
import { IMathFunc } from './MathFunc';
import { AdditionFunc } from './functions/addition';
import { SubtractionFunc } from './functions/subtraction';
import { MultiplicationFunc } from './functions/multiplication';
import { DivisionFunc } from './functions/division';

const functions: IMathFunc[] = [
  new AdditionFunc(),
  new SubtractionFunc(),
  new MultiplicationFunc(),
  new DivisionFunc()
]

function App() {
  const [currentFunction, setCurrentFunction] = useState<IMathFunc | null>(null);
  const [currentState, setCurrentState] = useState<any>(null);
  const [currentAnswer, setCurrentAnswer] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const formula = currentFunction?.formula(currentState);

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
          <MathView formula={formula}/>
        </div>
        <div>
          Answer
        </div>
        <div>
          <input type='number' value={currentAnswer} onChange={e => setCurrentAnswer(parseInt(e.target.value))}/>
        </div>
        <div>
          <button onClick={() => {
              if (currentFunction.check(currentState, currentAnswer)) {
                setCorrectAnswers(correctAnswers + 1);
                setCurrentState(currentFunction?.generateState());
                setCurrentAnswer(0);
              }
              else {
                setWrongAnswers(wrongAnswers + 1);
              }
            }}>Check</button>
          <button disabled={currentFunction == null} onClick={() => {
            setCurrentState(currentFunction?.generateState());
          }}>Next</button>        
        </div>
        </div>
      }
      <div className='results'>
        {correctAnswers}/{wrongAnswers}/{correctAnswers + wrongAnswers}
      </div>
    </div>
  );
}

export default App;
