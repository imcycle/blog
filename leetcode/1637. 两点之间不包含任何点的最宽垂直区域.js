/**
 * @param {number[][]} points
 * @return {number}
 */
var maxWidthOfVerticalArea = function(points) {
  const xs = points.map(v => v[0]).sort((a,b) => a-b);

  let max = 0;
  for (let i = 1; i < xs.length; i++) {
    max = Math.max(max, xs[i] - xs[i-1]);
  }

  return max;
};