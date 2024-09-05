import { useState } from "react";
import { ILine, IPoint, ISegment, MathTools } from "../types/types";

interface IProps {
    snapToIntegers: boolean;
    points: IPoint[];
    lines: ILine[];
    segments: ISegment[];
    setPoints: (points: IPoint[]) => void;
}

const svgSize = 650;

export function CoordinatesPlane2D(props: IProps) {
    const {
        snapToIntegers,
        points,
        setPoints,
        lines = [],
        segments = []
    } = props;

    const [mousePoint, setMousePoint] = useState<IPoint>(null);

    const verticalLines = [];
    const horizontalLines = [];
    const mid = svgSize / 2;
    const padding = 25;
    const spacing = 28;

    const toSVG = (p: IPoint): IPoint => {
        if (!p) return null;

        return {
            x: mid + p.x * spacing,
            y: mid - p.y * spacing,
            color: p.color ?? "blue"
        }
    } 

    for (let x = -10; x <= 10; x++)
    {
        const width = x == 0 ? 3 : 1;
        const markerEnd = x == 0 ? "url(#arrow)" : null;

        verticalLines.push(
            <line 
                key={"x" + x} 
                x1={mid + x*spacing} 
                y1={padding} 
                x2={mid + x*spacing} 
                y2={mid*2 - padding} 
                stroke='black' 
                strokeWidth={width} 
                markerStart={markerEnd}
            />)
    }
    for (let y = -10; y <= 10; y++)
    {
        const width = y == 0 ? 3 : 1;
        horizontalLines.push(
            <line 
                key={"y" + y} 
                x1={padding} 
                y1={mid + y*spacing} 
                x2={mid*2 - padding} 
                y2={mid + y*spacing} 
                stroke='black' 
                strokeWidth={width} 
            />)
    }

    const svgPoints = points.map((p, idx) => {
        const s = toSVG(p);
        return <circle key={"p" + idx} cx={s.x} cy={s.y} r={5} fill={p.color} />;
    });

    const svgLines = lines.map((l, idx) => {
        const linePoints = MathTools.linePoints(l, 20);
        const l1 = toSVG(linePoints[0]);
        const l2 = toSVG(linePoints[1]);
        
        return <line 
            key={"l" + idx} 
            x1={l1.x} 
            y1={l1.y} 
            x2={l2.x} 
            y2={l2.y} 
            stroke={l.color ?? 'green'} 
            strokeWidth={l.strokeWidth ?? 2} 
        />
    })

    const toClient = (screenPoint: IPoint): IPoint => {
        //const svg: SVGElement = (e.target as any).ownerSVGElement;   
        const plot = document.getElementById("plot");
        const rect = plot.getBoundingClientRect();
        const point: IPoint = {
            x: (-mid + screenPoint.x - rect.left) / spacing,
            y: (mid - (screenPoint.y - rect.top)) / spacing,
            color: "blue"
        };

        if (snapToIntegers) {
            point.x = Math.round(point.x);
            point.y = Math.round(point.y)
        }

        return point;
    }

    const svgMousePoint = toSVG(mousePoint);
    const hint = svgMousePoint ?
     <text 
        x={0} 
        y={18} 
        fontSize={18} 
        fontWeight="bold">Mouse: ({mousePoint.x}, {mousePoint.y})</text>
        : null;

    return (
        <svg id="plot" width={svgSize} height={svgSize} color='white'
            onMouseLeave={e => {
                setMousePoint(null);
            }}
            onMouseMove={e => {
                const clientPoint = toClient({x: e.clientX, y: e.clientY});
                setMousePoint(clientPoint);
            }}
            onClick={e => {       
                const svg: SVGElement = (e.target as any).ownerSVGElement;   
                const plot = document.getElementById("plot");
                const rect = plot.getBoundingClientRect();
                const point: IPoint = {
                    x: (-mid + e.clientX - rect.left) / spacing,
                    y: (mid - (e.clientY - rect.top)) / spacing,
                    color: "blue"
                };

                if (snapToIntegers) {
                    point.x = Math.round(point.x);
                    point.y = Math.round(point.y)
                }
                const x = Math.round((-mid + e.clientX - rect.left) / spacing);
                const y = Math.round((mid - (e.clientY - rect.top)) / spacing);
        
                setPoints([...points, point]);
            }}
        >
        <defs>
            <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
        </defs>
            <rect width={svgSize} height={svgSize} fill='#F0F0F0'/>
            {horizontalLines}
            {verticalLines}
            {hint}
            {svgPoints}
            {svgLines}
            <text x={mid + 5} y={18} fontSize={20}>Y</text>
            <text x={2 * mid - 15} y={mid - 5} fontSize={20}>X</text>
        </svg>
    )
}