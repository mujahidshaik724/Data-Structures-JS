class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
      // Load factor determines when to resize the hashmap (default 75% full)
      this.loadFactor = loadFactor;
      // Initial capacity (default 16 buckets)
      this.capacity = capacity;
      // Number of stored key-value pairs
      this.size = 0;
      // Array of buckets, each holding key-value pairs (chaining technique)
      this.buckets = new Array(this.capacity).fill(null);
    }
  
    // Hash function: Converts a key (string) into a bucket index
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31; // A prime number helps distribute hashes more uniformly
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }
      return hashCode;
    }
  
    // Insert or update a key-value pair in the hash map
    set(key, value) {
      const index = this.hash(key); // Get bucket index from hash function
      if (!this.buckets[index]) {
        this.buckets[index] = []; // Initialize bucket if empty
      }
  
      // Check if the key already exists and update its value
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          this.buckets[index][i][1] = value;
          return;
        }
      }
  
      // If key doesn't exist, add a new key-value pair
      this.buckets[index].push([key, value]);
      this.size++;
  
      // Resize if the load factor exceeds the threshold
      if (this.size / this.capacity > this.loadFactor) {
        this._resize();
      }
    }
  
    // Retrieve the value associated with a key
    get(key) {
      const index = this.hash(key); // Find the bucket index
      const bucket = this.buckets[index];
  
      if (!bucket) return null; // If no bucket exists, key doesn't exist
  
      for (const [k, v] of bucket) {
        if (k === key) return v; // Return value if key matches
      }
  
      return null; // Key not found
    }
  
    // Check if a key exists in the hash map
    has(key) {
      return this.get(key) !== null;
    }
  
    // Remove a key-value pair from the hash map
    remove(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      if (!bucket) return false; // If no bucket exists, key doesn't exist
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1); // Remove key-value pair
          this.size--;
          return true;
        }
      }
  
      return false; // Key not found
    }
  
    // Get the number of stored key-value pairs
    length() {
      return this.size;
    }
  
    // Clear all key-value pairs from the hash map
    clear() {
      this.buckets = new Array(this.capacity).fill(null);
      this.size = 0;
    }
  
    // Return an array of all keys
    keys() {
      const keysArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const [key] of bucket) {
            keysArray.push(key);
          }
        }
      }
      return keysArray;
    }
  
    // Return an array of all values
    values() {
      const valuesArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const [, value] of bucket) {
            valuesArray.push(value);
          }
        }
      }
      return valuesArray;
    }
  
    // Return an array of all key-value pairs
    entries() {
      const entriesArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const pair of bucket) {
            entriesArray.push(pair);
          }
        }
      }
      return entriesArray;
    }
  
    // Resize the hash map when the load factor threshold is exceeded
    _resize() {
      const oldBuckets = this.buckets;
      this.capacity *= 2; // Double the capacity
      this.buckets = new Array(this.capacity).fill(null);
      this.size = 0; // Reset size
  
      // Reinsert all existing key-value pairs
      for (const bucket of oldBuckets) {
        if (bucket) {
          for (const [key, value] of bucket) {
            this.set(key, value);
          }
        }
      }
    }
  }
  
  // Example usage:
  const hashMap = new HashMap(0.75, 20);
//   hashMap.set("name", "Alice");
//   hashMap.set("age", 25);
//   console.log(hashMap.get("name")); // Output: Alice
//   console.log(hashMap.has("age")); // Output: true
//   console.log(hashMap.length()); // Output: 2
//   hashMap.remove("age");
//   console.log(hashMap.has("age")); // Output: false
//   console.log(hashMap.keys()); // Output: ["name"]
//   console.log(hashMap.values()); // Output: ["Alice"]
//   console.log(hashMap.entries()); // Output: [["name", "Alice"]]
  



//   // Populate the hash map
  hashMap.set('apple', 'red');
  hashMap.set('banana', 'yellow');
  hashMap.set('apple', 'red');
  hashMap.set('banan', 'yellow')
  hashMap.set('baana', 'yellow');
  hashMap.set('aple', 'red');
  hashMap.set('bnana', 'yellow');
  hashMap.set('appl', 'red');
  hashMap.set('banan', 'yellow');
  hashMap.set('pple', 'red');
  hashMap.set('anana', 'yellow');
  hashMap.set('ale', 'red');
  hashMap.set('bana', 'yellow');
  hashMap.set(11,25)
  hashMap.set(10.1,40)
  hashMap.set(10,25)
  hashMap.set(10.5,40)
  hashMap.set(1,25)
  hashMap.set(20.1,40)
  console.log(hashMap.length());
  
 console.log( hashMap.entries());
 console.log(hashMap.get('apple'));
 
 
//   hashMap.set('carrot', 'orange');
//   hashMap.set('dog', 'brown');
//   hashMap.set('elephant', 'gray');
//   hashMap.set('frog', 'green');
//   hashMap.set('grape', 'purple');
//   hashMap.set('hat', 'black');
//   hashMap.set('ice cream', 'white');
//   hashMap.set('jacket', 'blue');
//   hashMap.set('kite', 'pink');
//   hashMap.set('lion', 'golden');
  
//   // Overwrite a value
//   hashMap.set('apple', 'green');
 
// resize after the 75% is completed
//   hashMap.set('moon', 'silver');
  

//   console.log(hashMap.get('apple')); // 'green'
//   console.log(hashMap.has('banana')); // true
//   console.log(hashMap.remove('carrot')); // true
//   console.log(hashMap.length()); // Current number of entries
//   console.log(hashMap.keys()); // Array of all keys
//   console.log(hashMap.values()); // Array of all values
//   console.log(hashMap.entries()); // Array of [key, value] pairs
//   hashMap.clear();
//   console.log(hashMap.length()); // 0
    