const mongoose = require("mongoose");
const Topic = require("./models/Topic");
require("dotenv").config();

const sampleData = [
  {
    title: "Arrays & Strings",
    description: "Master fundamental array and string operations",
    icon: "layout-grid",
    order: 1,
    problems: [
      {
        title: "Two Sum",
        description: "Find two numbers that add up to a target",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
        leetcodeLink: "https://leetcode.com/problems/two-sum/",
        articleLink:
          "https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/",
        tags: ["Array", "Hash Table"],
      },
      {
        title: "Longest Substring Without Repeating Characters",
        description:
          "Find the length of longest substring without repeating characters",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=wiGGM7-KHdE",
        leetcodeLink:
          "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        articleLink:
          "https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/",
        tags: ["String", "Sliding Window", "Hash Table"],
      },
      {
        title: "Container With Most Water",
        description:
          "Find two lines that together with the x-axis form a container with most water",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=UuiTKBwPgAo",
        leetcodeLink:
          "https://leetcode.com/problems/container-with-most-water/",
        articleLink: "https://www.geeksforgeeks.org/container-with-most-water/",
        tags: ["Array", "Two Pointers"],
      },
    ],
  },
  {
    title: "Linked Lists",
    description: "Learn pointer manipulation and linked list operations",
    icon: "link",
    order: 2,
    problems: [
      {
        title: "Reverse Linked List",
        description: "Reverse a singly linked list",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=G0_I-ZF0S38",
        leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/",
        articleLink: "https://www.geeksforgeeks.org/reverse-a-linked-list/",
        tags: ["Linked List", "Recursion"],
      },
      {
        title: "Merge Two Sorted Lists",
        description:
          "Merge two sorted linked lists and return it as a sorted list",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=XIdigk956u0",
        leetcodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/",
        articleLink:
          "https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/",
        tags: ["Linked List", "Recursion"],
      },
      {
        title: "Linked List Cycle",
        description: "Determine if a linked list has a cycle in it",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=gBTe7lFR3vc",
        leetcodeLink: "https://leetcode.com/problems/linked-list-cycle/",
        articleLink:
          "https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/",
        tags: ["Linked List", "Two Pointers"],
      },
    ],
  },
  {
    title: "Trees & Graphs",
    description: "Explore tree traversals and graph algorithms",
    icon: "git-branch",
    order: 3,
    problems: [
      {
        title: "Binary Tree Inorder Traversal",
        description: "Return the inorder traversal of a binary tree",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=5dySuyZf9Qg",
        leetcodeLink:
          "https://leetcode.com/problems/binary-tree-inorder-traversal/",
        articleLink:
          "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/",
        tags: ["Tree", "DFS", "Stack"],
      },
      {
        title: "Maximum Depth of Binary Tree",
        description: "Find the maximum depth of a binary tree",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=hTM3phVI6YQ",
        leetcodeLink:
          "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        articleLink:
          "https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/",
        tags: ["Tree", "DFS", "BFS"],
      },
      {
        title: "Number of Islands",
        description: "Count the number of islands in a 2D grid",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=pV2kpPD66nE",
        leetcodeLink: "https://leetcode.com/problems/number-of-islands/",
        articleLink: "https://www.geeksforgeeks.org/find-number-of-islands/",
        tags: ["Graph", "BFS", "DFS", "Matrix"],
      },
      {
        title: "Validate Binary Search Tree",
        description: "Determine if a binary tree is a valid binary search tree",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=s6ATEkipzow",
        leetcodeLink:
          "https://leetcode.com/problems/validate-binary-search-tree/",
        articleLink:
          "https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/",
        tags: ["Tree", "DFS", "BST"],
      },
    ],
  },
  {
    title: "Dynamic Programming",
    description: "Master optimization problems with DP",
    icon: "layers",
    order: 4,
    problems: [
      {
        title: "Climbing Stairs",
        description: "Calculate distinct ways to climb to the top",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=Y0lT9Fck7qI",
        leetcodeLink: "https://leetcode.com/problems/climbing-stairs/",
        articleLink:
          "https://www.geeksforgeeks.org/count-ways-reach-nth-stair/",
        tags: ["Dynamic Programming", "Math"],
      },
      {
        title: "Coin Change",
        description:
          "Find the fewest number of coins needed to make up an amount",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=H9bfqozjoqs",
        leetcodeLink: "https://leetcode.com/problems/coin-change/",
        articleLink: "https://www.geeksforgeeks.org/coin-change-dp-7/",
        tags: ["Dynamic Programming", "Array"],
      },
      {
        title: "Longest Common Subsequence",
        description: "Find the length of longest common subsequence",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=Ua0GhsJSlWM",
        leetcodeLink:
          "https://leetcode.com/problems/longest-common-subsequence/",
        articleLink:
          "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/",
        tags: ["Dynamic Programming", "String"],
      },
    ],
  },
  {
    title: "Sorting & Searching",
    description: "Learn efficient sorting and searching techniques",
    icon: "binary",
    order: 5,
    problems: [
      {
        title: "Binary Search",
        description: "Search for a target value in a sorted array",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=P3YID7liBug",
        leetcodeLink: "https://leetcode.com/problems/binary-search/",
        articleLink: "https://www.geeksforgeeks.org/binary-search/",
        tags: ["Binary Search", "Array"],
      },
      {
        title: "Merge Sort",
        description: "Implement merge sort algorithm",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=4VqmGXwpLqc",
        leetcodeLink: "https://leetcode.com/problems/sort-an-array/",
        articleLink: "https://www.geeksforgeeks.org/merge-sort/",
        tags: ["Sorting", "Divide and Conquer"],
      },
      {
        title: "Search in Rotated Sorted Array",
        description: "Search for target in a rotated sorted array",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=U8XENwh8Oy8",
        leetcodeLink:
          "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        articleLink:
          "https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/",
        tags: ["Binary Search", "Array"],
      },
    ],
  },
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // Clear existing data
    await Topic.deleteMany({});
    console.log("🗑️  Cleared existing topics");

    // Insert sample data
    await Topic.insertMany(sampleData);
    console.log("✅ Sample data inserted successfully");
    console.log(
      `📊 Inserted ${sampleData.length} topics with real YouTube links`
    );

    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
