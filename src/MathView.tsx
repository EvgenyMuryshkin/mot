import React from "react";
import "mathlive";
import { MathfieldElement } from 'mathlive';
declare global {
    namespace JSX {
      interface IntrinsicElements {
        'math-field': React.DetailedHTMLProps<React.HTMLAttributes<MathfieldElement>, MathfieldElement>;
      }
    }
}

interface IMathViewProps {
    formula: string;
}

interface IMathViewState {
    formula: string;
}

export class MathView extends React.Component<IMathViewProps, IMathViewState> {
    constructor(props: IMathViewProps) {
        super(props);
        this.state = {
            formula: props.formula
        }
    }

    componentDidMount(): void {
        this.setState({
            formula: this.props.formula
        })    
    }
    componentDidUpdate(prevProps: Readonly<IMathViewProps>, prevState: Readonly<IMathViewState>, snapshot?: any): void {
        if (this.props !== prevProps) {
            this.setState({
                formula: null
            }, () => {
                this.setState({
                    formula: this.props.formula
                })
            })
        }
    }

    render() {
        const { formula } = this.state;
        if (!formula) return null;

        return (
            <div>
                <math-field 
                ref={mf => {
                    if (!mf) return;
                    mf.mathVirtualKeyboardPolicy = "manual";
                    //mf.readOnly = true;
                    mf.smartFence = true;
                }} 
                onInput={evt => {
                    const v = (evt as any).target.value;
                    console.log(v);
                    //setValue(v);
                }}
                >
                {formula}
                </math-field>
            </div>
        );
    }
}
