import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations, getBubbleSortAnimations, getQuickSortAnimations, getSelectionSortAnimations, getInsertionSortAnimations } from '../sortingAlgorithms/sortingAlgorithms';

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({ array });
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        this.animateSort(animations);
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        this.animateSort(animations);
    }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        this.animateSort(animations);
    }

    selectionSort() {
        const animations = getSelectionSortAnimations(this.state.array);
        this.animateSort(animations);
    }

    insertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);
        this.animateSort(animations);
    }

    animateSort(animations) {
        const arrayBars = document.getElementsByClassName('array-bar');
        if (!arrayBars.length) return; // Check if array bars are loaded
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx]?.style;
                const barTwoStyle = arrayBars[barTwoIdx]?.style;
                if (!barOneStyle || !barTwoStyle) continue; // Skip if undefined
                const color = i % 3 === 0 ? 'red' : 'green';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 10);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx]?.style;
                    if (!barOneStyle) return; // Skip if undefined
                    barOneStyle.height = `${newHeight}px`;
                }, i * 10);
            }
        }
    }

    render() {
        const { array } = this.state;

        return (
            <div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: 'green',
                                height: `${value}px`,
                            }}></div>
                    ))}
                </div>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.selectionSort()}>Selection Sort</button>
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;

