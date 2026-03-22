import { useState, useEffect } from 'react';
import { lessons } from './data/lessons';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';

const STORAGE_KEY = 'django-sb-completed';

function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}

function saveCompleted(s: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...s]));
}

export default function App() {
  const [currentId, setCurrentId] = useState(lessons[0].id);
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted);

  const currentIndex = lessons.findIndex((l) => l.id === currentId);
  const currentLesson = lessons[currentIndex];

  function goTo(id: string) {
    // Mark current lesson as completed when leaving it
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(currentId);
      saveCompleted(next);
      return next;
    });
    setCurrentId(id);
    window.scrollTo(0, 0);
  }

  function goNext() {
    if (currentIndex < lessons.length - 1) {
      goTo(lessons[currentIndex + 1].id);
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentId(lessons[currentIndex - 1].id);
    }
  }

  // Mark last lesson complete when reaching it and clicking "complete"
  useEffect(() => {
    if (currentIndex === lessons.length - 1) {
      setCompleted((prev) => {
        const next = new Set(prev);
        next.add(currentId);
        saveCompleted(next);
        return next;
      });
    }
  }, [currentId, currentIndex]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        lessons={lessons}
        currentId={currentId}
        completed={completed}
        onSelect={(id) => {
          setCompleted((prev) => {
            const next = new Set(prev);
            next.add(currentId);
            saveCompleted(next);
            return next;
          });
          setCurrentId(id);
        }}
      />
      <LessonView
        key={currentId}
        lesson={currentLesson}
        onNext={goNext}
        onPrev={goPrev}
        isFirst={currentIndex === 0}
        isLast={currentIndex === lessons.length - 1}
      />
    </div>
  );
}
