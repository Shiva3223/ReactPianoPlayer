import React, { ReactElement,useRef } from 'react'
import './DrawPiano.styles.css';

import { noteEvent } from "../../Utils/TypesForMidi";
import Tracks from '../Tracks/Tracks';
import WhiteKey from './PianoKeys/WhiteKey';
import BlackKey from './PianoKeys/BlackKey';

interface DrawPianoProps{
    Data: Array<noteEvent> | undefined,
    Speed: number
}

export default function DrawPiano({Data,Speed}:DrawPianoProps):ReactElement {

    const Wh_Width = window.innerWidth / 52;
    const WhiteKeyWidth = useRef<number>(Wh_Width);

    const drawWhitePianoKey = (pos_x:number,id:number) =>{
        return <WhiteKey WhiteKeyWidth={WhiteKeyWidth.current} pos_x={pos_x} Data={Data} id={id} key={id} Delay={((window.innerHeight - 215) * 10)/(100/Speed)} />
    }

    const drawBlackPianoKey = (pos_x:number,id:number) =>{
        return <BlackKey WhiteKeyWidth={WhiteKeyWidth.current} pos_x={pos_x} Data={Data} id={id} key={id} Delay={((window.innerHeight - 215) * 10)/(100/Speed)}/>
    }

    const renderPianoKeys = () =>{
        let To_Render = [];
        let counter_ids = 21;
        for(let x = 0; x < 52; x++){
            To_Render.push(drawWhitePianoKey(WhiteKeyWidth.current * x,counter_ids))
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                To_Render.push(drawBlackPianoKey(WhiteKeyWidth.current * x + WhiteKeyWidth.current / 1.4,counter_ids));
                }
            }
            counter_ids++;
        }
        return To_Render;
    }
    const blackKeysNumbers = () =>{
        let to_count:Array<number> = [];
        let counter_ids = 21;
        for(let x = 0; x < 52; x++){
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                to_count.push(counter_ids)
                }
            }
            counter_ids++;
        }
        return to_count;
    }

    const KeysPositions = () =>{
        let positions = [];
        let counter_ids = 21;
        for(let x = 0; x < 52; x++){
            positions.push({position: WhiteKeyWidth.current * x, noteNumber: counter_ids})
            const num = counter_ids % 12;
            if(num  === 1 - 1 || num === 3 - 1 || num === 6 - 1 || num ===8 - 1 || num ===10 - 1  ){
                counter_ids++;
                if(counter_ids < 109){
                positions.push({position : WhiteKeyWidth.current * x + WhiteKeyWidth.current / 1.4, notenumber: counter_ids});
                }
            }
            counter_ids++;
        }
        return positions;
    }

    return (
        <div className='Piano' style={{height: window.innerHeight}}>
            <Tracks Width={WhiteKeyWidth.current * 52} Height={window.innerHeight-215 + 15} Speed={10} Data={Data!} BlackNumbers={blackKeysNumbers()} KeysPositions={KeysPositions()} intervalSpeed={Speed} />
            <div className='piano_keys' style={{marginTop: window.innerHeight + 15 - 235}}>
            {renderPianoKeys()}
            </div>
        </div>
    )
}
