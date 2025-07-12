import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MessageContent = ({ content, isUser }) => {
  if (isUser) {
    // User messages display as plain text with pre-wrap
    return <div className="whitespace-pre-wrap text-white">{content}</div>;
  }

  // AI messages render with Markdown support
  return (
    <div className="markdown-content text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Customize heading styles with proper hierarchy
          h1: ({ children }) => (
            <h1 className="text-xl font-bold mb-3 text-gray-900">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold mb-2 text-gray-800">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-bold mb-2 text-gray-800">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm font-semibold mb-1 text-gray-800">
              {children}
            </h4>
          ),
          // Customize paragraph styles
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 text-gray-700 leading-relaxed text-sm">
              {children}
            </p>
          ),
          // Customize bold text
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900 text-sm">
              {children}
            </strong>
          ),
          // Customize italic text
          em: ({ children }) => (
            <em className="italic text-gray-800">{children}</em>
          ),
          // Customize lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-2 space-y-1 text-gray-700 text-sm">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-2 space-y-1 text-gray-700 text-sm">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700 text-sm">{children}</li>
          ),
          // Customize code blocks
          code: ({ inline, children, ...props }) => {
            if (inline) {
              return (
                <code
                  className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto mb-2 text-sm">
                <code className="font-mono text-gray-800" {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          // Customize blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-300 pl-4 italic text-gray-600 mb-2 bg-blue-50 py-2 rounded-r">
              {children}
            </blockquote>
          ),
          // Customize links
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              {children}
            </a>
          ),
          // Customize horizontal rules
          hr: () => <hr className="border-gray-300 my-4" />,
          // Customize tables
          table: ({ children }) => (
            <div className="overflow-x-auto mb-2">
              <table className="min-w-full border border-gray-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-800">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-3 py-2 text-gray-700">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MessageContent;
