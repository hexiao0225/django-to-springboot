import type { Lesson } from '../data/lessons';

interface Props {
  lessons: Lesson[];
  currentId: string;
  completed: Set<string>;
  onSelect: (id: string) => void;
}

export default function Sidebar({ lessons, currentId, completed, onSelect }: Props) {
  const progress = Math.round((completed.size / lessons.length) * 100);

  return (
    <aside className="w-72 shrink-0 bg-slate-900 text-slate-300 flex flex-col overflow-hidden border-r border-slate-800">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
            SB
          </div>
          <span className="font-bold text-white text-sm">Django → Spring Boot</span>
        </div>
        <p className="text-xs text-slate-500">A field guide for Django devs</p>
      </div>

      {/* Progress */}
      <div className="px-5 py-4 border-b border-slate-800">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Progress</span>
          <span className="text-slate-300 font-medium">{completed.size}/{lessons.length}</span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Lessons list */}
      <nav className="flex-1 overflow-y-auto py-3">
        {lessons.map((lesson) => {
          const isActive = lesson.id === currentId;
          const isDone = completed.has(lesson.id);

          return (
            <button
              key={lesson.id}
              onClick={() => onSelect(lesson.id)}
              className={`w-full text-left px-5 py-3 flex items-start gap-3 transition-colors text-sm group
                ${isActive
                  ? 'bg-slate-800 text-white'
                  : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
            >
              {/* Status indicator */}
              <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border
                ${isDone
                  ? 'bg-indigo-500 border-indigo-500 text-white'
                  : isActive
                  ? 'border-indigo-400 text-indigo-400'
                  : 'border-slate-600 text-slate-600'
                }`}
              >
                {isDone ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  lesson.number
                )}
              </div>

              {/* Title */}
              <div>
                <div className={`font-medium leading-tight ${isActive ? 'text-white' : ''}`}>
                  {lesson.title}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 leading-tight">
                  {lesson.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-800 text-xs text-slate-600">
        Kotlin Spring Boot · PostgreSQL · React
      </div>
    </aside>
  );
}
