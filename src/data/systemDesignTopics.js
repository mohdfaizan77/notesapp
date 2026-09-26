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

export const systemDesignTopics = [
  // ═══════════════════════════════════════════════════════════
  // PART 1: FOUNDATIONS & CORE BUILDING BLOCKS
  // ═══════════════════════════════════════════════════════════

  {
    id: 'load_balancer',
    title: 'Load Balancer',
    subtitle: 'Traffic cop that distributes requests across backend servers',
    emoji: '⚖️',
    tagColor: tagColors[0],
    category: 'systemDesign',
    tier: 'beginner',
    group: 'fundamentals',
    orderIndex: 1,

    definition:
      'A Load Balancer is a component that distributes incoming network traffic across multiple ' +
      'backend servers to ensure no single server is overwhelmed.',

    description:
      'Think of a restaurant host who seats guests at whichever table is free. Without the host, ' +
      'everyone rushes to one table and chaos ensues. Similarly, without a load balancer, all ' +
      'traffic hits one server, which crashes under load.\n\n' +
      'A load balancer sits between clients and servers. It:\n' +
      '1. Receives every incoming request\n' +
      '2. Picks a healthy backend server using an algorithm\n' +
      '3. Forwards the request and returns the response\n' +
      '4. Continuously health-checks servers to avoid sending traffic to dead nodes\n\n' +
      'This gives you three superpowers: high availability (failover), scalability (add servers), ' +
      'and zero-downtime deployments (drain nodes one by one).',

    keyPoints: [
      'Algorithms: Round Robin (cycle), Least Connections (smart), IP Hash (sticky)',
      'L4 (transport) = fast, dumb; L7 (application) = slow, smart (HTTP-aware)',
      'Health checks: LB pings servers; unhealthy ones are removed from pool',
      'Sticky sessions: same user → same server (needed for in-memory sessions)',
      'Failover: if a server dies, LB routes to healthy ones (HA)',
      'Scaling: add servers behind LB with zero client changes',
      'Tools: NGINX, HAProxy, AWS ALB/NLB, Google Cloud LB, Cloudflare',
      'SPOF: LB itself can fail → need LB redundancy (active-passive or anycast)',
    ],

    diagram:
      '                  ┌──────────────┐\n' +
      '                  │ Load Balancer│\n' +
      '                  └──────┬───────┘\n' +
      '          ┌──────────────┼──────────────┐\n' +
      '          ▼              ▼              ▼\n' +
      '      ┌───────┐      ┌───────┐      ┌───────┐\n' +
      '      │ Svr A │      │ Svr B │      │ Svr C │\n' +
      '      └───────┘      └───────┘      └───────┘\n\n' +
      'Algorithms:\n' +
      '  Round Robin: A → B → C → A → B → C\n' +
      '  Least Conn:  A(3) B(7) C(1) → next goes to C\n' +
      '  IP Hash:     hash(client_ip) % N → always same server',

    whenToUse: 'Whenever you have 2+ backend servers and need HA + horizontal scaling.',
    whatToUse: 'NGINX, HAProxy, AWS ALB (L7), AWS NLB (L4), Google Cloud LB, Cloudflare.',

    useCase:
      '• Amazon: Black Friday traffic spread across thousands of servers\n' +
      '• Netflix: no single server crashes during peak streaming hours\n' +
      '• Google: anycast LB sends users to nearest data center\n' +
      '• Every microservice architecture: LB in front of each service pool',

    scenario:
      'INTERVIEW: "Design a load balancer for a service handling 1M RPS."\n' +
      '→ Discuss: L4 vs L7 choice, algorithm (least-conn vs round-robin), health check ' +
      'interval + threshold, sticky sessions vs stateless, LB HA (active-passive, anycast), ' +
      'connection draining for deploys, TLS termination location.',

    memoryTrick:
      '"Host at a restaurant" — the host (LB) decides which table (server) you sit at. ' +
      'If a waiter is sick (server dead), host stops seating there.',
  },

  {
    id: 'sql_vs_nosql',
    title: 'Database (SQL vs NoSQL)',
    subtitle: 'Permanent storage for structured or unstructured data',
    emoji: '🗄️',
    tagColor: tagColors[1],
    category: 'systemDesign',
    tier: 'beginner',
    group: 'fundamentals',
    orderIndex: 2,

    definition:
      'SQL databases store structured data in tables with strict schemas and ACID transactions; ' +
      'NoSQL databases store flexible, schema-less data optimized for horizontal scale.',

    description:
      'SQL (Relational) databases model data as tables with rows and columns, related via foreign ' +
      'keys. They enforce a strict schema (you define columns upfront) and provide ACID transactions ' +
      '(Atomicity, Consistency, Isolation, Durability). Great for structured, relational data.\n\n' +
      'NoSQL databases trade strictness for flexibility and scale. Four families:\n' +
      '• Key-Value (Redis, DynamoDB): simple hash map. Fast lookups.\n' +
      '• Document (MongoDB, CouchDB): JSON documents. Flexible schema.\n' +
      '• Column-Family (Cassandra, HBase): wide rows, time-series friendly.\n' +
      '• Graph (Neo4j, Neptune): nodes + edges. Social, recommendations.\n\n' +
      'NoSQL uses BASE (Basically Available, Soft state, Eventual consistency) instead of ACID.',

    keyPoints: [
      'SQL: strict schema, ACID, JOINs, vertical scaling (harder to scale writes)',
      'NoSQL: flexible schema, BASE, no JOINs (embed/denormalize), horizontal scaling',
      'SQL scales reads via replicas, writes via sharding (complex)',
      'NoSQL scales writes natively via partition key',
      'SQL: banking, ERP, e-commerce (data integrity critical)',
      'NoSQL: social feeds, IoT, logs, caching, real-time analytics',
      'Real systems mix: Postgres (users) + Redis (sessions) + Cassandra (events)',
      'Choose by access pattern, not by hype',
    ],

    diagram:
      'SQL (Relational):              NoSQL (Document):\n' +
      '  ┌─────┬───────┬─────┐         { "_id": 1,\n' +
      '  │ id  │ name  │ age │           "name": "Alice",\n' +
      '  ├─────┼───────┼─────┤           "orders": [\n' +
      '  │ 1   │ Alice │ 30  │             { "id": 100, "total": 50 },\n' +
      '  │ 2   │ Bob   │ 25  │             { "id": 101, "total": 75 }\n' +
      '  └─────┴───────┴─────┘           ] }\n' +
      '  + JOINs, FK, ACID                No JOIN, embedded, BASE\n' +
      '  Scale: Vertical                  Scale: Horizontal',

    whenToUse: 'SQL for structured + transactional. NoSQL for flexible + massive scale.',
    whatToUse: 'SQL: Postgres, MySQL. NoSQL: DynamoDB, MongoDB, Cassandra, Redis.',

    useCase:
      '• Instagram: PostgreSQL for users, follows, photos\n' +
      '• Facebook: Cassandra for messenger + inbox search\n' +
      '• Amazon: DynamoDB for shopping cart (session data)\n' +
      '• Uber: Cassandra for trip/location events\n' +
      '• Stripe: PostgreSQL for payments (needs ACID)',

    scenario:
      'INTERVIEW: "Design a user profile system for a social network."\n' +
      '→ Discuss: SQL vs NoSQL trade-off. Read pattern (fetch profile by user_id → KV store). ' +
      'Update pattern (rare → SQL is fine). Scale (millions of users → NoSQL for horizontal). ' +
      'Mixed approach: SQL for user metadata, Redis for session, Cassandra for activity feed.',

    memoryTrick:
      'SQL = "Structured, Strict, Safe" (banking).\n' +
      'NoSQL = "Not Only SQL, Not Structured, No Limits" (social, IoT).',
  },

  {
    id: 'cache',
    title: 'Cache',
    subtitle: 'Small, ultra-fast RAM storage for frequently accessed data',
    emoji: '⚡',
    tagColor: tagColors[2],
    category: 'systemDesign',
    tier: 'beginner',
    group: 'fundamentals',
    orderIndex: 3,

    definition:
      'A cache is a small, ultra-fast storage layer (usually RAM) that stores the results of ' +
      'expensive operations so future requests can be served instantly.',

    description:
      'Cache = RAM memory that sits in front of a slower data source (DB, external API, disk). ' +
      'Instead of recomputing or refetching on every request, you store the result once and ' +
      'return it in microseconds.\n\n' +
      'RAM is ~10,000x faster than disk, so a cache hit feels instant. But caches are small ' +
      '(limited RAM) so you must decide what to keep and what to evict.\n\n' +
      'Three core caching patterns:\n' +
      '• Cache-Aside: app checks cache; on miss, reads DB and populates cache.\n' +
      '• Write-Through: writes go to cache AND DB (strong consistency, slower).\n' +
      '• Write-Behind: writes go to cache only; async flush to DB (fast, risky).\n\n' +
      'Cache invalidation is famously hard. You solve it with TTL + explicit purge on write.',

    keyPoints: [
      'Cache-Aside: default pattern. App-managed. Best for read-heavy.',
      'Write-Through: strong consistency, slower writes',
      'Write-Behind: fast writes, risk of loss on cache crash',
      'Eviction policies: LRU (recent), LFU (frequent), TTL (time)',
      'Cache stampede: popular key expires → 1000s of requests hit DB → DB dies',
      'Fix stampede: mutex lock + probabilistic early expiration (XFetch)',
      'Hot key problem: one key dominates traffic → split into sub-keys',
      'Tools: Redis (rich structures), Memcached (simple KV)',
    ],

    diagram:
      'Request → ┌────────┐  HIT  → Return (microseconds)\n' +
      '          │ Cache  │\n' +
      '          └────┬───┘\n' +
      '               │ MISS\n' +
      '               ▼\n' +
      '          ┌────────┐\n' +
      '          │   DB   │  → Store in cache → Return (milliseconds)\n' +
      '          └────────┘\n\n' +
      'Cache hit ratio = hits / (hits + misses). 90%+ is ideal.',

    whenToUse: 'Read-heavy workloads, expensive queries, repeated lookups, hot data.',
    whatToUse: 'Redis (rich), Memcached (simple), in-app cache (Caffeine), CDN (HTTP cache).',

    useCase:
      '• Twitter: trending tweets + timelines cached in Redis\n' +
      '• YouTube: video metadata cached at edge\n' +
      '• Banks: recent ATM balance cached for fast withdrawal\n' +
      '• Amazon: product pages cached heavily\n' +
      '• Facebook: social graph edges cached in memcached',

    scenario:
      'INTERVIEW: "Your DB is overwhelmed by read traffic. How do you fix it?"\n' +
      '→ Discuss: cache-aside with Redis, TTL tuning, invalidation strategy (write-through vs purge), ' +
      'stampede mitigation (mutex), hot key handling, cache warming, monitoring hit ratio.',

    memoryTrick:
      'Cache = "Fridge". Expensive to cook (DB query) → store leftovers (cache) → reheat fast ' +
      '(return cache hit). Clean out old food (evict LRU).',
  },

  {
    id: 'message_queue',
    title: 'Message Queue',
    subtitle: 'Async buffer that decouples producer from consumer',
    emoji: '📨',
    tagColor: tagColors[3],
    category: 'systemDesign',
    tier: 'beginner',
    group: 'asyncProcessing',
    orderIndex: 4,

    definition:
      'A message queue is a durable buffer that holds messages produced by one service until ' +
      'another service is ready to process them, decoupling producers from consumers.',

    description:
      'Without a queue: producer calls consumer synchronously → producer waits → if consumer ' +
      'is slow or down, producer fails. Tight coupling.\n\n' +
      'With a queue: producer drops a message and returns immediately. Consumer picks it up ' +
      'whenever ready. Decoupled, resilient, scalable.\n\n' +
      'Three big wins:\n' +
      '• Decoupling: producer doesn\'t know/care who consumes\n' +
      '• Buffering: absorbs traffic spikes (queue grows, drains later)\n' +
      '• Resilience: messages survive consumer downtime (durable storage)\n\n' +
      'Contrast with Pub/Sub: queue = one consumer per message; pub/sub = all subscribers get a copy.',

    keyPoints: [
      'Producer → Queue → Consumer (async, decoupled)',
      'At-least-once delivery (default): duplicates possible',
      'At-most-once: fast, possible loss',
      'Exactly-once: requires idempotent consumers + transactions',
      'Dead Letter Queue (DLQ): failed messages go here after N retries',
      'Backpressure: queue depth grows → alert or reject producers',
      'Ordering: FIFO per partition (Kafka) — global ordering is expensive',
      'Tools: Kafka (event streaming, high throughput), RabbitMQ (routing), SQS (managed)',
    ],

    diagram:
      'Producer              Queue              Consumer\n' +
      '  │                     │                   │\n' +
      '  │──msg #1────────────►│                   │\n' +
      '  │──msg #2────────────►│◄──── pull ────────│\n' +
      '  │  (returns fast)     │                   │\n' +
      '  │                     │───msg #1─────────►│ process\n' +
      '  │                     │                   │\n' +
      '  │                     │◄───ack────────────│\n' +
      '  │                     │                   │\n' +
      'YouTube example:\n' +
      '  Upload → Queue → Workers transcode 1080p/720p/480p async',

    whenToUse: 'Async workflows, spike absorption, decoupling microservices, retries.',
    whatToUse: 'Kafka (event streaming), RabbitMQ (routing), SQS (managed), NATS.',

    useCase:
      '• YouTube: video upload → queue → async transcoding pipeline\n' +
      '• Uber: ride request → queue → match driver, notify, charge\n' +
      '• Amazon: order placed → queue → inventory, payment, email, shipping\n' +
      '• LinkedIn: activity events → Kafka → feed, search, analytics',

    scenario:
      'INTERVIEW: "Design a video upload service (YouTube)."\n' +
      '→ Discuss: upload API → S3 → publish event to Kafka → workers consume → ' +
      'transcode (1080p/720p/480p), generate thumbnails, scan copyright → ' +
      'update metadata → notify user. DLQ for failed transcodes. Idempotent workers.',

    memoryTrick:
      '"Mailbox". You drop a letter (message) → return to your day → postman (consumer) ' +
      'delivers later. You don\'t wait at the mailbox.',
  },

  {
    id: 'cdn',
    title: 'CDN (Content Delivery Network)',
    subtitle: 'Geographically distributed servers for static content',
    emoji: '🌍',
    tagColor: tagColors[4],
    category: 'systemDesign',
    tier: 'beginner',
    group: 'fundamentals',
    orderIndex: 5,

    definition:
      'A CDN is a network of geographically distributed edge servers that cache and serve ' +
      'static content from the location closest to each user.',

    description:
      'Physical distance = latency. A user in India fetching from a US server waits ~200ms per ' +
      'round-trip. A CDN edge server in Mumbai serves the same content in ~10ms.\n\n' +
      'How it works: first request for an asset goes to origin; the CDN edge caches it. ' +
      'Future requests are served from the nearest edge. Only cache misses and dynamic requests ' +
      'hit origin.\n\n' +
      'Two modes:\n' +
      '• Pull CDN: edge fetches from origin on first miss (most common)\n' +
      '• Push CDN: you upload assets to CDN explicitly (rare, for large files)\n\n' +
      'Big wins: 80%+ reduction in origin bandwidth, DDoS protection, global low latency.',

    keyPoints: [
      'Edge server = closest PoP (Point of Presence) to user',
      'Pull CDN (default): auto-cache on first request',
      'Push CDN: manual upload (video, OS images)',
      'Cache invalidation: TTL, purge API, or versioned filenames (app.v2.js)',
      'Dynamic content: newer CDNs (Cloudflare Workers) run code at edge',
      'Origin shield: mid-tier cache to reduce origin load on many edges',
      'DDoS: CDN absorbs volumetric attacks across edge network',
      'Tools: Cloudflare, Akamai, Fastly, AWS CloudFront, Google Cloud CDN',
    ],

    diagram:
      'User (India) ──► CDN Edge (Mumbai) ──HIT──► Return  FAST\n' +
      '                       │ MISS\n' +
      '                       ▼\n' +
      '                  Origin (US)  →  cache at edge  →  Return SLOW once\n\n' +
      'User (USA) ──► CDN Edge (Virginia) ──HIT──► Return FAST\n\n' +
      'Latency comparison:\n' +
      '  Origin direct: 200ms\n' +
      '  CDN edge:      10ms (20x faster)',

    whenToUse: 'Static assets (images, JS, CSS, video), global audience, DDoS protection.',
    whatToUse: 'Cloudflare, Akamai, CloudFront, Fastly, Google Cloud CDN.',

    useCase:
      '• Netflix: Open Connect CDN streams 4K to millions\n' +
      '• YouTube: video chunks served from edge\n' +
      '• Shopify: product images from CDN\n' +
      '• News sites: articles + images globally\n' +
      '• Cloudflare: 1.1.1.1 DNS + CDN + DDoS protection',

    scenario:
      'INTERVIEW: "Design a global image hosting service."\n' +
      '→ Discuss: upload → S3 origin → CDN (CloudFront) → edge caches. ' +
      'Versioned filenames for cache busting. TTL tuning per asset type. ' +
      'Origin shield to protect S3. Signed URLs for private images.',

    memoryTrick:
      '"Local grocery store". Instead of driving to the warehouse (origin) every time, ' +
      'you buy from the corner shop (edge) that already has what you need.',
  },

  // ═══════════════════════════════════════════════════════════
  // PART 2: DATABASE DESIGN
  // ═══════════════════════════════════════════════════════════

  {
    id: 'database_indexing',
    title: 'Database Indexing',
    subtitle: 'B-Tree structures that speed up reads at the cost of writes',
    emoji: '📇',
    tagColor: tagColors[5],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'dataStorage',
    orderIndex: 6,

    definition:
      'An index is a separate data structure (usually B-Tree/B+Tree) that allows the database ' +
      'to find rows in O(log n) time instead of scanning the whole table in O(n).',

    description:
      'Without an index, a query that filters by a column must scan every row in the table ' +
      '(full table scan). With 10M rows, that\'s slow. With an index on that column, the DB ' +
      'walks a B-Tree in O(log n) lookups.\n\n' +
      'But indexes cost: every INSERT/UPDATE/DELETE must also update every index on the table. ' +
      'Storage grows. So you must be selective.\n\n' +
      'Index types:\n' +
      '• Clustered (primary): rows physically stored in index order (only 1 per table)\n' +
      '• Secondary (non-clustered): separate structure pointing to rows\n' +
      '• Composite: index on multiple columns (leftmost prefix rule)\n' +
      '• Unique: enforces uniqueness. Partial: only subset of rows.\n' +
      '• Full-text / GIN / BRIN: special-purpose indexes',

    keyPoints: [
      'Clustered index: 1 per table, data stored sorted by key',
      'Secondary index: many per table, points to row',
      'Composite (a,b,c): leftmost prefix — works for a, a+b, a+b+c, NOT b alone',
      'Covering index: contains all columns needed → no table lookup',
      'Write penalty: each extra index slows writes',
      'Index WHERE, JOIN, ORDER BY columns',
      'EXPLAIN ANALYZE to verify index is actually used',
      'Too many indexes = slow writes + wasted storage',
    ],

    diagram:
      'Without index:  SCAN 10M rows → find 1  (SLOW)\n\n' +
      'With B-Tree index on "age":\n' +
      '                [50]\n' +
      '               /    \\\n' +
      '          [20,30]   [70,80]\n' +
      '         /  |  \\    /  |  \\\n' +
      '       [10][25][35][60][75][90]\n' +
      '       O(log n) lookups = ~23 steps for 10M rows\n\n' +
      'Composite (last_name, first_name):\n' +
      '  WHERE last_name = "Smith"                     ✓ uses index\n' +
      '  WHERE last_name = "Smith" AND first_name="A"  ✓ uses index\n' +
      '  WHERE first_name = "A"                        ✗ full scan',

    whenToUse: 'Slow queries on WHERE / JOIN / ORDER BY columns.',
    whatToUse: 'Postgres B-Tree (default), GIN (JSON/full-text), BRIN (time-series), MySQL InnoDB.',

    useCase:
      '• Amazon: composite index (category_id, price) for product browse\n' +
      '• Uber: geospatial index (R-Tree) to find nearby drivers\n' +
      '• Twitter: index (user_id, created_at DESC) for timelines\n' +
      '• Banking: clustered index on transaction_date for statements',

    scenario:
      'INTERVIEW: "A query on users table by email takes 5 seconds. How do you fix it?"\n' +
      '→ Discuss: EXPLAIN ANALYZE to confirm full scan. Add B-Tree index on email. ' +
      'Verify plan changes. Measure improvement. Watch write impact (INSERT slower). ' +
      'Consider unique index if emails must be unique. Partial index if only active users queried.',

    memoryTrick:
      '"Book index". Without it, you scan every page to find a topic. With it, you jump ' +
      'straight to the right page. But adding a new page requires updating the index too.',
  },

  {
    id: 'partitioning',
    title: 'Partitioning',
    subtitle: 'Split one large table into smaller pieces on the SAME server',
    emoji: '🧩',
    tagColor: tagColors[6],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'dataStorage',
    orderIndex: 7,

    definition:
      'Partitioning splits one large table into smaller physical pieces (partitions) that stay ' +
      'on the same server but are managed and queried independently.',

    description:
      'When a table grows to hundreds of millions of rows, single-table operations become slow: ' +
      'queries scan too much, backups take hours, VACUUM/ANALYZE is painful.\n\n' +
      'Partitioning solves this by splitting the table into smaller chunks (e.g., by month). ' +
      'The application still sees one table, but the DB stores and queries each partition separately.\n\n' +
      'Types:\n' +
      '• Horizontal (range): rows by date range (2024-Q1, Q2...)\n' +
      '• Vertical: split columns (hot vs cold)\n' +
      '• List: split by discrete values (US, EU, Asia)\n' +
      '• Hash: hash(key) % N for even distribution\n\n' +
      'Huge win: partition pruning. A query for "orders in Q1" only scans the Q1 partition, ' +
      'not the entire 500M-row table.',

    keyPoints: [
      'Same server: partitions share CPU/RAM/disk',
      'Partition pruning: queries skip irrelevant partitions',
      'Maintenance: DROP PARTITION is instant (vs DELETE millions)',
      'Parallel queries: each partition can be scanned in parallel',
      'Limitations: cross-partition queries slower, unique constraints hard',
      'Postgres: declarative RANGE/LIST/HASH partitioning',
      'Choose partition key carefully — must match query patterns',
      'Different from sharding: partitioning = same server, sharding = different servers',
    ],

    diagram:
      'Before:\n' +
      '  ┌───────────────────────────────────────┐\n' +
      '  │      ORDERS (500M rows)               │\n' +
      '  │  Slow queries, hard backups           │\n' +
      '  └───────────────────────────────────────┘\n\n' +
      'After (RANGE by quarter):\n' +
      '  ┌──────────┐ ┌──────────┐ ┌──────────┐\n' +
      '  │ Q1 2024  │ │ Q2 2024  │ │ Q3 2024  │\n' +
      '  │ 125M     │ │ 125M     │ │ 125M     │\n' +
      '  └──────────┘ └──────────┘ └──────────┘\n' +
      '  Query "Q1 orders" → scan only Q1 partition (pruning)',

    whenToUse: 'Table > 100M rows, time-series data, easy archival, parallel scans.',
    whatToUse: 'PostgreSQL declarative, MySQL partitioning, Oracle range partitioning.',

    useCase:
      '• TimescaleDB: time-series partitioned by time\n' +
      '• Banking: transactions partitioned by month for statements\n' +
      '• IoT: sensor readings partitioned by day\n' +
      '• SaaS: logs partitioned by tenant_id + date',

    scenario:
      'INTERVIEW: "Your orders table has 1B rows. Range queries by date are slow."\n' +
      '→ Discuss: partition by RANGE (order_date) monthly. Old partitions can be dropped. ' +
      'Queries filter by date → partition pruning. Archive old partitions to S3. ' +
      'Don\'t forget: unique constraints must include partition key.',

    memoryTrick:
      '"Filing cabinet". Instead of one giant drawer, you have drawers by month. ' +
      'Need January orders? Open just that drawer (partition pruning).',
  },

  {
    id: 'sharding',
    title: 'Sharding',
    subtitle: 'Horizontal partitioning across MULTIPLE servers',
    emoji: '💎',
    tagColor: tagColors[7],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'dataStorage',
    orderIndex: 8,

    definition:
      'Sharding splits one large dataset horizontally across multiple database servers, where ' +
      'each shard holds a distinct subset of rows and lives on its own machine.',

    description:
      'Partitioning fails when one machine can\'t handle the load (CPU, RAM, disk, network). ' +
      'Sharding solves this by putting different data on different servers.\n\n' +
      'A shard key (e.g., user_id) determines which shard holds a row:\n' +
      '• Range: user_id 1-1M → shard 1\n' +
      '• Hash: hash(user_id) % N → shard\n' +
      '• Directory: lookup table maps key → shard\n' +
      '• Geographic: US → shard A, EU → shard B\n\n' +
      'Now writes and storage scale linearly: add more shards for more capacity.\n\n' +
      'But sharding is a one-way door with consequences: cross-shard queries, cross-shard ' +
      'transactions, rebalancing when adding shards, and hotspots.',

    keyPoints: [
      'Shard key = THE decision. Even distribution + query pattern + no hotspots',
      'Range: simple, but hotspots on newest shard',
      'Hash: even distribution, but range queries hit all shards',
      'Directory: flexible, but lookup SPOF + latency',
      'Geographic: locality + GDPR, but cross-region slow',
      'Cross-shard queries: scatter-gather (slow) or denormalize',
      'Cross-shard transactions: 2PC (slow) or SAGA (eventual)',
      'Rebalancing: consistent hashing moves only K/N keys',
      'Hotspots: celebrity user → split shard or cache',
    ],

    diagram:
      '              ┌────────────────┐\n' +
      '              │  Application   │\n' +
      '              └───────┬────────┘\n' +
      '                      ▼\n' +
      '              ┌────────────────┐\n' +
      '              │ Shard Router   │\n' +
      '              │ hash(user_id)  │\n' +
      '              └───┬────┬───┬───┘\n' +
      '         ┌────────┘    │   └────────┐\n' +
      '         ▼             ▼            ▼\n' +
      '   ┌─────────┐   ┌─────────┐   ┌─────────┐\n' +
      '   │ Shard 1 │   │ Shard 2 │   │ Shard 3 │\n' +
      '   │ 1-1M    │   │ 1M-2M   │   │ 2M-3M   │\n' +
      '   └─────────┘   └─────────┘   └─────────┘\n' +
      '   (own CPU, RAM, disk) — no sharing',

    whenToUse: 'Table > 1B rows, write bottleneck, need horizontal scale beyond one machine.',
    whatToUse: 'Vitess (MySQL), Citus (Postgres), MongoDB sharding, DynamoDB, Cassandra.',

    useCase:
      '• Instagram: sharded Postgres by user_id (billions of photos)\n' +
      '• Twitter: sharded by user_id (500M+ tweets/day)\n' +
      '• Uber: sharded by city_id for geo-locality\n' +
      '• Discord: sharded by guild_id (billions of messages)\n' +
      '• WhatsApp: sharded by phone_number (2B+ users)',

    scenario:
      'INTERVIEW: "Design Instagram\'s photo storage for 2B users."\n' +
      '→ Discuss: shard by user_id (photos belong to one user, queries by user are local). ' +
      'Hash sharding for even distribution. Metadata in Postgres shards, blobs in S3. ' +
      'CDN in front. Celebrity users → dedicated shard or cache. Cross-shard feed → fan-out.',

    memoryTrick:
      '"Multiple bank branches". Instead of one giant bank handling everyone, ' +
      'you have branches (shards) — each handles its own customers. ' +
      'Same service, but you can\'t easily transfer between branches (cross-shard).',
  },

    {
    id: 'indexing_vs_partitioning_vs_sharding',
    title: 'Indexing vs Partitioning vs Sharding',
    subtitle: 'Three tools for three different scaling problems',
    emoji: '📊',
    tagColor: tagColors[8],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'dataStorage',
    orderIndex: 9,

    definition:
      'Three DB scaling tools: indexing speeds reads within a table, partitioning splits one ' +
      'table on one server, sharding splits data across multiple servers.',

    description:
      'These three are often confused. They solve different problems:\n\n' +
      '• Indexing: "This one query is slow." → Add an index. Same table, same server.\n' +
      '• Partitioning: "This table is too big to manage." → Split within one server.\n' +
      '• Sharding: "One server can\'t handle the writes." → Split across servers.\n\n' +
      'They complement each other. A mature system: shard → partition each shard → index each partition.\n\n' +
      'Order matters. Try indexing first (cheapest). Partition next. Shard only when forced ' +
      '(sharding is a one-way door).',

    keyPoints: [
      'Indexing: read speed, single table, cheap, always available',
      'Partitioning: table size, same server, medium complexity',
      'Sharding: write scale, multiple servers, high complexity',
      'Decision flow: slow query → index. Huge table → partition. Write bottleneck → shard',
      'Combine all three in production: shard → partition → index',
      'Reversibility: index (easy to drop), partition (medium), shard (very hard)',
      'Cost: index (cheap), partition (medium), shard (expensive + operational)',
      'Rule: index first, partition when tables explode, shard only when writes don\'t fit',
    ],

    diagram:
      '                    DECISION FLOW\n' +
      '                          │\n' +
      '                          ▼\n' +
      '              ┌───────────────────────┐\n' +
      '              │ Queries slow?         │\n' +
      '              └───────────┬───────────┘\n' +
      '                    YES   │\n' +
      '                          ▼\n' +
      '                    Add INDEX\n' +
      '                          │\n' +
      '                          ▼\n' +
      '              ┌───────────────────────┐\n' +
      '              │ Table > 100M rows?    │\n' +
      '              └───────────┬───────────┘\n' +
      '                    YES   │\n' +
      '                          ▼\n' +
      '                    PARTITION\n' +
      '                          │\n' +
      '                          ▼\n' +
      '              ┌───────────────────────┐\n' +
      '              │ Write bottleneck?     │\n' +
      '              └───────────┬───────────┘\n' +
      '                    YES   │\n' +
      '                          ▼\n' +
      '                    SHARD',

    whenToUse: 'As a decision framework when a database is under pressure.',
    whatToUse: 'Index first, partition next, shard only when necessary.',

    useCase:
      '• Postgres single-node: index + partition\n' +
      '• MySQL at scale: Vitess shards + per-shard partitions + indexes\n' +
      '• Cassandra: hash sharding + per-shard SSTable indexes\n' +
      '• DynamoDB: partition key + GSI + LSI',

    scenario:
      'INTERVIEW: "Your DB is slow. How do you decide what to do?"\n' +
      '→ Discuss in order: (1) EXPLAIN ANALYZE — is it a slow query? → index. ' +
      '(2) Table size — is it 500M rows? → partition. (3) Write throughput — ' +
      'is primary saturated? → shard. Never shard first — it\'s the most complex.',

    memoryTrick:
      '"Read → Split → Shard". Index fixes reads. Partition handles size. ' +
      'Shard handles write scale. Escalate in that order.',
  },

  // ═══════════════════════════════════════════════════════════
  // PART 3: REPLICATION, CAP, CONSISTENCY
  // ═══════════════════════════════════════════════════════════

  {
    id: 'database_replication',
    title: 'Database Replication',
    subtitle: 'Same data on multiple servers for availability and read scale',
    emoji: '📋',
    tagColor: tagColors[9],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'distributedSystems',
    orderIndex: 10,

    definition:
      'Replication keeps identical copies of the same data on multiple servers to improve ' +
      'availability, read throughput, and disaster recovery.',

    description:
      'One database = single point of failure. If it dies, everything stops. If it\'s overloaded, ' +
      'reads slow down.\n\n' +
      'Replication solves both. Multiple copies exist. Writes go to the primary (leader). ' +
      'Reads can go to replicas (followers). If primary dies, promote a replica.\n\n' +
      'Topologies:\n' +
      '• Single-Leader: one writer, many readers (most common: Postgres, MySQL)\n' +
      '• Multi-Leader: multiple writers, conflict resolution (CouchDB, multi-region)\n' +
      '• Leaderless: any node accepts writes, quorum-based (Cassandra, DynamoDB)\n\n' +
      'Sync vs Async: sync = no data loss, higher latency. async = fast, possible loss.\n\n' +
      'Replication lag causes stale reads. Users may see old data. Route user\'s own ' +
      'reads to primary (read-your-own-writes).',

    keyPoints: [
      'Replication = same data, multiple copies (vs sharding = different data)',
      'Single-Leader: writes to primary, reads from replicas (simple, common)',
      'Multi-Leader: writes to any leader, conflicts resolved later',
      'Leaderless: any node, quorum-based (W+R>N guarantees strong consistency)',
      'Sync replication: no loss, higher latency, replica failure blocks primary',
      'Async replication: low latency, possible data loss on failover',
      'Semi-sync: wait for 1 replica (balance)',
      'Replication lag → stale reads → read-your-own-writes (route to primary)',
      'Failover: promote replica (Patroni, Orchestrator). Watch for split-brain',
      'Used by: Instagram (Postgres), Facebook (MySQL multi-leader), Netflix (Cassandra)',
    ],

    diagram:
      '                    ┌────────────────┐\n' +
      '                    │  Application   │\n' +
      '                    └───────┬────────┘\n' +
      '                            │\n' +
      '                     ┌──────▼──────┐\n' +
      '                     │   PRIMARY   │\n' +
      '                     │  (writes)   │\n' +
      '                     └──┬────┬────┬┘\n' +
      '                        │    │    │   (WAL stream)\n' +
      '                ┌───────┘    │    └───────┐\n' +
      '                ▼            ▼            ▼\n' +
      '          ┌──────────┐ ┌──────────┐ ┌──────────┐\n' +
      '          │Replica 1 │ │Replica 2 │ │Replica 3 │\n' +
      '          │ (reads)  │ │ (reads)  │ │ (reads)  │\n' +
      '          └──────────┘ └──────────┘ └──────────┘\n\n' +
      'Failover: Primary dies → Patroni promotes Replica 1 → others follow',

    whenToUse: 'Read-heavy workloads, HA requirements, disaster recovery, geo-distribution.',
    whatToUse: 'PostgreSQL streaming replication, MySQL binlog, AWS Aurora, Cassandra.',

    useCase:
      '• Instagram: Postgres primary + read replicas per region\n' +
      '• Facebook: multi-leader MySQL per region\n' +
      '• Netflix: Cassandra multi-region replication\n' +
      '• GitHub: MySQL primary + replicas + Orchestrator for failover\n' +
      '• Google Spanner: Paxos-based synchronous replication',

    scenario:
      'INTERVIEW: "Your read-heavy app is overloading the primary DB."\n' +
      '→ Discuss: add read replicas, route reads there. Handle replication lag: ' +
      'read-your-own-writes by routing to primary. Failover with Patroni. ' +
      'Semi-sync for durability vs async for latency. Watch for replica failure cascades.',

    memoryTrick:
      '"Book with backup copies". One master copy (primary) + many photocopies (replicas). ' +
      'Write on master, read from any copy. If master burns, one copy becomes the new master.',
  },

  {
    id: 'cap_theorem',
    title: 'CAP Theorem',
    subtitle: 'CP vs. AP during network partitions — the fundamental trade-off',
    emoji: '🔺',
    tagColor: tagColors[0],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'distributedSystems',
    orderIndex: 11,

    definition:
      'CAP Theorem states that a distributed system can only guarantee two of three: ' +
      'Consistency, Availability, and Partition tolerance. Since partitions are unavoidable, ' +
      'you choose between CP and AP.',

    description:
      'When two nodes can\'t talk (network partition), you have two choices:\n' +
      '• Reject requests until partition heals (CP = Consistency + Partition tolerance)\n' +
      '• Serve stale data on both sides and reconcile later (AP = Availability + Partition tolerance)\n\n' +
      'P is not optional. Networks fail. So the real decision is: C or A when P happens?\n\n' +
      'Important: CAP applies ONLY during a partition. During normal operation you can have C+A.\n\n' +
      'CP systems: banking, inventory (can\'t oversell). Reject writes on minority side.\n' +
      'AP systems: social feeds, shopping carts (stale is fine). Accept writes on both sides.',

    keyPoints: [
      'P is mandatory — partitions happen in any distributed system',
      'CP: reject requests during partition (HBase, MongoDB, Spanner, etcd)',
      'AP: accept requests, reconcile later (Cassandra, DynamoDB, Riak)',
      'CAP only matters DURING a partition — normal ops can have C and A',
      'PACELC extends CAP: even without partition, trade Latency vs Consistency',
      'Real systems often tunable: Cassandra per-query consistency, DynamoDB strongly-consistent reads',
      'Choose based on business: banking = CP, social = AP',
    ],

    diagram:
      '                    C (Consistency)\n' +
      '                   /              \\\n' +
      '                  /                \\\n' +
      '                 /                  \\\n' +
      '                A ─────────────────── P\n' +
      '           (Availability)      (Partition tolerance)\n\n' +
      '  CP: MongoDB, HBase, Spanner, etcd, ZooKeeper\n' +
      '  AP: Cassandra, DynamoDB, Riak, CouchDB\n\n' +
      '  During partition:\n' +
      '    CP → Node A: "Sorry, can\'t write now"\n' +
      '    AP → Node A: "OK, wrote locally"\n' +
      '        Node B: "OK, wrote locally"\n' +
      '        → Reconcile when network heals',

    whenToUse: 'Choosing a database — pick based on whether stale data is tolerable.',
    whatToUse: 'CP: Postgres+sync, MongoDB, Spanner, etcd. AP: Cassandra, DynamoDB, CouchDB.',

    useCase:
      '• Bank ATM: CP — can\'t show wrong balance\n' +
      '• Amazon cart: AP — better to accept item than reject\n' +
      '• Twitter feed: AP — stale tweet > no tweet\n' +
      '• Google Spanner (Ads billing): CP — global consistency required\n' +
      '• Cassandra at Netflix: AP — always available',

    scenario:
      'INTERVIEW: "You\'re building a global payment system. Which DB?"\n' +
      '→ Discuss: payments need consistency (CP). Spanner or CockroachDB. ' +
      'During partition, reject writes rather than double-charge. ' +
      'Contrast with cart system (AP) — accept and reconcile. ' +
      'Mention PACELC: even healthy, latency cost for consistency.',

    memoryTrick:
      '"Pick 2 of 3". P is always picked. So really "C or A". ' +
      'Money → C. Social → A. During network split, do you lock or lie?',
  },

  {
    id: 'pacelc_theorem',
    title: 'PACELC Theorem',
    subtitle: 'Extending CAP — latency matters even without partitions',
    emoji: '📐',
    tagColor: tagColors[1],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'distributedSystems',
    orderIndex: 12,

    definition:
      'PACELC extends CAP: during a Partition, choose Availability or Consistency; Else ' +
      '(normal operation), choose Latency or Consistency.',

    description:
      'CAP only describes behavior during a partition. But partitions are rare — most of the time ' +
      'your network is healthy. PACELC captures this:\n\n' +
      '  If Partition → A or C\n' +
      '  Else → L or C\n\n' +
      'Even with a healthy network, strong consistency costs latency. Because to guarantee ' +
      'consistent reads, you must wait for quorum acknowledgment (multiple round-trips).\n\n' +
      'Real systems classify as:\n' +
      '• PA/EL: Available during partition, low latency otherwise → DynamoDB, Cassandra\n' +
      '• PC/EC: Consistent during partition and always → Spanner, VoltDB\n' +
      '• PA/EC: Rare (MongoDB with tuning)\n' +
      '• PC/EL: Rare',

    keyPoints: [
      'PACELC = CAP + Latency vs Consistency trade-off',
      'PA/EL: DynamoDB, Cassandra, Riak (default)',
      'PC/EC: Spanner, VoltDB, CockroachDB',
      'Latency always matters — even without partition',
      'Strong consistency requires quorum → more round-trips → higher latency',
      'Real production: match PACELC class to SLA',
      'More useful than CAP in practice — CAP only talks about rare event (partition)',
    ],

    diagram:
      '          Partition?           Else?\n' +
      '        ┌──────────┐        ┌──────────┐\n' +
      '        │ A or C   │        │ L or C   │\n' +
      '        └──────────┘        └──────────┘\n' +
      '             │                  │\n' +
      '             └────────┬─────────┘\n' +
      '                      ▼\n' +
      '              ┌─────────────────────┐\n' +
      '              │  PACELC Classification │\n' +
      '              ├─────────────────────┤\n' +
      '              │ DynamoDB: PA / EL   │\n' +
      '              │ Cassandra: PA / EL  │\n' +
      '              │ MongoDB: PC / EC    │\n' +
      '              │ Spanner: PC / EC    │\n' +
      '              │ CosmosDB: PA / EL   │\n' +
      '              └─────────────────────┘',

    whenToUse: 'DB selection when latency SLAs matter (nearly every modern app).',
    whatToUse: 'Match PACELC class to SLA: payments → PC/EC, feeds → PA/EL.',

    useCase:
      '• DynamoDB: PA/EL for shopping cart (fast, available, eventual)\n' +
      '• Spanner: PC/EC for Google Ads billing (globally consistent)\n' +
      '• Cassandra: PA/EL for messaging, time-series, IoT\n' +
      '• Cosmos DB: tunable across all 5 levels',

    scenario:
      'INTERVIEW: "Why choose Cassandra over Postgres?"\n' +
      '→ Discuss: PACELC. Cassandra = PA/EL: available during partition, low latency in ' +
      'normal ops. Postgres (single-leader) = PC/EC: consistent, but higher write latency ' +
      'due to sync replication. Match to workload: social feeds → PA/EL. ' +
      'Banking → PC/EC.',

    memoryTrick:
      '"CAP + Else". Even when everything is fine (Else), you trade latency for consistency. ' +
      'Strong consistency is never free — you pay with latency.',
  },

  {
    id: 'consistency_models',
    title: 'Consistency Models',
    subtitle: 'Strong → Eventual: the spectrum of read freshness guarantees',
    emoji: '🎯',
    tagColor: tagColors[2],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'distributedSystems',
    orderIndex: 13,

    definition:
      'Consistency models define how fresh your reads are when data is replicated: from ' +
      'linearizable (always latest) to eventual (converges over time).',

    description:
      'When data lives on multiple replicas, a read may hit a stale copy. Consistency models ' +
      'describe the guarantees you get:\n\n' +
      '• Linearizable: every read sees the most recent write. As if single machine. ' +
      'Slowest, strongest. (Spanner, etcd)\n' +
      '• Sequential: all ops appear in some total order, each client\'s order preserved.\n' +
      '• Causal: causally related ops seen in order by all. Concurrent ops may differ.\n' +
      '• Read-Your-Writes: a client sees its own writes.\n' +
      '• Monotonic Reads: a client never sees older data after seeing newer.\n' +
      '• Eventual: replicas converge eventually. Fastest, weakest. (Cassandra, DNS)\n\n' +
      'Practical rule: pick the weakest model your product can tolerate. Stronger = slower.',

    keyPoints: [
      'Linearizable: strongest, slowest (Spanner, etcd)',
      'Sequential: total order, each client\'s order preserved',
      'Causal: cause before effect, concurrent ops may differ',
      'Read-Your-Writes: see your own writes (route user\'s reads to primary)',
      'Monotonic Reads: never go backwards in time (sticky session)',
      'Eventual: replicas converge, no ordering guarantees',
      'Cassandra per-query: ONE, QUORUM, ALL, LOCAL_QUORUM, EACH_QUORUM',
      'DynamoDB: eventual (default) or strongly consistent (opt-in)',
      'Cosmos DB: 5 levels — strong, bounded staleness, session, consistent prefix, eventual',
    ],

    diagram:
      'STRONGEST ◄──────────────────────────────────────► WEAKEST\n\n' +
      '  Linearizable → Sequential → Causal → RYW → Eventual\n\n' +
      '  Speed:      slow                                  fast\n' +
      '  Availability: low                                  high\n\n' +
      'Timeline example (Replica lag):\n' +
      '  Replica 1:  x=5 ──────────────────────────────\n' +
      '  Replica 2:  x=3 ......... x=5 ────────────────\n' +
      '  Replica 3:  x=1 ............... x=5 ──────────\n' +
      '                                  ▲\n' +
      '                                  └── All converge (eventual)',

    whenToUse: 'Design decision: how fresh must reads be? Trade freshness for speed.',
    whatToUse: 'Strong: Spanner, etcd. Eventual: Cassandra, DynamoDB. Tunable: Cosmos DB.',

    useCase:
      '• Bank balance: strong (linearizable)\n' +
      '• Your own profile update: read-your-writes\n' +
      '• Twitter feed: eventual (5s delay OK)\n' +
      '• Chat messages: causal (reply after original)\n' +
      '• DNS: eventual (TTL-based)',

    scenario:
      'INTERVIEW: "User updates profile, refreshes, sees old data. How do you fix?"\n' +
      '→ Discuss: replication lag. Fix with read-your-own-writes consistency: ' +
      'route the user\'s reads to primary for N seconds after their write. ' +
      'Or use session tokens that track last write timestamp and only read from ' +
      'replicas that have caught up. Mention trade-off: primary reads = more load.',

    memoryTrick:
      '"Stale bread". Fresh bread = linearizable (just baked). Stale bread = eventual ' +
      '(edible but old). Read-your-writes = "you baked it, you deserve the fresh one".',
  },

  // ═══════════════════════════════════════════════════════════
  // PART 4: SCHEMA DESIGN & DATA MODELING
  // ═══════════════════════════════════════════════════════════

  {
    id: 'schema_design_relationships',
    title: 'Schema Design & Relationships',
    subtitle: 'Entities, attributes, and how they relate',
    emoji: '🧱',
    tagColor: tagColors[3],
    category: 'systemDesign',
    tier: 'beginner',
    group: 'dataStorage',
    orderIndex: 14,

    definition:
      'Schema design models real-world entities (User, Order) and their relationships ' +
      '(1:1, 1:N, M:N) into database tables or documents.',

    description:
      'A schema is the blueprint of your data. Get it wrong and every query becomes slow, ' +
      'every migration becomes painful, every feature becomes hard.\n\n' +
      'Core concepts:\n' +
      '• Entity: a thing (User, Product, Order)\n' +
      '• Attribute: property of an entity (name, price)\n' +
      '• Primary key: unique identifier (id)\n' +
      '• Foreign key: reference to another table\'s PK\n' +
      '• Relationship: how entities connect\n\n' +
      'Relationship types:\n' +
      '• 1:1 — user ↔ profile (rare, often merge)\n' +
      '• 1:N — user → orders (FK on "many" side)\n' +
      '• M:N — students ↔ courses (join table)\n\n' +
      'Golden rule: model for ACCESS PATTERNS, not for theoretical purity.',

    keyPoints: [
      '1:1: one row ↔ one row (user_id in profile table, or same table)',
      '1:N: FK on "many" side (order.user_id → user.id)',
      'M:N: join table (enrollments: student_id + course_id)',
      'Self-referential: employees.manager_id → employees.id (hierarchy)',
      'Polymorphic: comments on posts/videos → polymorphic association (hard in SQL)',
      'Cascade rules: ON DELETE CASCADE / RESTRICT / SET NULL',
      'Soft delete: deleted_at timestamp instead of DELETE',
      'Timestamps: created_at, updated_at everywhere',
      'Version column: for optimistic locking (prevents lost updates)',
    ],

    diagram:
      '1:N — Users and Orders:\n' +
      '  ┌─────────────┐         ┌──────────────────┐\n' +
      '  │ users       │         │ orders           │\n' +
      '  ├─────────────┤         ├──────────────────┤\n' +
      '  │ id (PK)     │◄────────│ user_id (FK)     │\n' +
      '  │ name        │         │ id (PK)          │\n' +
      '  │ email       │         │ total            │\n' +
      '  └─────────────┘         └──────────────────┘\n\n' +
      'M:N — Students ↔ Courses:\n' +
      '  students ───< enrollments >─── courses\n' +
      '  (each side many, join table in middle)',

    whenToUse: 'Every time you design a new feature that stores data.',
    whatToUse: 'SQL: normalized tables + FKs. NoSQL: embed for 1:N small, reference for M:N.',

    useCase:
      '• E-commerce: users, products, orders, order_items (M:N), payments\n' +
      '• Social: users, follows (self M:N), posts, likes (M:N)\n' +
      '• Chat: users, conversations (M:N via participants), messages\n' +
      '• SaaS: tenants, users, tenant_id on every table',

    scenario:
      'INTERVIEW: "Design the schema for a food delivery app."\n' +
      '→ Discuss: users, restaurants, menus (1:N restaurant → menu items), ' +
      'orders (user → orders 1:N), order_items (orders ↔ items M:N), ' +
      'drivers (users), delivery_assignments (order ↔ driver 1:1). ' +
      'Consider: indexes on (user_id, created_at) for order history. ' +
      'Soft delete orders instead of hard delete for audit.',

    memoryTrick:
      '"Family tree". 1:N = parent has many kids. M:N = cousins in two families. ' +
      'The join table is "the marriage" that connects two families.',
  },

  {
    id: 'normalization_vs_denormalization',
    title: 'Normalization vs Denormalization',
    subtitle: 'Remove redundancy for writes, add it for reads',
    emoji: '⚖️',
    tagColor: tagColors[4],
    category: 'systemDesign',
    tier: 'beginner',
    group: 'dataStorage',
    orderIndex: 15,

    definition:
      'Normalization eliminates data redundancy by splitting into related tables (writes safe). ' +
      'Denormalization duplicates data intentionally for faster reads.',

    description:
      'Normalization: store each fact exactly once. If a user changes their name, update one row. ' +
      'But reconstructing a composite view requires JOINs, which get slow at scale.\n\n' +
      'Denormalization: duplicate data (e.g., store user_name in orders table) to avoid JOINs. ' +
      'Reads become single-table. But updates must touch many rows.\n\n' +
      'Normal forms:\n' +
      '• 1NF: atomic values, no repeating groups\n' +
      '• 2NF: 1NF + no partial dependencies on composite keys\n' +
      '• 3NF: 2NF + no transitive dependencies (non-key → non-key)\n' +
      '• BCNF: every determinant is a candidate key\n\n' +
      'Production rule: normalize the CORE (users, orders), denormalize HOT paths ' +
      '(feeds, search, analytics).',

    keyPoints: [
      '1NF: no repeating columns (phone1, phone2 → separate table)',
      '2NF: no partial key dependency (composite keys)',
      '3NF: no transitive dependency (zip → city, don\'t store both)',
      'BCNF: stricter 3NF',
      'Denormalization patterns: duplicated columns, precomputed aggregates, MVs',
      'Trade-off: read speed vs write complexity vs consistency risk',
      'NoSQL is denormalized by default (embed instead of join)',
      'Production: normalize core, denormalize hot paths',
    ],

    diagram:
      'NORMALIZED:\n' +
      '  users(id, name)       orders(id, user_id, total)\n' +
      '  To get "user name + order total":\n' +
      '    SELECT u.name, o.total FROM orders o\n' +
      '    JOIN users u ON u.id = o.user_id\n' +
      '  ✓ Write-safe (name updated once)\n' +
      '  ✗ Read-slow (JOIN at scale)\n\n' +
      'DENORMALIZED:\n' +
      '  orders(id, user_id, user_name, total)\n' +
      '  To get "user name + order total":\n' +
      '    SELECT user_name, total FROM orders\n' +
      '  ✓ Read-fast (no JOIN)\n' +
      '  ✗ Write-risk (name changed → update all orders)',

    whenToUse: 'Normalize for correctness. Denormalize for read SLA.',
    whatToUse: 'SQL: views, materialized views. NoSQL: embed. Cache: precomputed.',

    useCase:
      '• Banking (normalized): balances must be correct, writes matter\n' +
      '• Twitter feed (denormalized): precompute feed with user names embedded\n' +
      '• Amazon product page (denormalized): cache product + reviews\n' +
      '• Analytics (denormalized): star schema for fast queries',

    scenario:
      'INTERVIEW: "Your e-commerce product page needs 8 JOINs. It\'s slow."\n' +
      '→ Discuss: identify hot read pattern. Options: (1) Denormalize — add product_summary ' +
      'table with precomputed fields. (2) Materialized view — refresh on write. ' +
      '(3) CQRS — separate read model. Trade-off: eventual consistency. ' +
      'Choose based on how stale a product page can be (usually: very OK).',

    memoryTrick:
      '"Write once, read many → denormalize". If a fact changes rarely but is read constantly, ' +
      'duplicate it. If it changes often, keep it normalized.',
  },

  {
    id: 'sql_vs_nosql_schema_patterns',
    title: 'SQL vs NoSQL Schema Patterns',
    subtitle: 'Tables + JOINs vs. Documents + Embedding',
    emoji: '🗂️',
    tagColor: tagColors[5],
    category: 'systemDesign',
    tier: 'beginner',
    group: 'dataStorage',
    orderIndex: 16,

    definition:
      'SQL schemas use normalized tables joined at query time. NoSQL schemas embed related ' +
      'data or reference it, optimized for specific access patterns.',

    description:
      'SQL = schema-on-write. You define tables, columns, types upfront. DB validates every write.\n\n' +
      'NoSQL = schema-on-read. Data is flexible. App validates. Different families use different ' +
      'patterns:\n\n' +
      '• Document (MongoDB): embed small 1:N, reference large/shared. Denormalize aggressively.\n' +
      '• Key-Value (Redis): pure hash map. Model for exact lookups.\n' +
      '• Wide-column (Cassandra): partition key + clustering key = your query.\n' +
      '• Graph (Neo4j): nodes + edges. Best for social/fraud.\n\n' +
      'Key insight: NoSQL schemas are driven by QUERIES, not entities. Design for how you read.',

    keyPoints: [
      'SQL: normalize + JOIN for relations',
      'Document: embed 1:N small (order + items), reference large/shared',
      'Key-Value: everything is a lookup. Model for exact access patterns',
      'Wide-column: partition + clustering key = query pattern',
      'Graph: nodes + edges, best for social, recommendations, fraud',
      'NoSQL schema driven by queries, not entities',
      'Cassandra: you must know ALL queries upfront to design the schema',
      'MongoDB: $lookup exists but is slow — prefer embedding',
    ],

    diagram:
      'SQL (normalized):\n' +
      '  users ──< orders ──< order_items >── products\n' +
      '  Any combined view requires JOINs\n\n' +
      'Document (embedded):\n' +
      '  {\n' +
      '    "user_id": 1,\n' +
      '    "orders": [\n' +
      '      { "id": 100, "items": [{...}], "total": 50 },\n' +
      '      { "id": 101, "items": [{...}], "total": 75 }\n' +
      '    ]\n' +
      '  }\n' +
      '  Single read returns everything user needs\n\n' +
      'Cassandra (wide-column):\n' +
      '  PRIMARY KEY ((conversation_id), created_at DESC)\n' +
      '  → partition by conversation, sorted by time',

    whenToUse: 'SQL for flexible queries + integrity. NoSQL for known patterns + scale.',
    whatToUse: 'Postgres/MySQL (SQL). MongoDB (doc). Redis (KV). Cassandra (wide). Neo4j (graph).',

    useCase:
      '• Postgres: user profiles, orders, financial\n' +
      '• MongoDB: product catalogs, CMS content, user preferences\n' +
      '• Redis: sessions, leaderboards, rate limits\n' +
      '• Cassandra: messages, events, time-series\n' +
      '• Neo4j: fraud detection, recommendations',

    scenario:
      'INTERVIEW: "Design chat message storage for WhatsApp-scale."\n' +
      '→ Discuss: Cassandra. Partition key = conversation_id (all messages of a chat together). ' +
      'Clustering key = created_at DESC (latest first). Query: "last 50 messages in chat X" ' +
      '→ single partition read. Denormalize: sender_name in message (avoid join). ' +
      'Trade-off: name change doesn\'t update old messages (acceptable).',

    memoryTrick:
      '"SQL = ask anything" (JOIN on demand). "NoSQL = ask what I stored" ' +
      '(queries designed upfront). Cassandra: "You MUST know your queries before schema."',
  },
    {
    id: 'real_world_schema_examples',
    title: 'Real-World Schema Examples',
    subtitle: 'E-commerce, Social, Chat — how they actually model data',
    emoji: '🏗️',
    tagColor: tagColors[6],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'dataStorage',
    orderIndex: 17,

    definition:
      'Battle-tested schema patterns for common domains: e-commerce, social networks, chat, ' +
      'multi-tenant SaaS.',

    description:
      'Every domain has a proven schema shape. Learn it, adapt it — don\'t invent from scratch.\n\n' +
      'E-commerce: users, products, carts, orders, order_items (M:N), payments, addresses.\n\n' +
      'Social: users, follows (self M:N), posts, likes (M:N), comments (1:N), feeds (precomputed).\n\n' +
      'Chat: users, conversations, participants (M:N), messages (partitioned by conversation).\n\n' +
      'Multi-tenant SaaS: tenants, users, every table has tenant_id, every query filters by it.\n\n' +
      'Common patterns: timestamps everywhere, soft delete, version column for optimistic locking.',

    keyPoints: [
      'E-commerce: order_items = M:N join with quantity + price (snapshot)',
      'Social follow: follows(follower_id, followee_id) — self-referential M:N',
      'Chat: partition by conversation_id, cluster by created_at DESC',
      'Multi-tenant: every query filters by tenant_id — index it on every table',
      'Soft delete: deleted_at column instead of DELETE (audit + undo)',
      'Timestamps: created_at, updated_at everywhere',
      'Version column: for optimistic locking (prevents lost updates)',
      'Snapshot pricing: order_items stores price at time of order, not reference',
    ],

    diagram:
      'E-COMMERCE:\n' +
      '  users ──< orders ──< order_items >── products\n' +
      '                  └─< payments\n' +
      '                  └─< addresses\n\n' +
      'SOCIAL:\n' +
      '  users ──< follows >── users    (self M:N)\n' +
      '  users ──< posts ──< likes\n' +
      '                 └─< comments\n\n' +
      'CHAT:\n' +
      '  users ──< participants >── conversations ──< messages\n' +
      '  messages: PRIMARY KEY ((conversation_id), created_at DESC)\n\n' +
      'MULTI-TENANT SaaS:\n' +
      '  Every table has tenant_id\n' +
      '  Every query: WHERE tenant_id = ?',

    whenToUse: 'Whenever starting a new domain — copy proven pattern, don\'t invent.',
    whatToUse: 'SQL for transactional core, NoSQL for feeds/messages at scale, cache for hot reads.',

    useCase:
      '• Amazon: e-commerce pattern (orders, order_items, payments)\n' +
      '• Twitter: social pattern (posts, follows, feed)\n' +
      '• WhatsApp: chat pattern (conversations, messages)\n' +
      '• Slack: multi-tenant (workspace_id on every table)\n' +
      '• Shopify: multi-tenant + e-commerce combined',

    scenario:
      'INTERVIEW: "Design the database for a marketplace (like eBay)."\n' +
      '→ Discuss: users, sellers, products (1:N seller), orders (user → orders 1:N), ' +
      'order_items (M:N to products, snapshot price), payments, reviews (M:N user × product), ' +
      'categories (tree, self-referential M:N). ' +
      'Indexes: (seller_id, created_at) for seller dashboard, (user_id, created_at) for buyer history. ' +
      'Consider sharding by user_id later.',

    memoryTrick:
      '"Copy the blueprint". E-commerce = orders + items. Social = follows. ' +
      'Chat = conversations + messages. SaaS = tenant_id everywhere.',
  },

  // ═══════════════════════════════════════════════════════════
  // PART 5: HIGH THROUGHPUT DESIGN
  // ═══════════════════════════════════════════════════════════

  {
    id: 'read_optimized_design',
    title: 'Read-Optimized Design (CQRS, Materialized Views)',
    subtitle: 'Separate the read path from the write path',
    emoji: '📖',
    tagColor: tagColors[7],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'dataStorage',
    orderIndex: 18,

    definition:
      'CQRS separates the write model (normalized, correct) from the read model (denormalized, ' +
      'fast). Materialized views precompute query results.',

    description:
      'Writes want correctness + normalization. Reads want speed + denormalization. ' +
      'Trying to do both in one schema is a compromise.\n\n' +
      'CQRS: split them. Writes go to write DB (Postgres, normalized). Reads come from read DB ' +
      '(Redis, Elasticsearch, denormalized projections). Sync via events (Kafka) or CDC (Debezium).\n\n' +
      'Materialized View: precomputed query result stored as a table. Refreshed on write or schedule. ' +
      'Postgres has native MVs; app-level MVs are common in Redis/Elasticsearch.\n\n' +
      'Trade-off: eventual consistency between write and read models. You sacrifice immediate ' +
      'consistency for enormous read speed.',

    keyPoints: [
      'CQRS: separate write (normalized) + read (denormalized) models',
      'Projections built via events (Kafka) or CDC (Debezium)',
      'Materialized views: SQL-native or app-level',
      'Read replicas scale reads but share schema — CQRS changes schema',
      'Trade-off: eventual consistency between write/read models',
      'Used by: Twitter (write → fanout to feed), Amazon (order → search index)',
      'Event sourcing pairs well: events as source of truth, projections as read models',
      'Consistency lag: handle with read-your-writes for critical ops',
    ],

    diagram:
      '                     WRITES                READS\n' +
      '                       │                     ▲\n' +
      '                       ▼                     │\n' +
      '              ┌─────────────────┐    ┌──────────────────┐\n' +
      '              │  Write DB       │    │  Read DB         │\n' +
      '              │  (Postgres)     │    │  (Redis / ES)    │\n' +
      '              │  normalized     │    │  denormalized    │\n' +
      '              └────────┬────────┘    └────────▲─────────┘\n' +
      '                       │                      │\n' +
      '                       └──CDC/Events──────────┘\n' +
      '                          (Debezium / Kafka)',

    whenToUse: 'Read-heavy workloads where query patterns differ sharply from write shape.',
    whatToUse: 'Postgres + Debezium + Elasticsearch. Kafka Streams for projections.',

    useCase:
      '• Twitter: write tweet → fanout to follower feed caches (CQRS)\n' +
      '• Amazon: order write → update search index (CQRS)\n' +
      '• Instagram: photo upload → update feed + search + analytics\n' +
      '• Banking: transactions → materialized view for statements',

    scenario:
      'INTERVIEW: "Your search page is slow because it queries the primary DB."\n' +
      '→ Discuss: CQRS. Write to Postgres, sync via Debezium to Kafka, project to Elasticsearch. ' +
      'Reads hit ES (fast, denormalized). Handle eventual consistency: "your update may take ' +
      'a few seconds to appear" or route user\'s own updates to a fast path. ' +
      'Monitor projection lag.',

    memoryTrick:
      '"Two houses". Write house = organized, correct. Read house = fast, pre-computed. ' +
      'Sync them with a courier (CDC/Kafka). Pay the cost: eventual consistency.',
  },

  {
    id: 'write_optimized_design',
    title: 'Write-Optimized Design (Batching, LSM, WAL)',
    subtitle: 'Get more writes per second without losing data',
    emoji: '✍️',
    tagColor: tagColors[8],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'dataStorage',
    orderIndex: 19,

    definition:
      'Write-optimized design maximizes write throughput using batching, append-only storage ' +
      '(LSM trees), write-ahead logs, and async replication.',

    description:
      'Write bottlenecks come from: random disk I/O, per-row transactions, sync replication ' +
      'waits, and connection overhead.\n\n' +
      'Solutions:\n' +
      '• Batching: group N writes into one round-trip (1000x reduction)\n' +
      '• LSM Trees: append-only writes → sequential I/O (much faster than random)\n' +
      '• WAL: durable append log, flush later (crash-safe)\n' +
      '• Async replication: don\'t wait for replicas\n' +
      '• Connection pooling: reuse connections (PgBouncer)\n' +
      '• Sharding: split write load by key\n\n' +
      'LSM trees power RocksDB, Cassandra, ScyllaDB, LevelDB — all write-optimized. ' +
      'B-Trees (Postgres, MySQL) are read-optimized; you need batching + WAL to write fast.',

    keyPoints: [
      'Batching: 1000 rows in one INSERT = 100x fewer round-trips',
      'LSM: writes to memtable + WAL → flushed sequentially (RocksDB, Cassandra)',
      'WAL: durability before apply — crash-safe',
      'Async replication: primary returns fast, replicas catch up',
      'Sharding: split write load by hash of the key',
      'Connection pooling: PgBouncer, HikariCP — reuse connections',
      'Write-behind cache: fast but risky (data loss on crash)',
      'LSM trade-off: fast writes, slower reads (multiple SSTables)',
    ],

    diagram:
      'NAIVE WRITE (slow):\n' +
      '  INSERT 1 ──► fsync ──► INSERT 1 ──► fsync   (per row)\n\n' +
      'BATCHED WRITE (fast):\n' +
      '  Batch 1000 rows ──► one commit ──► WAL append\n\n' +
      'LSM TREE INTERNALS:\n' +
      '  Write → WAL (disk, sequential) → Memtable (RAM)\n' +
      '                                       │ flush @ threshold\n' +
      '                                       ▼\n' +
      '                                  SSTable (disk, sorted)\n' +
      '                                       │ compaction\n' +
      '                                       ▼\n' +
      '                                  Merged SSTable L1, L2...\n\n' +
      '  Sequential I/O = 100x faster than random I/O',

    whenToUse: 'Write-heavy systems: logs, metrics, IoT, chat, clickstream.',
    whatToUse: 'RocksDB, Cassandra, ScyllaDB (LSM). Postgres with batching + async_commit.',

    useCase:
      '• Kafka: writes messages sequentially to disk (millions/sec)\n' +
      '• Cassandra: write-heavy IoT, chat, time-series\n' +
      '• ScyllaDB: Discord messages (billions/day)\n' +
      '• InfluxDB: metrics with LSM storage\n' +
      '• Postgres with batch inserts: 100K rows/sec',

    scenario:
      'INTERVIEW: "Your logging service writes 100K events/sec. Postgres is choking."\n' +
      '→ Discuss: (1) Batch inserts (1000 rows per INSERT). (2) Switch to LSM-based DB ' +
      '(Cassandra, ClickHouse). (3) Async replication. (4) Shard by log_source. ' +
      '(5) Buffer via Kafka first. Consider eventual consistency (logs don\'t need ACID).',

    memoryTrick:
      '"Append, don\'t update". Random writes are slow (find block, modify, write). ' +
      'Sequential appends are fast (just write at end). LSM = append-only + compact later.',
  },

  {
    id: 'connection_pooling_pipelining',
    title: 'Connection Pooling & Pipelining',
    subtitle: 'Reuse connections, batch round-trips',
    emoji: '🔌',
    tagColor: tagColors[9],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'dataStorage',
    orderIndex: 20,

    definition:
      'Connection pooling reuses a fixed set of DB/TCP connections across requests. ' +
      'Pipelining batches multiple requests without waiting for individual responses.',

    description:
      'Opening a DB connection is expensive: TCP handshake + TLS + auth + session setup = ' +
      '10-50ms and memory. Doing this per request kills throughput.\n\n' +
      'Connection pooling: keep N connections open. Requests borrow, use, return. No handshake per query.\n\n' +
      'Pipelining: send multiple requests without waiting. One round-trip delivers many responses. ' +
      'Huge win over high-latency links (cross-region, mobile).\n\n' +
      'Examples:\n' +
      '• PgBouncer: transaction pooling — share connection across queries in one transaction\n' +
      '• HTTP/2: multiplexed streams over one TCP connection\n' +
      '• Redis pipeline: 100 commands, 1 round-trip\n' +
      '• Kafka producer: batches messages before sending',

    keyPoints: [
      'Pool size must match DB capacity — too many → DB dies, too few → app queues',
      'PgBouncer modes: session (1:1), transaction (share within txn), statement (max sharing)',
      'HTTP/2 multiplexing = app-level pipelining over one TCP connection',
      'Redis pipeline: send N commands, get N replies, one RTT',
      'Kafka producer batching: linger.ms (wait time) + batch.size (bytes)',
      'Trade-off: batching adds latency (wait for batch to fill)',
      'Monitor pool saturation: queue depth, wait time',
      'Connection leak = pool exhaustion = app hangs. Always release in finally/context manager.',
    ],

    diagram:
      'WITHOUT POOL (slow):\n' +
      '  Req1 ─► open conn (10ms) ─► query (5ms) ─► close\n' +
      '  Req2 ─► open conn (10ms) ─► query (5ms) ─► close\n' +
      '  Req3 ─► open conn (10ms) ─► query (5ms) ─► close\n' +
      '  Total: 45ms for 3 requests\n\n' +
      'WITH POOL (fast):\n' +
      '  [Pool: 10 conns]\n' +
      '  Req1 ─► borrow ─► query ─► return\n' +
      '  Req2 ─► borrow ─► query ─► return\n' +
      '  Req3 ─► borrow ─► query ─► return\n' +
      '  Total: 15ms for 3 requests (no handshakes)\n\n' +
      'PIPELINING:\n' +
      '  Without: CMD1 → wait → CMD2 → wait → CMD3 → wait  (3 RTTs)\n' +
      '  With:    CMD1+CMD2+CMD3 → wait → RSP1+RSP2+RSP3  (1 RTT)',

    whenToUse: 'Any service talking to DB or remote API under load.',
    whatToUse: 'HikariCP (Java), PgBouncer (Postgres), SQLAlchemy pool (Python), Redis pipeline.',

    useCase:
      '• Every production web app: HikariCP or similar\n' +
      '• GitHub: PgBouncer in front of Postgres\n' +
      '• Redis at scale: pipeline for bulk reads/writes\n' +
      '• Kafka: producer batching for high throughput\n' +
      '• gRPC: HTTP/2 multiplexing for concurrent RPCs',

    scenario:
      'INTERVIEW: "Your microservice hangs under load. DB CPU is fine. What\'s wrong?"\n' +
      '→ Discuss: likely connection pool exhaustion. Diagnose: check pool wait times, ' +
      'active connection count. Fix: tune pool size (not too large), add timeouts, ' +
      'check for connection leaks. Consider PgBouncer to multiplex many app pools ' +
      'into fewer DB connections.',

    memoryTrick:
      '"Taxi stand". Instead of calling a new taxi (open connection) for every trip, ' +
      'reuse the ones waiting (pool). Pipelining = one taxi takes multiple passengers.',
  },

  {
    id: 'throughput_vs_latency',
    title: 'Throughput vs Latency Trade-offs',
    subtitle: 'Batch = high throughput, small batch = low latency',
    emoji: '⚡',
    tagColor: tagColors[0],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'dataStorage',
    orderIndex: 21,

    definition:
      'Throughput = requests/sec the system handles. Latency = time for one request. ' +
      'Optimizing one often hurts the other.',

    description:
      'They are opposing forces:\n' +
      '• Batching improves throughput (fewer round-trips) but hurts latency (wait for batch to fill)\n' +
      '• Small batches = low latency but low throughput\n\n' +
      'Key formulas:\n' +
      '• Little\'s Law: L = λ × W (concurrency = rate × latency)\n' +
      '• Amdahl\'s Law: serial parts limit parallel speedup\n\n' +
      'Tail latency (P99) matters more than average. A user hitting P99 sees slow behavior even ' +
      'if the average is fast. Chase long tails with hedged requests (send to 2 replicas, take first).\n\n' +
      'Choose based on SLA: real-time chat = prioritize latency. Analytics = prioritize throughput.',

    keyPoints: [
      'Batching: high throughput, higher latency (wait for batch)',
      'Streaming: low latency, lower throughput',
      'Little\'s Law: concurrency = rate × latency',
      'Amdahl\'s Law: serial parts limit parallel speedup',
      'Tail latency (P99, P99.9) matters more than average',
      'Hedged requests: send to 2 replicas, take first — trades bandwidth for latency',
      'Backpressure: slow consumer → producer slows down',
      'SLA-driven choice: chat = latency, analytics = throughput',
    ],

    diagram:
      'Throughput ▲\n' +
      '            │                       ┌── Batch 1000\n' +
      '            │                 ┌─────┘\n' +
      '            │           ┌─────┘  Batch 100\n' +
      '            │     ┌─────┘  Batch 10\n' +
      '            │  ┌──┘  Batch 1\n' +
      '            │  │\n' +
      '            └──┴──────────────────────────► Latency\n\n' +
      'Rule of thumb:\n' +
      '  Latency-sensitive:  small batches, async I/O\n' +
      '  Throughput-sensitive: large batches, pipelines\n\n' +
      'Little\'s Law:\n' +
      '  L (in-flight) = λ (arrival rate) × W (time in system)\n' +
      '  Example: 1000 RPS × 100ms = 100 concurrent requests',

    whenToUse: 'Every capacity planning exercise. Decide what SLA optimizes for.',
    whatToUse: 'Measure P50/P99, tune batch size, use async + backpressure.',

    useCase:
      '• WhatsApp: latency-critical (messages must feel instant)\n' +
      '• YouTube transcoding: throughput-critical (batch jobs)\n' +
      '• Stock trading: latency in microseconds\n' +
      '• Analytics: throughput in millions/sec\n' +
      '• Log ingestion: throughput over latency',

    scenario:
      'INTERVIEW: "Users complain the app feels slow. P50 = 50ms, P99 = 5s. How do you fix?"\n' +
      '→ Discuss: tail latency problem. Diagnose: (1) Is it a specific endpoint? ' +
      '(2) Is it a specific user/query? (3) GC pauses? (4) Noisy neighbor? ' +
      'Fix: hedge requests (send to 2 replicas), add timeouts + retries, ' +
      'reduce contention. Consider: shared resource causing outlier latency.',

    memoryTrick:
      '"Bus vs scooter". Bus = high throughput, slow per passenger (latency). ' +
      'Scooter = fast for one, low throughput. Pick based on what you need.',
  },

  // ═══════════════════════════════════════════════════════════
  // PART 6: MIGRATION & VERSIONING
  // ═══════════════════════════════════════════════════════════

  {
    id: 'zero_downtime_schema_migration',
    title: 'Zero-Downtime Schema Migration',
    subtitle: 'The Expand-Contract pattern — change schema without stopping',
    emoji: '🔧',
    tagColor: tagColors[1],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'dataStorage',
    orderIndex: 22,

    definition:
      'Zero-downtime schema migration changes a live database\'s schema in steps that never ' +
      'break running code, using the Expand-Contract pattern.',

    description:
      'You can\'t ALTER TABLE on a live DB with millions of rows — it locks, takes hours, and ' +
      'breaks running apps. You also can\'t rename/drop a column used by deployed code.\n\n' +
      'Solution: Expand-Contract (Parallel Change):\n' +
      '  1. EXPAND: add new column/table, keep old\n' +
      '  2. DUAL-WRITE: app writes to both old and new\n' +
      '  3. BACKFILL: copy old data into new (batched, throttled)\n' +
      '  4. SWITCH: reads now use new column\n' +
      '  5. CONTRACT: drop old column once nothing uses it\n\n' +
      'Each step is reversible. Each step is deployable independently. Old code and new code ' +
      'coexist safely.',

    keyPoints: [
      'Never rename/drop a column directly on a live system',
      'Add new column as NULL, backfill, then set NOT NULL',
      'Dual-write keeps old + new in sync during transition',
      'Backfill in batches (1000 rows) with sleeps to avoid load spikes',
      'Feature flags control reads/writes per column',
      'Rollback: keep old column until new one stable for weeks',
      'Postgres: adding NULL column is instant; NOT NULL + default rewrites table',
      'Tools: gh-ost (MySQL), pg-osc (Postgres) for online migrations',
    ],

    diagram:
      'Step 1: EXPAND\n' +
      '  ALTER TABLE users ADD COLUMN email_v2 TEXT NULL;\n\n' +
      'Step 2: DUAL-WRITE\n' +
      '  App writes email AND email_v2 (feature flag)\n\n' +
      'Step 3: BACKFILL\n' +
      '  UPDATE users SET email_v2 = normalize(email)\n' +
      '  WHERE email_v2 IS NULL LIMIT 1000;  -- repeat with sleep\n\n' +
      'Step 4: SWITCH\n' +
      '  Feature flag on → reads use email_v2\n\n' +
      'Step 5: CONTRACT\n' +
      '  ALTER TABLE users DROP COLUMN email;  -- weeks later',

    whenToUse: 'Any schema change on a production system with live traffic.',
    whatToUse: 'Flyway, Liquibase, Alembic, gh-ost (MySQL), pg-osc (Postgres).',

    useCase:
      '• Facebook: schema changes on MySQL at scale (billions of rows)\n' +
      '• Stripe: payment API schema migrations without downtime\n' +
      '• Airbnb: online schema migrations on MySQL shards\n' +
      '• GitHub: gh-ost for online schema changes',

    scenario:
      'INTERVIEW: "You need to rename a column in a 1B-row table with live traffic."\n' +
      '→ Discuss: Expand-Contract. Add new column, dual-write, backfill in batches, ' +
      'flip reads via feature flag, drop old column weeks later. ' +
      'Watch for: replication lag during backfill, lock contention, ' +
      'index rebuild time. Test rollback: flip flag off, reads go to old column.',

    memoryTrick:
      '"Ship of Theseus". Replace one plank at a time while the ship sails. ' +
      'Never stop, never break. Old and new coexist during transition.',
  },

  {
    id: 'api_versioning',
    title: 'API Versioning Strategies',
    subtitle: 'Evolve your API without breaking old clients',
    emoji: '🔢',
    tagColor: tagColors[2],
    category: 'systemDesign',
    tier: 'intermediate',
    group: 'fundamentals',
    orderIndex: 23,

    definition:
      'API versioning allows evolving an API\'s contract without breaking existing clients, ' +
      'via URI, header, or query-param versioning.',

    description:
      'Once a client depends on your API, you can\'t just change it. Renaming a field, ' +
      'changing a type, or removing an endpoint breaks them.\n\n' +
      'Versioning strategies:\n' +
      '• URI: /v1/users, /v2/users (most common, explicit)\n' +
      '• Header: Accept: application/vnd.api.v2+json\n' +
      '• Query: /users?version=2 (discouraged)\n' +
      '• No version: evolve via additive changes only\n\n' +
      'Additive changes (new field, new endpoint) are backward-compatible — no version bump. ' +
      'Removing fields, changing types, renaming → new version.\n\n' +
      'Deprecation: keep old version for N months, warn via Sunset header.',

    keyPoints: [
      'Additive changes: no version bump (backward-compatible)',
      'Removing/renaming/changing types: breaking → new version',
      'URI versioning: easiest to reason, cache, route',
      'Header versioning: clean URL, harder to debug',
      'Query param: discouraged (breaks REST purity)',
      'Deprecation: Sunset header + N-month window',
      'Stripe: date-based versions (2024-01-01)',
      'GitHub: URI-based (/v3, /v4 GraphQL)',
    ],

    diagram:
      'URI:      GET /v2/users/42\n' +
      'Header:   GET /users/42\n' +
      '          Accept: application/vnd.api.v2+json\n' +
      'Query:    GET /users/42?version=2\n\n' +
      'Deprecation flow:\n' +
      '  v1 shipped       ────► v2 shipped\n' +
      '                        (v1 still works)\n' +
      '                                │\n' +
      '                                ▼\n' +
      '                        Announce v1 deprecation\n' +
      '                                │\n' +
      '                                ▼\n' +
      '                        Sunset: 2025-06-01\n' +
      '                                │\n' +
      '                                ▼\n' +
      '                        v1 returns 410 Gone',

    whenToUse: 'Public APIs with external consumers. Internal APIs can be laxer.',
    whatToUse: 'URI versioning + OpenAPI spec + API gateway (Kong, AWS API Gateway).',

    useCase:
      '• Stripe: date-based versioning (2024-01-01)\n' +
      '• GitHub: URI (/v3 REST, /v4 GraphQL)\n' +
      '• Twilio: URI (/2010-04-01/Accounts/...)\n' +
      '• Twitter: URI (/1.1/, /2/)',

    scenario:
      'INTERVIEW: "You need to remove a field from your public API. How?"\n' +
      '→ Discuss: (1) Announce deprecation 6-12 months ahead. (2) Add Sunset header. ' +
      '(3) Monitor usage — see who calls the field. (4) Ship v2 with field removed. ' +
      '(5) Migrate big customers first. (6) After window, v1 returns 410 Gone. ' +
      'Never break silently.',

    memoryTrick:
      '"Renovating a highway". You can\'t close it suddenly. Build new lanes (v2), ' +
      'let traffic shift gradually, then close old lanes (deprecate v1).',
  },

  {
    id: 'event_schema_evolution',
    title: 'Event Schema Evolution',
    subtitle: 'Avro, Protobuf, Schema Registry — evolving event contracts',
    emoji: '📡',
    tagColor: tagColors[3],
    category: 'systemDesign',
    tier: 'advanced',
    group: 'asyncProcessing',
    orderIndex: 24,

    definition:
      'Event schema evolution manages changes to the structure of events over time, ensuring ' +
      'producers and consumers stay compatible via schema registries and compatibility rules.',

    description:
      'Events live in Kafka topics for days/months. Multiple consumers read them. ' +
      'When producers change event structure, old consumers must not break.\n\n' +
      'Compatibility modes:\n' +
      '• Backward: new schema reads old data (upgrade consumers first)\n' +
      '• Forward: old schema reads new data (upgrade producers first)\n' +
      '• Full: both — safest, most restrictive\n' +
      '• None: anything goes (risky)\n\n' +
      'Schema Registry: central store. Producers register new schema. Registry enforces ' +
      'compatibility rules at registration time — bad changes are rejected before deploy.\n\n' +
      'Avro: schema embedded with data, compact, evolution-friendly.\n' +
      'Protobuf: field numbers + optional = backward/forward compatible by design.',

    keyPoints: [
      'Backward compatible: upgrade consumers before producers',
      'Forward compatible: upgrade producers before consumers',
      'Full compatible: either order safe — most restrictive',
      'Avro: schema embedded, compact, evolution-friendly',
      'Protobuf: never reuse field numbers, never change types',
      'Tombstoning: deprecate fields, don\'t delete them',
      'Schema Registry: enforces rules at register time',
      'Tools: Confluent Schema Registry, Apicurio, AWS Glue Schema Registry',
    ],

    diagram:
      'Producer ─► Schema Registry ◄── Consumer\n' +
      '                │\n' +
      '                ▼\n' +
      '         [schemas: v1, v2, v3]\n' +
      '                │\n' +
      '         Compatibility check on register\n' +
      '                │\n' +
      '         ┌──────┴───────┐\n' +
      '         ▼              ▼\n' +
      '      ACCEPT          REJECT\n' +
      '      (store)         (bad change)\n\n' +
      'Kafka topic (messages carry schema ID):\n' +
      '  ┌──────┬────────────────────┐\n' +
      '  │ v2-id│ { event payload }  │\n' +
      '  └──────┴────────────────────┘',

    whenToUse: 'Kafka/event-driven systems with long-lived events and many consumers.',
    whatToUse: 'Confluent Schema Registry, Apicurio, Avro, Protobuf, JSON Schema.',

    useCase:
      '• LinkedIn: Kafka + Avro + Schema Registry (origin of these tools)\n' +
      '• Uber: Kafka events across hundreds of services\n' +
      '• Confluent Cloud: managed Schema Registry\n' +
      '• Netflix: event-driven microservices with schema evolution',

    scenario:
      'INTERVIEW: "You need to add a field to a Kafka event with 50 consumers. How?"\n' +
      '→ Discuss: add field as OPTIONAL with default. Avro schema evolves backward-compatible. ' +
      'Old consumers ignore new field. New consumers use it. ' +
      'Never: remove field, change type, reuse field number. ' +
      'Register with Schema Registry first — rejects bad changes.',

    memoryTrick:
      '"Add-only evolution". Like adding optional ingredients to a recipe — ' +
      'old cooks ignore them, new cooks use them. Never remove or rename ingredients.',
  },

  {
    id: 'rollback_safety',
    title: 'Rollback & Safety',
    subtitle: 'How to undo a bad migration without losing data',
    emoji: '↩️',
    tagColor: tagColors[4],
    category: 'systemDesign',
    tier: 'advanced',
    group: 'dataStorage',
    orderIndex: 25,

    definition:
      'Rollback & safety means designing every migration to be reversible, with backups, ' +
      'feature flags, canary rollouts, and monitoring so bad changes can be undone quickly.',

    description:
      'Every migration should be reversible. If you can\'t roll back, you\'re gambling with ' +
      'production data. Bad migrations are one of the top causes of production outages at ' +
      'FAANG companies.\n\n' +
      'Safety practices:\n' +
      '• Dry-run on staging copy first\n' +
      '• Backup before destructive ops (PITR ready)\n' +
      '• Feature flag the new code path\n' +
      '• Batch + throttle backfills\n' +
      '• Canary: apply to 1% first, verify, then scale\n' +
      '• Monitor error rates, latency, replication lag during migration\n' +
      '• Keep old column/table for weeks after switch\n\n' +
      'The pattern: everything deployable independently, everything revertible in minutes. ' +
      'Avoid one-way doors. If a migration has no rollback path, it should not be deployed ' +
      'without extreme justification.',

    keyPoints: [
      'Reversible: forward + rollback migration (Flyway, Liquibase)',
      'Irreversible drops: archive to cold storage before DROP',
      'Feature flags: instant rollback without redeploy',
      'Canary migration: 1% → verify → scale',
      'Dual-write windows: old + new stay consistent for rollback',
      'Never drop a column in the same deploy that stops reading it',
      'Test rollback on staging: most teams forget this',
      'Monitor: error rate, P99, replication lag, DB CPU',
      'Point-in-time recovery (PITR): restore to any moment before incident',
      'Kill switch: pre-built way to disable new code path in seconds',
    ],

    diagram:
      'MIGRATION PLAN (each step reversible):\n\n' +
      '  1. Backup           ──►  2. Add new col  ──►  3. Dual-write\n' +
      '                                                     │\n' +
      '  6. Monitor 7 days   ◄──  5. Switch read  ◄──  4. Backfill\n' +
      '        │                     (throttled)\n' +
      '        ▼\n' +
      '  7. Drop old col  (only after stable for weeks)\n\n' +
      'ROLLBACK AT ANY STEP:\n' +
      '  Flip feature flag OFF\n' +
      '       │\n' +
      '       ▼\n' +
      '  Reads revert to old column\n' +
      '       │\n' +
      '       ▼\n' +
      '  Dual-write keeps both columns in sync\n' +
      '       │\n' +
      '       ▼\n' +
      '  Zero data loss, zero downtime\n\n' +
      'DECISION FLOW:\n' +
      '  Is migration reversible?\n' +
      '     ├── YES → deploy with feature flag + canary\n' +
      '     └── NO  → split into reversible steps first\n\n' +
      '  Common irreversible ops:\n' +
      '     • DROP COLUMN              → archive first\n' +
      '     • Change column type       → add new, dual-write, drop old\n' +
      '     • Merge tables             → expand, backfill, switch, contract\n' +
      '     • Delete rows              → soft delete first (deleted_at)',

    whenToUse: 'Every production migration. Especially risky ones (large tables, financial data).',
    whatToUse: 'Feature flags (LaunchDarkly, Unleash), Flyway/Liquibase, backup + PITR.',

    useCase:
      '• Stripe: payments migrations with feature flags + shadow reads\n' +
      '• Airbnb: online schema migrations with canary + auto-rollback\n' +
      '• Facebook: MySQL migrations with dry-run on shadow tables\n' +
      '• Google: Spanner schema changes with compatibility windows\n' +
      '• GitHub: gh-ost migrations with automatic rollback on error rate spike',

    scenario:
      'INTERVIEW: "You\'re adding a new column to a 500M-row users table on production. ' +
      'How do you do it safely?"\n\n' +
      '→ Discuss in order:\n' +
      '  1. Plan: use Expand-Contract (add nullable → dual-write → backfill → switch → drop)\n' +
      '  2. Staging: dry-run on a copy first, measure backfill time + lock impact\n' +
      '  3. Backup: take a snapshot / ensure PITR window covers rollback\n' +
      '  4. Feature flag: gate all reads/writes on the new column\n' +
      '  5. Deploy 1: add column (nullable, no default — instant)\n' +
      '  6. Deploy 2: dual-write code (writes both old and new)\n' +
      '  7. Backfill: batched UPDATE in chunks of 1000, with sleep between, monitor lag\n' +
      '  8. Verify: row counts match, spot-check values\n' +
      '  9. Flip flag: reads use new column (canary 1% → 10% → 100%)\n' +
      '  10. Monitor: error rate, P99, replication lag for 24-48 hours\n' +
      '  11. Wait 1-2 weeks: watch for edge cases\n' +
      '  12. Drop old column (irreversible — archive first if needed)\n\n' +
      '  Rollback at any point: flip feature flag off, reads revert to old column. ' +
      'Dual-write keeps both in sync. Zero data loss.',

    memoryTrick:
      '"Parachute first, jump second". Never deploy a migration without a rollback plan. ' +
      'Feature flag = parachute. Canary = test jump. PITR = rescue helicopter. ' +
      'If you can\'t undo it, don\'t do it.',
  },

]