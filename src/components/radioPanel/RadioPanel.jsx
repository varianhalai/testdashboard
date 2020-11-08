import React,{useState} from 'react';
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import AudioSpectrum from 'react-audio-spectrum';
import sample from '../../assets/audio/sample.mp3';


const RadioPlayer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-family: ${fonts.contentFont};
font-size: 1.7rem;
background-color: ${(props) => props.theme.style.lightBackground};
border: ${(props) => props.theme.style.mainBorder};
width: 40%;
border-radius: .5rem;
margin-left: 1.2rem;
margin-top: .9rem;
position: relative;
z-index: 400;
height: 6rem;
width: 30rem;

.player-inner {
    width: 100%;
    padding-top: 2rem;
    display: flex;
    align-items: baseline;
    justify-content: center;;
    
    #audio-canvas {
        margin-top: -5rem;
        margin-left: -2rem;
        
    }

    .player-controls {
        margin-left: 1rem;
        margin-top: -1rem;
    }
}

`



const RadioPanel = ({toggleRadio}) => {
    const [playing,setPlaying] =useState(false)

    const togglePlaying = () => {
        let audioElement = document.getElementById('audio-element')
        if(playing) {
            audioElement.pause()
            setPlaying(false)
        }else {
            audioElement.play()
            setPlaying(true)
        }
    }
    return (

        
        <RadioPlayer>
            <div className="player-inner">
                <audio id='audio-element' src={sample} ></audio>
                <AudioSpectrum
                id="audio-canvas"
                height={60}
                width={60}
                audioId={'audio-element'}
                capColor={'red'}
                capHeight={2}
                meterWidth={4}
                meterCount={8}
                meterColor={[
                    {stop: 0, color: '#f00'},
                    {stop: 0.5, color: '#0CD7FD'},
                    {stop: 1, color: 'red'}
                    ]}
                    gap={4}
                    />
                <div className="player-controls">
                    {playing ? <button onClick={togglePlaying}><i className="fas fa-pause"></i></button> 
                    : <button onClick={togglePlaying}><i className="fas fa-play"></i></button>}
                </div>
            </div>
            
            
        </RadioPlayer>
    );
}

export default RadioPanel;
