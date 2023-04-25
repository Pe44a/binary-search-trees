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



        !func ? array.push(current.data) : func(current); // pushing a value into an array or calling a function
        queue.pop(); // removes element at front
      }

      if(!func) return array;
    }


    //functions traverse the tree in preorder
    //yields each node to the provided function given as an argument
    //return an array of values if no function is given
    preorder(func, root = this.root, array = []) {
      if(root === null) return;

      array.push(root.data);

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

      array.push(root.data);
      
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

      array.push(root.data);


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


    // checks if the tree is balanced
    isBalanced(root = this.root){
     
      // Base condition
      if(root == null){
          return true;
      }
   
      // for left and right subtree height
      let leftHeight = this.height(root.leftChild)
      let rightHeight = this.height(root.rightChild)
   
      // allowed values for (lh - rh) are 1, -1, 0
      if (Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(
      root.leftChild)== true && this.isBalanced( root.rightChild) == true){
          return true;
      }


      return false;
  }


  // rebalances an unbalanced tree
  rebalance() {
    const bst = this.inorder();

    this.array = bst;
    this.root = this.buildTree();
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



// Creates a binary search tree from an array of random numbers
// Then checks various parameters
function driverScript(array) {
  const tree =new Tree(array);


  // checks if balanced
  console.log('---------------------------' + '<br>' + 'Is it balanced: ' + tree.isBalanced());

  // Prints out all elements in level, pre, post, and in order
  console.log('Preorder: ' + tree.preorder());
  console.log('Inorder: ' + tree.inorder());
  console.log('Postorder: ' + tree.postorder());

  prettyPrint(tree.root);


  // Unbalances the tree by adding several numbers
  tree.insert(21);
  tree.insert(78);
  tree.insert(84);
  tree.insert(98);
  tree.insert(11);


  // checks if unbalanced
  console.log('---------------------------' + '<br>' + 'Is it balanced: ' + tree.isBalanced());

  prettyPrint(tree.root);


  tree.rebalance();

  console.log('---------------------------' + '<br>' + 'Is it balanced: ' + tree.isBalanced());

  prettyPrint(tree.root);

  
  // Prints out all elements in level, pre, post, and in order
  console.log('Preorder: ' + tree.preorder());
  console.log('Inorder: ' + tree.inorder());
  console.log('Postorder: ' + tree.postorder());
}




const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

driverScript(array);