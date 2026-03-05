/**
 * Blog Post Markdown to HTML Converter
 *
 * Usage: node blog/convert-to-html.js
 *
 * This script converts all Markdown blog posts to HTML files
 * with proper styling and syntax highlighting.
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

// Configure marked for better code highlighting
marked.setOptions({
  highlight: function(code, lang) {
    return `<pre><code class="language-${lang}">${code}</code></pre>`;
  },
  breaks: true,
  gfm: true
});

// HTML template
function createHTMLTemplate(metadata, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title} | Ayan Aalam</title>

  <!-- SEO Meta Tags -->
  <meta name="description" content="${metadata.description}">
  <meta name="keywords" content="${metadata.tags.join(', ')}">
  <meta name="author" content="${metadata.author}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${metadata.title}">
  <meta property="og:description" content="${metadata.description}">
  <meta property="article:published_time" content="${metadata.publishDate}">
  <meta property="article:author" content="${metadata.author}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${metadata.title}">
  <meta name="twitter:description" content="${metadata.description}">

  <!-- Styles -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Syne:wght@400;700;800&display=swap" rel="stylesheet">

  <!-- Syntax Highlighting -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">

  <style>
    :root {
      --lime: #C8FF00;
      --bg: #060606;
      --bg2: #0d0d0d;
      --white: #f0ede6;
      --dim: #3a3a3a;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: var(--bg);
      color: var(--white);
      font-family: 'Syne', sans-serif;
      line-height: 1.7;
      padding: 2rem 1rem;
    }

    .blog-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .blog-header {
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--dim);
    }

    .blog-category {
      display: inline-block;
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--lime);
      margin-bottom: 1rem;
    }

    h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      line-height: 1.1;
      margin-bottom: 1rem;
    }

    .blog-meta {
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      color: var(--dim);
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }

    .blog-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .tag {
      font-family: 'DM Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border: 1px solid var(--dim);
      padding: 0.3rem 0.6rem;
      color: #888;
      border-radius: 3px;
    }

    .blog-content {
      font-size: 1.05rem;
    }

    h2 {
      font-size: 2rem;
      margin: 2.5rem 0 1rem;
      color: var(--lime);
    }

    h3 {
      font-size: 1.5rem;
      margin: 2rem 0 1rem;
    }

    p {
      margin-bottom: 1.5rem;
      color: #ccc;
    }

    ul, ol {
      margin: 1.5rem 0 1.5rem 2rem;
      color: #ccc;
    }

    li {
      margin-bottom: 0.5rem;
    }

    a {
      color: var(--lime);
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.3s;
    }

    a:hover {
      border-bottom-color: var(--lime);
    }

    pre {
      background: var(--bg2);
      border: 1px solid var(--dim);
      border-radius: 8px;
      padding: 1.5rem;
      overflow-x: auto;
      margin: 1.5rem 0;
    }

    code {
      font-family: 'DM Mono', monospace;
      font-size: 0.9rem;
    }

    p code {
      background: rgba(200, 255, 0, 0.1);
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      color: var(--lime);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
    }

    th, td {
      border: 1px solid var(--dim);
      padding: 0.75rem;
      text-align: left;
    }

    th {
      background: var(--bg2);
      color: var(--lime);
      font-weight: 600;
    }

    blockquote {
      border-left: 3px solid var(--lime);
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      color: #999;
      font-style: italic;
    }

    .back-link {
      display: inline-block;
      margin-bottom: 2rem;
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    @media (max-width: 768px) {
      body {
        padding: 1rem;
      }

      .blog-meta {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="blog-container">
    <a href="../portfolio.html#blog" class="back-link">← Back to Portfolio</a>

    <header class="blog-header">
      <span class="blog-category">${metadata.category}</span>
      <h1>${metadata.title}</h1>
      <div class="blog-meta">
        <span>By ${metadata.author}</span>
        <span>${metadata.publishDate}</span>
        <span>${metadata.readTime}</span>
      </div>
      <div class="blog-tags">
        ${metadata.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </header>

    <article class="blog-content">
      ${content}
    </article>
  </div>

  <!-- Syntax Highlighting -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script>hljs.highlightAll();</script>
</body>
</html>`;
}

// Convert all markdown files
function convertAllPosts() {
  const blogDir = __dirname;
  const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md') && file !== 'README.md');

  console.log('🚀 Starting blog post conversion...\n');

  files.forEach(file => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse frontmatter and content
    const { data: metadata, content } = matter(fileContent);

    // Convert markdown to HTML
    const htmlContent = marked(content);

    // Create full HTML page
    const fullHTML = createHTMLTemplate(metadata, htmlContent);

    // Generate output filename
    const outputFileName = file.replace('.md', '.html');
    const outputPath = path.join(blogDir, outputFileName);

    // Write HTML file
    fs.writeFileSync(outputPath, fullHTML);

    console.log(`✅ Converted: ${file} → ${outputFileName}`);
  });

  console.log('\n✨ Conversion complete! All blog posts are now in HTML format.');
  console.log('📂 Files are located in: blog/');
}

// Run conversion
try {
  convertAllPosts();
} catch (error) {
  console.error('❌ Error during conversion:', error.message);
  console.log('\n💡 Make sure you have installed dependencies:');
  console.log('   npm install marked gray-matter');
}
