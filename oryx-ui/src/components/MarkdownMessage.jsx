import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/github-dark.css';

export default function MarkdownMessage({ content }) {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        code({node, inline, className, children, ...props}) {
          return (
            <code className={className} {...props} style={{background: inline ? 'none' : '#232425', color: '#f5f6fa', padding: inline ? 0 : '4px 8px', borderRadius: 0, fontSize: '0.98em'}}>
              {children}
            </code>
          );
        }
      }}
    />
  );
}
