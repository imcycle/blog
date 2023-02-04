/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    // 找到符合的开头
    const startPos = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === word[0]) {
                startPos.push([i, j])
            }
        }
    }
    let res = false;
    function dfs(word, x, y, used) {
        if (word === '') {
            res = true;
            return;
        }
        let nx, ny;
        // 上
        nx = x - 1;
        ny = y;
        u = `${nx}|${ny}`
        if (board[nx]?.[ny] === word[0] && !used.u) {
            dfs(word.slice(1), nx, ny, {...used, [u]:true})
        }
        // 下
        nx = x + 1;
        ny = y;
        u = `${nx}|${ny}`
        if (board[nx]?.[ny] === word[0] && !used.u) {
            dfs(word.slice(1), nx, ny, {...used, [u]:true})
        }
        // 左
        nx = x;
        ny = y - 1;
        u = `${nx}|${ny}`
        if (board[nx]?.[ny] === word[0] && !used.u) {
            dfs(word.slice(1), nx, ny, {...used, [u]:true})
        }
        // 右
        nx = x;
        ny = y + 1;
        u = `${nx}|${ny}`
        if (board[nx]?.[ny] === word[0] && !used.u) {
            dfs(word.slice(1), nx, ny, {...used, [u]:true})
        }
    }
    
    for (let i = 0; i < startPos.length; i++) {
        dfs(word.slice(1), startPos[i][0], startPos[i][1], {[`${startPos[i][0]}|${startPos[i][1]}`]: true})
    }

    return res;
};

exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
"ABCB")