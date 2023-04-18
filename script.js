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


    insert(data, root = this.root) {

        // if the tree is empty, return a new node
        if (root == null) {
            root = new Node(data);
            return root;
        }
 
        // otherwise, recur down the tree
        if (data < root.data)
            root.leftChild = this.insert(data, root.leftChild);
        else if (data > root.data)
            root.rightChild = this.insert(data, root.rightChild);
 
        // return the (unchanged) node pointer
        return root;
    }


    delete(data, root = this.root) {
        //base Case: If the tree is empty
        if (root == null)
            return root;
  
        //otherwise, recur down the tree
        if (data < root.data) {
            root.leftChild = this.delete(data, root.leftChild);
            
        } else if (data > root.data) {
            root.rightChild = this.delete(data, root.rightChild);
        }
  

        // deletes node whose value is same as data
        else {
            // node with only one child or no child
            if (root.leftChild == null) {
                return root.rightChild;
            
            }else if (root.rightChild == null) {
                return root.leftChild;
            }


            // finds and returns the minimum value present in a binary search tree
            const minValue = (rootNode) => rootNode.leftChild ? minValue(rootNode.leftChild) : rootNode.data;

            
            // node with two children: Get the inorder
            root.data = minValue(root.rightChild) ;
            root.rightChild = this.delete(root.data, root.rightChild);
        }
  
        return root;
    }



    find(data, root = this.root) {

        if (root == null) return null;
        
        // returns if there is requested data
        if(data === root.data) {
            return root;
        }
        
          // searches through BST
          if(root.leftChild !== null && root.rightChild !== null) {
            const leftResult = this.find(data, root.leftChild);
            const rightResult = this.find(data, root.rightChild);
                return leftResult || rightResult; // return either result if found

          } else if(root.leftChild !== null) {
            return this.find(data, root.leftChild);

          }else {
            return this.find(data, root.rightChild);
          }
    }



    // traverses the tree in breadth-first level order
    // and provide each node as the argument to the provided function.
    // method returns an array of values if no function is given
    levelOrder(func, root = this.root) {
      if(root === null) return;
      const queue = [];
      const array = [];
      queue.unshift(root);

      // while at least there is one node
      while(queue.length !== 0){
        const current = queue[queue.length - 1];

        if(current.leftChild !== null){ queue.unshift(current.leftChild) };
        if(current.rightChild !== null){ queue.unshift(current.rightChild) };



        !func ? array.push(current) : func(current); // pushing a value into an array or calling a function
        queue.pop(); // removes element at front
      }

      if(!func) return array;
    }


    //functions traverse the tree in preorder
    //yields each node to the provided function given as an argument
    //return an array of values if no function is given
    preorder(func, root = this.root, array = []) {
      if(root === null) return;

      array.push(root);

      if(func) func(root);

      this.preorder(func, root.leftChild, array);
      this.preorder(func, root.rightChild, array);

      if(!func) return array;
    }


    //functions traverse the tree in inorder
    //yields each node to the provided function given as an argument
    //return an array of values if no function is given
    inorder(func, root = this.root, array = []) {
      if(root === null) return;

      
      if(func) func(root);

      this.inorder(func, root.leftChild, array);

      array.push(root);
      
      this.inorder(func, root.rightChild, array);


      if(!func) return array;
    }


    //functions traverse the tree in postorder
    //yields each node to the provided function given as an argument
    //return an array of values if no function is given
    postorder(func, root = this.root, array = []) {
      if(root === null) return;

      
      if(func) func(root);

      this.postorder(func, root.leftChild, array);
      this.postorder(func, root.rightChild, array);

      array.push(root);


      if(!func) return array;
    }



    // accepts a node and returns its height
    height(node = this.root) {
    // Get the height of the tree
    if (!node)
      return 0;

    else {
    // Find the height of both subtrees
    // and use the larger one
    const leftHeight = this.height(node.leftChild);
    const rightHeight = this.height(node.rightChild);

      if (leftHeight >= rightHeight)
          return leftHeight + 1;
      else
          return rightHeight + 1;
      }
    }


    // accepts a node and returns its depth
    // Depth is defined as the number of edges in path
    // from a given node to the tree’s root node
    // starts to count from 1
    depth(node, root = this.root, level = 1) {
      if(root === null) return;
      if(root === node) return level;


      const left = this.depth(node, root.leftChild, level + 1);
      const right = this.depth(node, root.rightChild, level + 1);

      return left || right;
    }

}




// visualizes binary search tree
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


const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];


const tree = new Tree(array);


tree.insert(32);

tree.delete(4);

tree.find(67);

prettyPrint(tree.root);






