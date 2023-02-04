/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const res = [];
    while (strs.length) {
        const word = strs.shift();
        const wordSorted = word.split('').sort((a,b) =>a>b).join('');
        const temp = [word]
        for (let i = 0; i < strs.length; i++) {
            const sorted = strs[i].split('').sort((a,b) =>a>b).join('');
            if (wordSorted === sorted) {
                temp.push(strs[i]);
                strs.splice(i, 1);
                i--
            }
        }

        res.push(temp)
    }

    return res;
};

groupAnagrams(["eat","tea","tan","ate","nat","bat"])