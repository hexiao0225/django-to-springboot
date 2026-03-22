import type { Lesson } from '../data/lessons';
import CodeComparison from './CodeComparison';
import CodeBlock from './CodeBlock';
import Callout from './Callout';

interface Props {
  lesson: Lesson;
  onNext?: () => void;
  onPrev?: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function LessonView({ lesson, onNext, onPrev, isFirst, isLast }: Props) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Lesson {lesson.number} of 12
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{lesson.title}</h1>
          <p className="text-lg text-slate-500">{lesson.subtitle}</p>
          <div className="mt-4 h-px bg-slate-200" />
        </div>

        {/* Sections */}
        <div>
          {lesson.sections.map((section, i) => {
            if (section.type === 'text') {
              return (
                <div key={i} className="mb-6">
                  {section.heading && (
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">
                      {section.heading}
                    </h2>
                  )}
                  <p className="text-slate-600 leading-relaxed text-base">{section.body}</p>
                </div>
              );
            }

            if (section.type === 'comparison') {
              return (
                <CodeComparison
                  key={i}
                  django={section.django}
                  springBoot={section.springBoot}
                  djangoLabel={section.djangoLabel}
                  springBootLabel={section.springBootLabel}
                  djangoLang={section.djangoLang}
                  springBootLang={section.springBootLang}
                  heading={section.heading}
                  body={section.body}
                />
              );
            }

            if (section.type === 'callout') {
              return <Callout key={i} {...section} />;
            }

            if (section.type === 'code') {
              return (
                <div key={i} className="my-6">
                  {section.heading && (
                    <h3 className="text-base font-semibold text-slate-800 mb-1">
                      {section.heading}
                    </h3>
                  )}
                  {section.body && (
                    <p className="text-sm text-slate-600 mb-3">{section.body}</p>
                  )}
                  <CodeBlock
                    code={section.code}
                    language={section.language}
                    label={section.label}
                    accentColor="#16a34a"
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          {!isLast ? (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Next Lesson
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Tutorial Complete!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
