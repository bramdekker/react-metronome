import React from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class NumberForm extends React.Component {
    render() {
        return (
            <form className="inputForm">
                <label htmlFor="numInput">
                    Beats per measure:
                    <input
                        type="number"
                        name="numInput"
                        min="1"
                        max="25"
                        value={this.props.value}
                        onChange={(e) => this.props.onChange(e)}
                    />
                </label>
            </form>
        );
    }
}

class Metronome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 3,
        };

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    handleInputChange(e) {
        const beatsPerMeasure = e.target.value;
        this.setState({
            beatsPerMeasure: beatsPerMeasure,
        });
    }

    handleBpmChange(e) {
        const bpm = e.target.value;

        if (this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(
                () => this.playClick(),
                (60 / bpm) * 1000,
            )

            this.setState({
                count: 0,
                bpm: bpm,
            })
        } else {
            this.setState({bpm: bpm});
        }
    }

    startStop() {
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false,
            });
        } else {
            this.timer = setInterval(
                () => this.playClick(),
                (60 / this.state.bpm) * 1000,
            );

            this.setState(
                {
                    count: 0,
                    playing: true,
                },
                () => this.playClick(),
            );
        }
    }

    playClick() {
        const count = this.state.count;
        const beatsPerMeasure = this.state.beatsPerMeasure;

        if (count === 0) {
            this.click1.play();
        } else {
            this.click2.play();
        }

        this.setState({
            count: (count + 1) % beatsPerMeasure,
        })
    }

    render() {
        const bpm = this.state.bpm;
        const playing = this.state.playing;

        return (
            <div className="metronome">
                <div className="bpmSlider">
                    <div>{bpm} BPM</div>
                    <input
                        type="range"
                        min="60"
                        max="240" 
                        value={bpm}
                        onChange={(e) => this.handleBpmChange(e)}
                    />
                    <NumberForm
                        className="numberForm"
                        onChange={(e) => this.handleInputChange(e)}
                        value={this.state.beatsPerMeasure}
                    />
                </div>
            <button onClick={() => this.startStop()}>
                {playing ? "Stop" : "Play"}
            </button>
            </div>
        );
    }
}

export default Metronome;