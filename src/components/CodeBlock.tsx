import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
  accentColor?: string;
}

export default function CodeBlock({
  code,
  language = 'kotlin',
  label,
  accentColor = '#6366f1',
}: CodeBlockProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 text-sm">
      {label && (
        <div
          className="px-4 py-2 text-xs font-semibold text-white flex items-center gap-2"
          style={{ backgroundColor: accentColor }}
        >
          <span
            className="w-2 h-2 rounded-full bg-white opacity-70 inline-block"
          />
          {label}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '13px',
          lineHeight: '1.65',
          padding: '1rem 1.25rem',
          background: '#0f172a',
        }}
        wrapLongLines={false}
        showLineNumbers={false}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
