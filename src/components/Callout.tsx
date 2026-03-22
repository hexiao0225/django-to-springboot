import type { CalloutSection } from '../data/lessons';

const variants = {
  key: {
    bg: 'bg-violet-50',
    border: 'border-violet-300',
    titleColor: 'text-violet-800',
    bodyColor: 'text-violet-700',
    icon: '🔑',
  },
  tip: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    titleColor: 'text-emerald-800',
    bodyColor: 'text-emerald-700',
    icon: '💡',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    titleColor: 'text-blue-800',
    bodyColor: 'text-blue-700',
    icon: 'ℹ️',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    titleColor: 'text-amber-800',
    bodyColor: 'text-amber-700',
    icon: '⚠️',
  },
};

export default function Callout({ variant, title, body }: CalloutSection) {
  const v = variants[variant];
  return (
    <div className={`my-5 rounded-xl border-l-4 px-5 py-4 ${v.bg} ${v.border}`}>
      <div className={`font-semibold text-sm mb-1 flex items-center gap-2 ${v.titleColor}`}>
        <span>{v.icon}</span>
        {title}
      </div>
      <p className={`text-sm leading-relaxed ${v.bodyColor}`}>{body}</p>
    </div>
  );
}
