// Function to visualize the BST
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Node class
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// Tree class
class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array.sort((a, b) => a - b))]);
  }

  // Build a balanced BST
  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  // Insert a value
  insert(value, root = this.root) {
    if (root === null) return new Node(value);
    if (value < root.data) root.left = this.insert(value, root.left);
    else if (value > root.data) root.right = this.insert(value, root.right);
    return root;
  }

  // Delete a value
  delete(value, root = this.root) {
    if (root === null) return root;
    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      let min = this.findMin(root.right);
      root.data = min.data;
      root.right = this.delete(min.data, root.right);
    }
    return root;
  }

  findMin(node) {
    while (node.left !== null) node = node.left;
    return node;
  }

  // Find a node
  find(value, root = this.root) {
    if (!root || root.data === value) return root;
    return value < root.data ? this.find(value, root.left) : this.find(value, root.right);
  }

  // Level Order Traversal (Breadth-First Search)
  levelOrder(callback) {
    if (!callback) throw new Error("Callback function is required!");
    let queue = [this.root];
    while (queue.length) {
      let node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // Inorder Traversal (Left, Root, Right)
  inOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback function is required!");
    if (root) {
      this.inOrder(callback, root.left);
      callback(root);
      this.inOrder(callback, root.right);
    }
  }

  // Preorder Traversal (Root, Left, Right)
  preOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback function is required!");
    if (root) {
      callback(root);
      this.preOrder(callback, root.left);
      this.preOrder(callback, root.right);
    }
  }

  // Postorder Traversal (Left, Right, Root)
  postOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback function is required!");
    if (root) {
      this.postOrder(callback, root.left);
      this.postOrder(callback, root.right);
      callback(root);
    }
  }

  // Get height of a node
  height(node) {
    if (!node) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  // Get depth of a node
  depth(node, root = this.root, depth = 0) {
    if (!root) return -1;
    if (root === node) return depth;
    return node.data < root.data
      ? this.depth(node, root.left, depth + 1)
      : this.depth(node, root.right, depth + 1);
  }

  // Check if the tree is balanced
  isBalanced(root = this.root) {
    if (!root) return true;
    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);
    return Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  // Rebalance the tree
  rebalance() {
    let nodes = [];
    this.inOrder((node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }
}

// Testing the Tree
let bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log("Initial BST:");
prettyPrint(bst.root);

// Inserting nodes
bst.insert(50);
bst.insert(100);
console.log("\nAfter Insertions:");
prettyPrint(bst.root);

// Deleting a node
bst.delete(9);
console.log("\nAfter Deleting 9:");
prettyPrint(bst.root);

// Finding a node
console.log("\nFinding 23:", bst.find(23));

// Traversals
console.log("\nLevel Order:");
bst.levelOrder((node) => console.log(node.data));

console.log("\nInOrder:");
bst.inOrder((node) => console.log(node.data));

console.log("\nPreOrder:");
bst.preOrder((node) => console.log(node.data));

console.log("\nPostOrder:");
bst.postOrder((node) => console.log(node.data));

// Height and Depth
console.log("\nHeight of root:", bst.height(bst.root));
console.log("Depth of node 67:", bst.depth(bst.find(67)));

// Checking and Rebalancing
console.log("\nIs Balanced?:", bst.isBalanced());
bst.rebalance();
console.log("After Rebalancing:");
prettyPrint(bst.root);
console.log("Is Balanced Now?:", bst.isBalanced());
