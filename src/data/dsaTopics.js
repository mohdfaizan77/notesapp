import { tagColors } from '../theme/appTheme';

// ─────────────────────────────────────────────────────────────
// HOW TO ADD A NEW TOPIC (do this weekly):
// Copy one block below, change every field, paste it into the array.
// - id: unique, lowercase_with_underscores
// - tier: 'beginner' | 'intermediate' | 'advanced'
// - orderIndex: controls the order topics appear in the list
// - definition: 1-2 line crisp definition (memorize this)
// - description: detailed explanation (build understanding)
// - keyPoints: short bullet facts, one idea per line
// - diagram: plain text art, shown in a monospace box
// - useCase: real-world products using this
// - scenario: FAANG interview question this maps to
// - memoryTrick: a mnemonic or analogy to recall fast
// ─────────────────────────────────────────────────────────────

export const dsaTopics = [
  {
    id: 'big_o_notation',
    title: 'Big-O Notation',
    subtitle: 'A simple way to say "how slow does this get as input grows?"',
    emoji: '📈',
    tagColor: tagColors[0],
    category: 'dsa',
    tier: 'beginner',
    group: 'basics',
    orderIndex: 1,

    definition:
      'Big-O describes the UPPER BOUND on how an algorithm\'s time or space grows as input size ' +
      '(n) grows toward infinity, ignoring constant factors and lower-order terms.',

    description:
      'Big-O is a language for comparing algorithms without running them. It answers: "If input ' +
      'doubles, how much slower does this get?"\n\n' +
      'It ignores exact seconds (hardware-dependent) and constant multipliers (O(2n) = O(n)). ' +
      'What matters is the SHAPE of growth: flat, logarithmic, linear, quadratic, exponential.\n\n' +
      'Common classes from fastest to slowest:\n' +
      '• O(1): constant — array[5]\n' +
      '• O(log n): halving each step — binary search\n' +
      '• O(n): one pass — find max\n' +
      '• O(n log n): divide + conquer — merge sort\n' +
      '• O(n²): nested loops — bubble sort\n' +
      '• O(2ⁿ): branching — naive Fibonacci\n\n' +
      'FAANG interviews: always state time AND space complexity for your solution before ' +
      'coding. Interviewer wants to hear your reasoning.',

    keyPoints: [
      'O(1): constant — independent of n. Fastest possible.',
      'O(log n): halving each step. n=1M → only ~20 steps.',
      'O(n): linear — one loop. n=1M → 1M steps.',
      'O(n log n): sort-like. n=1M → ~20M steps.',
      'O(n²): nested loops. n=1M → 10¹² steps (too slow!).',
      'O(2ⁿ): exponential — avoid unless n < 25.',
      'Drop constants: O(2n + 5) → O(n). Drop lower terms: O(n² + n) → O(n²).',
      'Always analyze: worst case, average case, and space (extra memory used).',
      'Amortized: average over many ops (e.g., dynamic array append is O(1) amortized).',
      'Big-O is UPPER bound. Big-Θ is tight. Big-Ω is lower bound.',
    ],

    diagram:
      'Time ▲\n' +
      '     │                                    O(2ⁿ)  ╱\n' +
      '     │                                        ╱\n' +
      '     │                               O(n²)╱\n' +
      '     │                                  ╱\n' +
      '     │                        O(n log n) ╱\n' +
      '     │                            ╱\n' +
      '     │                 O(n)  ╱\n' +
      '     │                    ╱\n' +
      '     │       O(log n)  ╱\n' +
      '     │ O(1) ───────────\n' +
      '     └──────────────────────────────────► n (input size)\n\n' +
      'Growth at n = 1,000,000:\n' +
      '  O(1)       = 1\n' +
      '  O(log n)   ≈ 20\n' +
      '  O(n)       = 1,000,000\n' +
      '  O(n log n) ≈ 20,000,000\n' +
      '  O(n²)      = 10¹²   ← TLE\n' +
      '  O(2ⁿ)      = ☠️',

    whenToUse: 'Before writing ANY solution — estimate Big-O first to catch slow approaches early.',
    whatToUse: 'Count loops (nested = multiply), halving = log, recursion = draw the tree.',

    useCase:
      '• Google Search: needs O(log n) or better for billion-doc index\n' +
      '• Uber matching: real-time dispatch requires near O(1) lookups\n' +
      '• Netflix recommendations: precomputed O(1) cache hits\n' +
      '• Every production system: Big-O becomes SLAs (P99 latency, RPS)',

    scenario:
      'INTERVIEW: "Given an array of n numbers, find if any two sum to a target."\n' +
      '→ Brute force: nested loops → O(n²). Follow-up: "Can we do better?"\n' +
      '→ Yes: hash set. Loop once, check if (target - x) seen. → O(n) time, O(n) space.\n' +
      'Interviewer wants: (1) state brute force first, (2) propose optimization, ' +
      '(3) analyze time AND space, (4) mention trade-off.',

    memoryTrick:
      '"Food prep speed". O(1) = pour a glass. O(log n) = find page in book. ' +
      'O(n) = eat every chip. O(n²) = eat every chip while telling everyone about it. ' +
      'O(2ⁿ) = each chip spawns two chips.',
  },

  {
    id: 'arrays_basics',
    title: 'Arrays',
    subtitle: 'A row of numbered boxes holding your data',
    emoji: '📦',
    tagColor: tagColors[1],
    category: 'dsa',
    tier: 'beginner',
    group: 'basics',
    orderIndex: 2,

    definition:
      'An array is a fixed-size (or dynamically resizable) contiguous block of memory that stores ' +
      'elements of the same type, accessible in O(1) time by index.',

    description:
      'Arrays are the most fundamental data structure. Elements live in contiguous memory, so the ' +
      'computer can compute any address as: base_address + (index × element_size). That\'s why ' +
      'access is O(1) — no scanning.\n\n' +
      'The trade-off: because elements sit next to each other, inserting or deleting in the middle ' +
      'requires shifting all subsequent elements. That\'s O(n).\n\n' +
      'Dynamic arrays (ArrayList, Python list, JS Array, C++ vector): automatically grow by ' +
      'doubling capacity when full. Append is O(1) amortized (occasional O(n) resize spread over ' +
      'many appends).\n\n' +
      'Why arrays are fast in practice: CPU cache locality — consecutive memory reads are ~100x ' +
      'faster than random access.',

    keyPoints: [
      'Access by index: O(1) — base_address + (i × size)',
      'Search by value: O(n) — must scan (unless sorted → binary search O(log n))',
      'Insert/Delete at end: O(1) amortized',
      'Insert/Delete at start or middle: O(n) — elements shift',
      'Fixed size (C, Java int[]): can\'t grow',
      'Dynamic (Python list, JS Array): auto-resize, doubling capacity',
      'Cache-friendly: sequential memory → fast iteration',
      'Two types in strict languages: arrays (fixed) vs slices/vectors (dynamic)',
      'Common bugs: off-by-one (arr[arr.length] is undefined), negative index (Python only)',
      '2D arrays: arr[row][col] — a grid, common in matrix problems',
    ],

    diagram:
      'Index:   0    1    2    3    4\n' +
      '        ┌────┬────┬────┬────┬────┐\n' +
      'Memory: │ 10 │ 25 │  7 │ 42 │  3 │\n' +
      '        └────┴────┴────┴────┴────┘\n' +
      'addr:   1000 1004 1008 1012 1016\n' +
      '        (each int = 4 bytes, so addr = base + i*4)\n\n' +
      'arr[2] → 1000 + 2*4 = 1008 → value 7 (O(1))\n\n' +
      'Insert at index 2:\n' +
      'Before: [10, 25, 7, 42, 3]\n' +
      'After:  [10, 25, 99, 7, 42, 3]\n' +
      '        ↑ everything from index 2 shifts right → O(n)',

    whenToUse: 'You know positions, need fast iteration, cache locality matters.',
    whatToUse: 'Built-in arrays/lists. Use Map/Set if you search by value heavily.',

    useCase:
      '• Every programming language: the default container\n' +
      '• Google Maps: 2D grid of tiles\n' +
      '• Image processing: pixel matrices\n' +
      '• Database column storage: values stored in arrays for cache efficiency',

    scenario:
      'INTERVIEW: "Remove duplicates from a sorted array in-place."\n' +
      '→ Discuss: in-place means O(1) extra space. Use two pointers: write-pointer at slow index, ' +
      'read-pointer scanning ahead. When arr[read] != arr[read-1], copy to arr[write] and ' +
      'increment write. Result: O(n) time, O(1) space.\n' +
      'If not sorted: use Set → O(n) space.',

    memoryTrick:
      '"Locker row". All lockers in a row, you know the number → instant open. ' +
      'But inserting a new locker in the middle means shifting everyone after it.',
  },

  {
    id: 'two_pointers',
    title: 'Two Pointers',
    subtitle: 'Two markers walking through data from different spots',
    emoji: '👉👈',
    tagColor: tagColors[2],
    category: 'dsa',
    tier: 'beginner',
    group: 'patterns',
    orderIndex: 3,

    definition:
      'Two Pointers is a technique that uses two index variables to scan a data structure ' +
      'simultaneously — often from opposite ends or at different speeds — reducing O(n²) ' +
      'brute force to O(n).',

    description:
      'Instead of nesting two loops to compare every pair (O(n²)), move two pointers intelligently ' +
      'based on a condition. Usually requires SORTED data so you know which direction to move.\n\n' +
      'Two main patterns:\n' +
      '1. Opposite ends → inward: left starts at 0, right at n-1. Move based on comparison.\n' +
      '2. Same direction (slow/fast): both start at 0, one moves faster. Detects cycles, ' +
      'removes duplicates, finds middle.\n\n' +
      'Classic problems: pair sum in sorted array, palindrome check, reverse array, ' +
      'container with most water, 3-sum, remove duplicates in place.',

    keyPoints: [
      'Requires SORTED data for opposite-end pattern (or a monotonic property)',
      'Turns O(n²) pair-comparison problems into O(n)',
      'Pattern 1: opposite ends → pair sum, palindrome, reverse, container water',
      'Pattern 2: slow/fast → remove duplicates, detect cycle, find middle',
      'Move pointer based on comparison result: too big? move right inward. Too small? move left inward.',
      'Also works on strings (palindrome check, reverse vowels)',
      'Can be extended to 3 pointers (3-sum) — fix one, two-pointer the rest',
      'Always check: what condition tells me WHICH pointer to move?',
    ],

    diagram:
      'Find pair that sums to 10 in [1, 3, 5, 7, 9]  (sorted)\n\n' +
      'Step 1: left=0(val 1), right=4(val 9) → sum=10 ✓ FOUND\n\n' +
      'If sum too big (e.g., target 8):\n' +
      '  [1, 3, 5, 7, 9]\n' +
      '   L           R    sum=10 > 8 → move R inward\n' +
      '   L        R       sum=8 = 8 ✓\n\n' +
      'Same pattern — slow/fast for removing duplicates:\n' +
      '  [1, 1, 2, 2, 3]\n' +
      '   W\n' +
      '   R → R=1 equals W=1, skip; R=2 != W=1, copy → [1,2,...]',

    whenToUse: 'Sorted array pair/triplet problems, palindromes, in-place removal.',
    whatToUse: 'Two integer indices in a while loop, moving based on comparison.',

    useCase:
      '• LeetCode: 2-Sum, 3-Sum, Container With Most Water, Valid Palindrome\n' +
      '• Real systems: merge two sorted logs by timestamp\n' +
      '• Database joins: sorted-merge join algorithm\n' +
      '• Diff tools: two-pointer walk of two files',

    scenario:
      'INTERVIEW: "Given a sorted array, find two numbers that sum to target."\n' +
      '→ Discuss: brute force O(n²). Two-pointer: L=0, R=n-1. If sum==target, return. ' +
      'If sum < target, L++. If sum > target, R--. O(n) time, O(1) space.\n' +
      'Follow-up: "What if array is NOT sorted?" → sort first (O(n log n)) OR use hash map (O(n) space). ' +
      'The 3-Sum extension: fix one, two-pointer the rest → O(n²).',

    memoryTrick:
      '"Two hikers on a trail". One starts at the trailhead, one at the end, walking toward ' +
      'each other until they meet. Whichever direction makes progress, they move that way.',
  },

  {
    id: 'sliding_window',
    title: 'Sliding Window',
    subtitle: 'A window that slides over data instead of restarting each time',
    emoji: '🪟',
    tagColor: tagColors[3],
    category: 'dsa',
    tier: 'intermediate',
    group: 'patterns',
    orderIndex: 4,

    definition:
      'Sliding Window maintains a subarray/substring "window" and slides it across the input, ' +
      'adding new elements and removing old ones incrementally to achieve O(n) instead of O(n×k).',

    description:
      'Brute force for "max sum of every k consecutive elements" recalculates each window from ' +
      'scratch: O(n × k). Sliding window reuses the previous window: add the new element, ' +
      'subtract the old one → O(n).\n\n' +
      'Two variants:\n' +
      '• Fixed-size window: window size never changes (max sum of size k).\n' +
      '• Variable-size window: window grows/shrinks based on a condition (longest substring ' +
      'without repeats). The right pointer expands; the left pointer contracts when a rule breaks.\n\n' +
      'Recognizing it: "contiguous subarray/substring" + "longest/shortest/max/min" + ' +
      '"no duplicates" or "at most K distinct".',

    keyPoints: [
      'Fixed window: right-left always == k. Slide by adding right, removing left.',
      'Variable window: right expands always; left shrinks when constraint violated.',
      'Turns O(n×k) or O(n²) into O(n)',
      'Right pointer: always moves forward one step at a time',
      'Left pointer: moves forward only when the constraint breaks',
      'Keep a running state: sum, count, or hash map of frequencies',
      'Sign it fits: "contiguous subarray/substring" + "longest/shortest/max/min"',
      'Classic: max sum of size k, longest substring without repeats, min window substring',
    ],

    diagram:
      'Fixed window — max sum of size 3 in [2, 1, 5, 1, 3, 2]\n\n' +
      '[2 1 5] 1 3 2   sum=8\n' +
      ' 2 [1 5 1] 3 2  sum=7   (removed 2, added 1)\n' +
      ' 2 1 [5 1 3] 2  sum=9   (removed 1, added 3)\n' +
      ' 2 1 5 [1 3 2]  sum=6   (removed 5, added 2)\n' +
      'Max = 9  (only O(n) work total, not O(n×k))\n\n' +
      'Variable window — longest substring without repeats in "abcabcbb":\n' +
      '  [a]         length 1\n' +
      '  [a b]       length 2\n' +
      '  [a b c]     length 3\n' +
      '  [a b c a]   dup "a" → shrink left: [b c a]\n' +
      '  [b c a b]   dup "b" → shrink left: [c a b]\n' +
      '  Max = 3',

    whenToUse: 'Contiguous subarray/substring with max/min/longest/shortest constraints.',
    whatToUse: 'Two pointers (left, right) + running sum/count/hash map.',

    useCase:
      '• LeetCode: Longest Substring Without Repeating, Min Window Substring, Max Sum Size K\n' +
      '• Networking: max throughput over last N seconds (rate limiting)\n' +
      '• Finance: rolling average of stock prices\n' +
      '• Streams: moving average in monitoring systems',

    scenario:
      'INTERVIEW: "Find the length of the longest substring without repeating characters."\n' +
      '→ Discuss: brute force O(n²) or O(n³). Sliding window: right expands, char seen? ' +
      'shrink left until no dup. Track max length. Use a set or map for seen chars. ' +
      'O(n) time, O(k) space (k = unique chars, ≤ 26 for lowercase).\n' +
      'Edge cases: empty string, all same chars, all unique.',

    memoryTrick:
      '"Looking through a paper towel tube". You see only what\'s in the tube. ' +
      'Slide the tube right — the right edge adds new content, left edge drops old content.',
  },

  {
    id: 'recursion_basics',
    title: 'Recursion',
    subtitle: 'A function that solves a problem by calling a smaller version of itself',
    emoji: '🪆',
    tagColor: tagColors[4],
    category: 'dsa',
    tier: 'beginner',
    group: 'basics',
    orderIndex: 5,

    definition:
      'Recursion is a technique where a function calls itself with a smaller input until it ' +
      'reaches a base case that can be solved directly, then returns results back up the call stack.',

    description:
      'Every recursive function has two parts:\n' +
      '1. Base case: the stop condition (smallest input answered directly)\n' +
      '2. Recursive case: calls itself with a smaller version of the problem\n\n' +
      'The computer handles this via the call stack — each call is pushed, and once the base case ' +
      'hits, the results "unwind" back up.\n\n' +
      'Without a base case or with the wrong smaller input, you get a stack overflow.\n\n' +
      'Recursion shines for: trees, graphs, backtracking, divide-and-conquer (merge sort, ' +
      'quick sort, binary search), and any problem where "smaller version of itself" is natural.\n\n' +
      'Trade-off: often cleaner code, but uses O(depth) stack memory. Deep recursion can crash — ' +
      'prefer iterative for very deep cases.',

    keyPoints: [
      'Two parts: base case (stop) + recursive case (shrink input)',
      'No base case → infinite recursion → stack overflow crash',
      'Call stack: each recursive call uses O(1) memory, total O(depth)',
      'Recursion tree: draw it to understand complexity',
      'Naive recursion can be exponential (Fibonacci: O(2ⁿ))',
      'Add memoization (cache) → turns exponential into polynomial (DP)',
      'Tail recursion: some languages optimize the last recursive call into a loop',
      'When to prefer iteration: very deep recursion, performance-critical code',
      'Natural fit for: trees, DFS, backtracking, divide & conquer',
      'Every recursion can be rewritten as a loop with an explicit stack',
    ],

    diagram:
      'factorial(4)\n\n' +
      'CALL DOWN:\n' +
      '  factorial(4) = 4 × factorial(3)\n' +
      '    factorial(3) = 3 × factorial(2)\n' +
      '      factorial(2) = 2 × factorial(1)\n' +
      '        factorial(1) = 1  ← BASE CASE\n\n' +
      'UNWIND UP:\n' +
      '        returns 1\n' +
      '      returns 2×1 = 2\n' +
      '    returns 3×2 = 6\n' +
      '  returns 4×6 = 24 ✓\n\n' +
      'Call stack visualization at deepest point:\n' +
      '  ┌─────────────┐\n' +
      '  │ factorial(1)│ ← top\n' +
      '  │ factorial(2)│\n' +
      '  │ factorial(3)│\n' +
      '  │ factorial(4)│ ← bottom\n' +
      '  └─────────────┘',

    whenToUse: 'Trees, graphs, backtracking, divide-and-conquer, natural "smaller version of itself".',
    whatToUse: 'Define base case FIRST, then write the recursive call that shrinks input.',

    useCase:
      '• File system traversal: list all files in a folder (recursive descent)\n' +
      '• JSON parsing: nested objects parsed recursively\n' +
      '• Compilers: parse expression trees recursively\n' +
      '• Git: computing commit history is a recursive walk\n' +
      '• DOM tree rendering in browsers',

    scenario:
      'INTERVIEW: "Compute the nth Fibonacci number."\n' +
      '→ Naive recursion: fib(n) = fib(n-1) + fib(n-2). O(2ⁿ) — explodes at n=40+.\n' +
      '→ Discussion: same subproblem fib(3) computed many times. Add memoization ' +
      '(Map/array cache) → O(n) time, O(n) space.\n' +
      '→ Even better: iterative bottom-up (two variables, loop) → O(n) time, O(1) space.\n' +
      'Interviewer wants: recognize overlapping subproblems = DP.\n' +
      'Follow-up: "What if n = 10,000?" → iterative (recursion would stack-overflow).',

    memoryTrick:
      '"Russian nesting dolls". Open the biggest → find slightly smaller → open that → ' +
      'keep going until the tiniest (base case). Then close them back up (unwind).',
  },

  {
    id: 'linked_list',
    title: 'Linked List',
    subtitle: 'A chain of boxes where each box points to the next one',
    emoji: '🔗',
    tagColor: tagColors[5],
    category: 'dsa',
    tier: 'beginner',
    group: 'basics',
    orderIndex: 6,

    definition:
      'A linked list is a linear data structure where each element (node) contains a value and a ' +
      'pointer to the next node, allowing O(1) insertion/deletion at the ends without shifting.',

    description:
      'Unlike arrays, linked list nodes don\'t need to be contiguous. Each node is a small object: ' +
      '{ value, next }. This gives two benefits:\n' +
      '• Insert/delete at the head: O(1) — just change a pointer\n' +
      '• Dynamic size: grows and shrinks freely, no wasted capacity\n\n' +
      'But two costs:\n' +
      '• Access by index: O(n) — must walk from head\n' +
      '• Extra memory: pointer overhead per node\n' +
      '• Worse cache locality: nodes scattered in memory\n\n' +
      'Types:\n' +
      '• Singly: each node → next\n' +
      '• Doubly: each node ↔ next/prev (allows O(1) deletion given a pointer)\n' +
      '• Circular: tail → head\n\n' +
      'Classic problems: reverse, detect cycle (Floyd\'s), find middle, merge two sorted.',

    keyPoints: [
      'Access by index: O(n). Search by value: O(n).',
      'Insert/delete at head: O(1)',
      'Insert/delete at tail (with tail pointer): O(1)',
      'Insert/delete in middle (given node pointer + doubly): O(1)',
      'Extra memory per node: one pointer (singly) or two (doubly)',
      'No shifting needed — just re-link pointers',
      'Reverse a linked list: iterate with prev/current/next pointers',
      'Floyd\'s cycle detection: slow + fast pointers meet if there\'s a cycle',
      'Find middle: slow + fast pointers (fast 2x), slow lands on middle',
      'Merge two sorted: compare heads, advance smaller',
      'Dummy head trick: use fake node before head to simplify edge cases',
    ],

    diagram:
      'Singly linked list:\n' +
      '  head → [10|•] → [25|•] → [7|•] → [42|null]\n\n' +
      'Doubly linked list:\n' +
      '  head ⇄ [10|•|•] ⇄ [25|•|•] ⇄ [7|•|•] → null\n\n' +
      'Reverse in-place (3 pointers):\n' +
      '  Before: 1 → 2 → 3 → null\n' +
      '  After:  null ← 1 ← 2 ← 3\n' +
      '  prev curr next\n' +
      '  null   1    2      step 1: point curr.next = prev\n' +
      '  null ← 1    2      step 2: prev = curr, curr = next\n' +
      '  Repeat...',

    whenToUse: 'Frequent inserts/deletes at ends, unknown/changing size, queue implementations.',
    whatToUse: 'Built-in LinkedList (Java), or a Node { value, next } class.',

    useCase:
      '• LRU Cache: doubly linked list + hash map (O(1) get/put)\n' +
      '• Browser history: back/forward = doubly linked list\n' +
      '• Music playlist: next/prev songs\n' +
      '• Undo/redo stacks: linked-list-based\n' +
      '• Hash map collision chaining: buckets are linked lists',

    scenario:
      'INTERVIEW: "Detect if a linked list has a cycle."\n' +
      '→ Naive: HashSet of visited nodes → O(n) space.\n' +
      '→ Floyd\'s Cycle: slow (1 step) + fast (2 steps). If they meet → cycle. ' +
      'O(n) time, O(1) space. If fast hits null → no cycle.\n' +
      'Follow-up: "Where does the cycle start?" → after meeting, reset slow to head, ' +
      'move both one step at a time; where they meet = cycle start.\n' +
      'Classic FAANG question (Floyd\'s Tortoise & Hare).',

    memoryTrick:
      '"Treasure hunt with clues". Each clue (node) tells you where the next clue is. ' +
      'To find clue #5, you must follow clues 1→2→3→4 first (no index jump). ' +
      'But adding a new clue at the START is instant (just change one pointer).',
  },

  {
    id: 'stacks',
    title: 'Stack',
    subtitle: 'Last one in is the first one out — like a pile of plates',
    emoji: '🥞',
    tagColor: tagColors[6],
    category: 'dsa',
    tier: 'beginner',
    group: 'basics',
    orderIndex: 7,

    definition:
      'A stack is a LIFO (Last In, First Out) data structure supporting O(1) push (add to top), ' +
      'pop (remove from top), and peek (view top) operations.',

    description:
      'A stack only allows access at one end (the "top"). The most recently pushed item is the ' +
      'first to be popped.\n\n' +
      'Why it matters: the function call stack in every program is literally a stack. Recursion ' +
      'is implemented with a stack. Matching brackets in code editors use a stack.\n\n' +
      'Implementation options:\n' +
      '• Array-backed: push/pop at the end (amortized O(1))\n' +
      '• Linked list-backed: push/pop at head (guaranteed O(1))\n\n' +
      'Common patterns:\n' +
      '• Monotonic stack: maintain increasing/decreasing order for next-greater-element problems\n' +
      '• Two stacks: implement a queue\n' +
      '• Min stack: O(1) minimum tracking',

    keyPoints: [
      'push (add to top): O(1)',
      'pop (remove top): O(1)',
      'peek (view top): O(1)',
      'isEmpty / size: O(1)',
      'No random access — only top is visible',
      'Array implementation: use end as top (arr.push/pop in JS)',
      'Linked list implementation: head is top',
      'Monotonic stack: keeps elements sorted, used for next-greater/smaller',
      'Min stack: pair (value, current_min) to get O(1) minimum',
      'Popping empty stack → error (always check isEmpty first)',
    ],

    diagram:
      'Stack operations (top on the right for clarity):\n\n' +
      'push(3)   → [3]\n' +
      'push(7)   → [3, 7]\n' +
      'push(9)   → [3, 7, 9]  ← top\n' +
      'pop()     → returns 9, stack becomes [3, 7]\n' +
      'peek()    → returns 7 (no removal)\n\n' +
      'Matching brackets: "{[()]}"\n' +
      '  push {, push [, push (\n' +
      '  see ) → pop (  ✓\n' +
      '  see ] → pop [  ✓\n' +
      '  see } → pop {  ✓\n' +
      '  end, stack empty ✓ valid',

    whenToUse: 'Undo, matching brackets, DFS, expression evaluation, backtracking.',
    whatToUse: 'Array with push/pop (built-in), or linked list for guaranteed O(1).',

    useCase:
      '• Code editors: bracket matching, syntax highlighting\n' +
      '• Browser: back button (history is a stack of URLs)\n' +
      '• Compilers: parse expressions via stack-based VM\n' +
      '• Undo/redo in Photoshop, Figma, Word\n' +
      '• Call stack in every language runtime',

    scenario:
      'INTERVIEW: "Given a string of brackets, check if valid."\n' +
      '→ Discuss: use a stack. Iterate chars: opening bracket → push. ' +
      'Closing → check top matches, pop. End: stack must be empty.\n' +
      'O(n) time, O(n) space.\n' +
      'Follow-up: "Given daily temperatures, find next warmer day for each day."\n' +
      '→ Monotonic decreasing stack. O(n). Classic "Next Greater Element" pattern.',

    memoryTrick:
      '"Stack of plates". You always add to the top, and always take from the top. ' +
      'The bottom plate is the loneliest — it waits the longest.',
  },

  {
    id: 'queues',
    title: 'Queue',
    subtitle: 'First one in is the first one out — like a line at a shop',
    emoji: '🎟️',
    tagColor: tagColors[7],
    category: 'dsa',
    tier: 'beginner',
    group: 'basics',
    orderIndex: 8,

    definition:
      'A queue is a FIFO (First In, First Out) data structure supporting O(1) enqueue (add to ' +
      'back), dequeue (remove from front), and peek (view front) operations.',

    description:
      'A queue processes items in arrival order. Anything that arrives first, leaves first.\n\n' +
      'Used everywhere in real systems:\n' +
      '• Task queues: jobs processed in order\n' +
      '• BFS: graph traversal processes nodes level by level\n' +
      '• Message queues: Kafka, RabbitMQ, SQS\n' +
      '• Print spooler: documents print in submission order\n\n' +
      'Implementation pitfall:\n' +
      '• Naive array dequeue (arr.shift) is O(n) — elements shift\n' +
      '• Fix: use a head index or a circular buffer for O(1)\n' +
      '• Or use a linked list with head/tail pointers\n\n' +
      'Variants:\n' +
      '• Deque: double-ended, add/remove from both ends\n' +
      '• Priority Queue: pops highest-priority item (heap)\n' +
      '• Circular Queue: fixed size, wraps around',

    keyPoints: [
      'enqueue (add to back): O(1)',
      'dequeue (remove front): O(1) with proper implementation',
      'peek front: O(1)',
      'FIFO ordering — opposite of stack',
      'Array shift() for dequeue = O(n) — avoid at scale',
      'Circular buffer: fixed size, wraps around (index % capacity)',
      'Deque: both ends O(1) — most flexible',
      'Priority Queue: O(log n) operations (heap-backed)',
      'Two stacks can implement a queue',
      'Used in: BFS, task scheduling, message queues, buffering',
    ],

    diagram:
      'Queue operations:\n\n' +
      'enqueue(A) → [A]\n' +
      'enqueue(B) → [A, B]\n' +
      'enqueue(C) → [A, B, C]\n' +
      'dequeue()  → returns A, queue = [B, C]\n' +
      'peek()     → returns B (no removal)\n\n' +
      'BFS visualization:\n' +
      'Level 0:  [A]         → enqueue B, C\n' +
      'Level 1:  [B, C]      → enqueue D, E, F\n' +
      'Level 2:  [D, E, F]   → enqueue G, H\n' +
      'Process order: A, B, C, D, E, F, G, H (level by level)',

    whenToUse: 'Task scheduling, BFS, message passing, anything processed in arrival order.',
    whatToUse: 'Deque (collections.deque in Python, ArrayDeque in Java) for O(1) both ends.',

    useCase:
      '• Kafka / RabbitMQ / SQS: message queues decouple services\n' +
      '• Redis: list-based queue for background jobs (Sidekiq, Celery)\n' +
      '• BFS in graph search: Uber routing, Google Maps\n' +
      '• Print spooler: OS print jobs in submission order\n' +
      '• CPU scheduling: round-robin uses a ready queue',

    scenario:
      'INTERVIEW: "Design a task scheduler for a video transcoding service."\n' +
      '→ Discuss: FIFO queue for fairness, priority queue for VIP users, ' +
      'dead-letter queue for failed jobs after N retries. ' +
      'Idempotent workers. Batching for throughput.\n' +
      'Real system: Kafka topic with consumer groups.',

    memoryTrick:
      '"Coffee shop line". First in line gets served first. New customers join the back. ' +
      'You can\'t cut the line (no random access).',
  },

  {
    id: 'hash_maps',
    title: 'Hash Map (Hash Table)',
    subtitle: 'Instant lookup by turning a key into a memory address',
    emoji: '🔑',
    tagColor: tagColors[8],
    category: 'dsa',
    tier: 'beginner',
    group: 'basics',
    orderIndex: 9,

    definition:
      'A hash map stores key-value pairs, using a hash function to map each key to an array index, ' +
      'giving O(1) average-case lookup, insert, and delete.',

    description:
      'A hash function converts a key (string, integer) into an integer index into a bucket array. ' +
      'The value is stored at that index. To look up, you hash the key again, get the index, and ' +
      'jump straight there.\n\n' +
      'Two keys can hash to the same index (collision). Two ways to handle:\n' +
      '• Chaining: each bucket is a linked list of entries (most common)\n' +
      '• Open addressing: probe for the next free slot (linear/quadratic/double hashing)\n\n' +
      'Load factor = entries / buckets. When it exceeds ~0.75, the table resizes (rehash) to ' +
      'keep operations O(1).\n\n' +
      'Worst case O(n) if all keys collide — but with a good hash function and resizing, this is ' +
      'essentially impossible in practice.',

    keyPoints: [
      'Insert, Delete, Lookup: O(1) average',
      'Worst case: O(n) if all keys collide (rare with good hashing)',
      'Hash function: uniform distribution, deterministic, fast',
      'Collisions: chaining (linked lists) or open addressing (probing)',
      'Load factor threshold: ~0.75 → resize (double buckets, rehash)',
      'No ordered iteration (unless using LinkedHashMap or TreeMap)',
      'Keys must be immutable and hashable (no mutation after insert)',
      'Used for: counting, caching, dedup, "have I seen this", two-sum',
      'Hash collision attack (HashDoS): adversarial keys → worst-case O(n). Fix: random seed.',
      'Python dict, Java HashMap, JS Map, C++ unordered_map — all hash maps',
    ],

    diagram:
      'Hash table with 5 buckets:\n\n' +
      'index  bucket\n' +
      '  0    [    ]\n' +
      '  1    [ kiwi → 9 ]\n' +
      '  2    [    ]\n' +
      '  3    [ apple → 25 ] → [ grape → 4 ]  ← collision chained\n' +
      '  4    [    ]\n\n' +
      'hash("apple") % 5 = 3 → bucket[3]\n' +
      'hash("grape") % 5 = 3 → collision → chained after apple\n\n' +
      'Lookup: hash("apple") → 3 → walk chain → found',

    whenToUse: 'Fast key lookup, count frequencies, dedup, cache, "have I seen this".',
    whatToUse: 'Python dict, Java HashMap, JS Object/Map, C++ unordered_map.',

    useCase:
      '• Redis: the entire in-memory store is hash maps\n' +
      '• Databases: hash indexes for equality lookups\n' +
      '• Compilers: symbol tables map identifiers to types\n' +
      '• Web: session stores, rate limiters, caches\n' +
      '• DNS resolution: cached hash map at every resolver',

    scenario:
      'INTERVIEW: "Find the first non-repeating character in a string."\n' +
      '→ Discuss: two-pass with hash map. Pass 1: count frequencies. ' +
      'Pass 2: return first char with count 1. O(n) time, O(k) space (k = unique chars).\n' +
      'Follow-up: "Return all duplicates." → iterate map, collect count > 1.\n' +
      'FAANG interviewer may ask: "What\'s the worst-case complexity?" → O(n) if adversarial ' +
      'input, but negligible for random input with proper hashing.',

    memoryTrick:
      '"Library index card". Book title → card catalog → exact shelf. ' +
      'You don\'t walk every aisle. Same key → same card every time.',
  },

  {
    id: 'binary_search',
    title: 'Binary Search',
    subtitle: 'Find anything in a sorted list by cutting it in half each time',
    emoji: '🔍',
    tagColor: tagColors[9],
    category: 'dsa',
    tier: 'beginner',
    group: 'patterns',
    orderIndex: 10,

    definition:
      'Binary Search finds a target in a SORTED array in O(log n) time by repeatedly halving ' +
      'the search range based on comparison with the middle element.',

    description:
      'Start with the full array. Check the middle. If it matches — done. If target is smaller, ' +
      'search only the left half. If bigger, only the right half. Each comparison eliminates half ' +
      'the remaining candidates.\n\n' +
      'Requires SORTED data. On unsorted data, sort first (O(n log n)) or use a hash map (O(n)).\n\n' +
      'Why O(log n) matters: n = 1 billion → only ~30 comparisons. Doubling n adds just ONE step. ' +
      'That\'s why every database index uses B-trees (extended binary search).\n\n' +
      'Variants:\n' +
      '• Find first/last occurrence (with duplicates)\n' +
      '• Find insertion point\n' +
      '• Search in rotated sorted array\n' +
      '• Binary search on the ANSWER (not on the array) — advanced pattern',

    keyPoints: [
      'Requires SORTED data — this is non-negotiable',
      'Time: O(log n). Space: O(1) iterative (O(log n) if recursive).',
      'Classic formula: mid = low + (high - low) / 2  (avoid overflow)',
      'Infinite loop bug: always move low or high past mid to shrink range',
      'Loop condition: while low <= high (inclusive bounds) OR while low < high (exclusive)',
      'Find first/last occurrence: don\'t stop on match, keep searching',
      'Binary search on answer: "min max/smallest sufficient" → binary search the answer space',
      'Rotated sorted array: compare arr[mid] vs arr[low] to decide which half is sorted',
      'Built-in: Python bisect, C++ lower_bound/upper_bound',
      'Foundation for: databases (B-trees), git bisect, IP routing tables',
    ],

    diagram:
      'Find 3 in sorted [1, 3, 5, 7, 9, 11, 13]\n\n' +
      'Step 1: [1, 3, 5, 7, 9, 11, 13]\n' +
      '          L        M         R\n' +
      '        arr[3] = 7, target 3 < 7 → search left half\n\n' +
      'Step 2: [1, 3, 5]\n' +
      '          L  M  R\n' +
      '        arr[1] = 3, target 3 == 3 → FOUND at index 1\n\n' +
      'Total steps: 2  (vs linear scan: 2 too, but for n=1B, log₂(1B) ≈ 30)\n\n' +
      'Steps vs n:\n' +
      '  n=100        → 7 steps\n' +
      '  n=1,000      → 10 steps\n' +
      '  n=1,000,000  → 20 steps\n' +
      '  n=1,000,000,000 → 30 steps',

    whenToUse: 'Searching sorted data, "find boundary where condition flips" problems.',
    whatToUse: 'While loop with low/high/mid pointers, or a built-in (bisect in Python).',

    useCase:
      '• Database indexes: B-tree = binary search on disk blocks\n' +
      '• Git bisect: find which commit broke things in O(log n)\n' +
      '• IP routing: longest-prefix match in routing tables\n' +
      '• Compilers: symbol table lookups\n' +
      '• Version control: finding the exact version of a bad release',

    scenario:
      'INTERVIEW: "Find the minimum in a rotated sorted array (e.g., [4,5,6,7,0,1,2])."\n' +
      '→ Discuss: binary search. If arr[mid] > arr[high], min is in right half. ' +
      'Else, min is in left half (including mid). O(log n).\n' +
      'Follow-up: "What if duplicates exist?" → handle arr[mid] == arr[high] by decrementing high.\n' +
      'Also: "Find the first bad version" → binary search the answer space.',

    memoryTrick:
      '"Guess-a-number game (1 to 100)". Guessing 50 cuts your range in half. ' +
      'Guess 25 or 75 next → halves again. Only 7 guesses to find any number.',
  },
];