class Node {
  constructor(data = null, leftChild = null, rightChild = null) {
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree {
    constructor(array) {
        // filters duplicates
        this.array = Array.from(new Set(array));
        this.root = this.buildTree();
      }

    // takes an array and turns it into a balanced binary tree full of Node objects
    buildTree(array = this.array, start = 0, end = array.length -1) {

        if(start > end) return null;

        let mid = Math.floor((start + end) / 2);
        let root = new Node(array[mid]);

        root.leftChild = this.buildTree(array, start, mid-1);
        root.rightChild = this.buildTree(array, mid + 1, end);

        return root;
    }

}


const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];


const tree = new Tree(array);


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
     return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

