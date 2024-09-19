// Merge Sort
export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx, i = startIdx, j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]); animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i]); animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j]); animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

// Bubble Sort
export function getBubbleSortAnimations(array) {
    const animations = [];
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);
            if (array[j] > array[j + 1]) {
                animations.push([j, array[j + 1]]);
                animations.push([j + 1, array[j]]);
                swap(array, j, j + 1);
            } else {
                animations.push([j, array[j]]);
                animations.push([j + 1, array[j + 1]]);
            }
        }
    }
    return animations;
}

// Quick Sort
export function getQuickSortAnimations(array) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, low, high, animations) {
    if (low < high) {
        const pi = partition(array, low, high, animations);
        quickSortHelper(array, low, pi - 1, animations);
        quickSortHelper(array, pi + 1, high, animations);
    }
}

function partition(array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        animations.push([j, high]); animations.push([j, high]);
        if (array[j] < pivot) {
            i++;
            animations.push([i, array[j]]);
            animations.push([j, array[i]]);
            swap(array, i, j);
        }
    }
    animations.push([i + 1, array[high]]);
    animations.push([high, array[i + 1]]);
    swap(array, i + 1, high);
    return i + 1;
}

// Selection Sort
export function getSelectionSortAnimations(array) {
    const animations = [];
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            animations.push([j, minIdx]); animations.push([j, minIdx]);
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        animations.push([i, array[minIdx]]);
        animations.push([minIdx, array[i]]);
        swap(array, i, minIdx);
    }
    return animations;
}

// Insertion Sort
export function getInsertionSortAnimations(array) {
    const animations = [];
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            animations.push([j + 1, j]);
            animations.push([j + 1, j]);
            animations.push([j + 1, array[j]]);
            array[j + 1] = array[j];
            j--;
        }
        animations.push([j + 1, key]);
        array[j + 1] = key;
    }
    return animations;
}

// Utility swap function
function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
