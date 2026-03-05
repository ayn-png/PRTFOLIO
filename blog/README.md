# Blog Posts

This folder contains all blog post content for the portfolio website.

## Files

- `blog-post-1-generative-ai.md` - AI & ML tutorial
- `blog-post-2-react-best-practices.md` - Full-Stack Development guide
- `blog-post-3-sql-vs-nosql.md` - Data Engineering article
- `blog-posts-metadata.json` - Structured metadata for all posts

## Quick Start

### Option 1: Convert to HTML (Simple)

Use the included conversion script:

```bash
npm run convert-blog
```

This will create HTML files from the Markdown.

### Option 2: Use with React/Next.js

The Markdown files can be directly imported and rendered with:

```javascript
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

async function getPostData(filename) {
  const fileContents = fs.readFileSync(`blog/${filename}`, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);

  return {
    ...data,
    contentHtml: processedContent.toString()
  };
}
```

### Option 3: View Online

You can paste the Markdown content directly into:
- [Dev.to](https://dev.to)
- [Medium](https://medium.com)
- [Hashnode](https://hashnode.com)

## Metadata Structure

The `blog-posts-metadata.json` file contains:
- Post titles, descriptions, categories
- Author information
- Tags and keywords
- Read time estimates
- Cover image prompts

Use this for building blog listing pages.

## Cover Images

Generate using the prompts in the metadata file with:
- DALL-E 3
- Midjourney
- Stable Diffusion

Recommended size: 1200x630px

## Integration

See the root folder's `BLOG_INTEGRATION_GUIDE.md` for complete integration instructions.
