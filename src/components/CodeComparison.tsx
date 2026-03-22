import CodeBlock from './CodeBlock';
import type { CodeSection } from '../data/lessons';

type Props = Pick<CodeSection,
  'django' | 'springBoot' | 'djangoLabel' | 'springBootLabel' |
  'djangoLang' | 'springBootLang' | 'heading' | 'body'>;

export default function CodeComparison({
  django,
  springBoot,
  djangoLabel = 'Python / Django',
  springBootLabel = 'Kotlin / Spring Boot',
  djangoLang = 'python',
  springBootLang = 'kotlin',
  heading,
  body,
}: Props) {
  return (
    <div className="my-6">
      {heading && (
        <h3 className="text-base font-semibold text-slate-800 mb-1">{heading}</h3>
      )}
      {body && (
        <p className="text-sm text-slate-600 mb-3">{body}</p>
      )}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <CodeBlock
          code={django}
          language={djangoLang}
          label={djangoLabel}
          accentColor="#2563eb"
        />
        <CodeBlock
          code={springBoot}
          language={springBootLang}
          label={springBootLabel}
          accentColor="#16a34a"
        />
      </div>
    </div>
  );
}
