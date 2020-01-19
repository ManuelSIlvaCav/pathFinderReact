export function dijkstra(grid, startNode, finishNode) {
  //1. Mark all nodes unvisited - Set of unvisited Nodes
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  //3. set tentative distances
  
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);

    const closestNode = unvisitedNodes.shift();
    if (closestNode === finishNode) return visitedNodesInOrder;
    //If wall skip it
    if (closestNode.isWall && !closestNode.isStart) continue;

    //5. If dest node is dist Infinity or visisted Stop
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    //4. when done mark current as visited
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    

    //6. Oc. select unvisisted node and repeat
    updateUnvisistedNeighbors(closestNode, grid);
  }
  return visitedNodesInOrder;
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function updateUnvisistedNeighbors(closestNode, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = closestNode.distance + 1;
    neighbor.previousNode = closestNode;
  }
}

export function getShortestPath(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
