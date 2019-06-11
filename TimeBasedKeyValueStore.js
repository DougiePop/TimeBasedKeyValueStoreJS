/**
 * Initialize your data structure here.
 * Using hashmap data structure with binary search
 * Time Complexity of get method: O(log n)
 * Time Complexity of set method: O(n)
 */
const TimeMap = function() {
    this.map = {};
}

/**
 * iterate through this.map[key] array and
 * compare timestamp for first element (pos1) with second element (pos2)
 * return negative number which will place pos1 at a lower index 
 * return zero which will leave pos1 and pos2 unchanged
 * return positive number which will place pos2 at a lower index
 * @param {object} pos1
 * @param {object} pos2
 */
const compareTo = (pos1, pos2) => {
    if (pos1.timestamp !== pos2.timestamp) {
        return pos1.timestamp - pos2.timestamp;
    }
    return 0;
}

/** 
 * set key for this.map and push value/timestamp for the relevant key
 * sort the values for this.map[key] according to ascending timestamp
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function(key, value, timestamp) {
    if(!this.map[key]) this.map[key] = [];

    // Using ES6 Property value shorthand for objects
    this.map[key].push({
        value,
        timestamp,
    })

    // NOTE: in order for this to pass on leetcode using their test cases, it assumes that
    // the values are sorted according to its timestamp
    // therefore, you might need to remove this line in order to have it accepted
    // however, I didn't see the timestamps being sorted which is necessary to use binary search
    // so I included this sort method
    this.map[key].sort(compareTo)
}

// binary search method using recursion on sorted array
TimeMap.prototype.binarySearch = function(arr, targetTimeStamp, start, end, bestValue) {
    // worst base case
    if (start > end) {
        return bestValue;
    } 

    const mid = Math.floor((start + end) / 2);
    const currTimeStamp = arr[mid].timestamp;
    const currValue = arr[mid].value;

    // best base case
    // if this.map[key] contains the targetTimeStamp, return value at current index
    if (currTimeStamp === targetTimeStamp) {
        return currValue;
    }

    // if current timestamp is lower than target timestamp,
    // recurse through the right side of array
    // pass value at current index (currValue) as argument for parameter bestValue to ensure
    // if target timestamp isn't found, we return the currValue
    if (currTimeStamp < targetTimeStamp) {
        return this.binarySearch(arr, targetTimeStamp, mid + 1, end, currValue);
    }

    // if current timestamp is greater than target timestamp, 
    // recurse through the left side of array
    // pass param bestValue as the argument 
    // so that if all the timestamps at this.map[key] is greater
    // than target timestamp, then return empty string
    if (currTimeStamp > targetTimeStamp) {
        return this.binarySearch(arr, targetTimeStamp, start, mid - 1, bestValue);
    }
}

/** 
 * if relevant param key does not exist in this.map return empty string
 * otherwise, return value from binary searching through the sorted array (this.map) at relevant param key
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function(key, timestamp) {
    if (!key in this.map) return '';
    return this.binarySearch(this.map[key], timestamp, 0, this.map[key].length - 1, '')

}