import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import {
  Heart,
  X,
  Pill,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";
import medicinesData from "./data/mediswipe_medicines.json";

const fallbackImage =
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80";

const sourceMedicines = Array.isArray(medicinesData?.items)
  ? medicinesData.items
  : [];

const SWIPE_THRESHOLD = 120;

function getDecisionLabel(x) {
  if (x > 40) return "Useful";
  if (x < -40) return "Skip";
  return "Review";
}

function shuffleArray(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getSavedLiked() {
  try {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("mediswipe-liked");
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export default function MedicineSwipePrototype() {
  const [index, setIndex] = useState(0);

  const [shuffledMedicines, setShuffledMedicines] = useState(() =>
    shuffleArray(sourceMedicines)
  );

  const [liked, setLiked] = useState(() => getSavedLiked());
  const [passed, setPassed] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedSaved, setSelectedSaved] = useState(null);
  const actionLockRef = useRef(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("mediswipe-liked", JSON.stringify(liked));
      }
    } catch (error) {
      // ignore localStorage write errors
    }
  }, [liked]);

  const remaining = useMemo(
    () => shuffledMedicines.slice(index),
    [shuffledMedicines, index]
  );

  const activeCard = remaining[0];

  const handleChoice = (choice, card = activeCard) => {
    if (!card || actionLockRef.current) return;

    actionLockRef.current = true;

    if (choice === "right") {
      setLiked((prev) => {
        const alreadySaved = prev.some((item) => item.id === card.id);
        if (alreadySaved) return prev;
        return [...prev, card];
      });
    } else {
      setPassed((prev) => {
        const alreadyPassed = prev.some((item) => item.id === card.id);
        if (alreadyPassed) return prev;
        return [...prev, card];
      });
    }

    setIndex((prev) => prev + 1);

    setTimeout(() => {
      actionLockRef.current = false;
    }, 350);
  };

  const resetDeck = () => {
    setIndex(0);
    setPassed([]);
    setShuffledMedicines(shuffleArray(sourceMedicines));
  };

  const clearSaved = () => {
    setLiked([]);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("mediswipe-liked");
      }
    } catch (error) {
      // ignore localStorage remove errors
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f4fff6] via-[#ecfff4] to-[#fff3e8] text-slate-800">
            <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />

            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:flex-row lg:items-start lg:gap-8 lg:px-8">
              <section className="mb-6 flex-1 lg:mb-0 lg:max-w-sm">
                <div className="rounded-[30px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_60px_rgba(16,24,40,0.10)] backdrop-blur">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-3xl bg-gradient-to-br from-green-200 via-emerald-200 to-orange-200 p-3 shadow-sm">
                      <Pill className="h-6 w-6" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-extrabold tracking-tight">
                        MediSwipe
                      </h1>
                      <p className="text-sm text-slate-600">
                        Medicine discovery
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-3xl border border-green-100 bg-green-50 p-4">
                      <p className="text-sm text-slate-500">Useful</p>
                      <p className="mt-1 text-3xl font-extrabold text-green-700">
                        {liked.length}
                      </p>
                    </div>

                    <div className="rounded-3xl border border-orange-100 bg-orange-50 p-4">
                      <p className="text-sm text-slate-500">Skipped</p>
                      <p className="mt-1 text-3xl font-extrabold text-orange-700">
                        {passed.length}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-3xl bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Stethoscope className="h-4 w-4" />
                      Swipe logic
                    </div>
                    <p className="text-sm leading-6 text-slate-600">
                      Right swipe = Relevant Medicine
                      <br />
                      Left swipe = skipped.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowSaved((prev) => !prev)}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-3 font-medium text-white shadow-sm transition hover:bg-green-700"
                  >
                    <Heart className="h-4 w-4" />
                    {showSaved ? "Hide Saved Medicines" : "View Saved Medicines"}
                  </button>

                  {showSaved && (
                    <div className="mt-4 rounded-3xl border border-green-100 bg-green-50/60 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-base font-bold text-slate-800">
                          Saved Useful Medicines
                        </h3>
                        {liked.length > 0 && (
                          <button
                            onClick={clearSaved}
                            className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-red-600 shadow-sm ring-1 ring-red-100 transition hover:bg-red-50"
                          >
                            Clear Saved
                          </button>
                        )}
                      </div>

                      {liked.length === 0 ? (
                        <p className="text-sm text-slate-600">
                          Abhi tak koi medicine save nahi hui.
                        </p>
                      ) : (
                        <div className="max-h-[320px] space-y-3 overflow-y-auto pr-1">
                          {liked.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => setSelectedSaved(item)}
                              className="cursor-pointer rounded-2xl bg-white p-3 shadow-sm ring-1 ring-green-100 transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                              <div className="flex items-start gap-3">
                                <img
                                  src={item.image || fallbackImage}
                                  alt={item.name}
                                  className="h-14 w-14 rounded-xl object-cover"
                                />

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className="truncate text-sm font-bold text-slate-800">
                                      {item.name}
                                    </h4>
                                    <span className="shrink-0 rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
                                      {item.type}
                                    </span>
                                  </div>

                                  <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                                    {item.summary}
                                  </p>

                                  <div className="mt-2 flex flex-wrap gap-1.5">
                                    {(item.diseases || []).slice(0, 3).map((disease) => (
                                      <span
                                        key={disease}
                                        className="rounded-full bg-gradient-to-r from-green-100 to-orange-100 px-2 py-1 text-[10px] font-semibold text-slate-700"
                                      >
                                        {disease}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>

              <section className="flex flex-1 items-center justify-center">
                <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                  <div className="relative h-[640px] sm:h-[680px]">
                    {remaining.length > 0 ? (
                      <AnimatePresence>
                        {remaining
                          .slice(0, 3)
                          .reverse()
                          .map((item, stackIndex) => {
                            const visibleCards = remaining.slice(0, 3);
                            const isTop = stackIndex === visibleCards.length - 1;
                            const offset = visibleCards.length - 1 - stackIndex;

                            return (
                              <motion.div
                                key={item.id}
                                drag={isTop ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.9}
                                onDragEnd={(_, info) => {
                                  if (!isTop) return;
                                  if (info.offset.x > SWIPE_THRESHOLD) {
                                    handleChoice("right", item);
                                  } else if (info.offset.x < -SWIPE_THRESHOLD) {
                                    handleChoice("left", item);
                                  }
                                }}
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{
                                  scale: 1 - offset * 0.04,
                                  opacity: 1,
                                  y: offset * 12,
                                }}
                                exit={{ opacity: 0, x: 240, rotate: 10 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 260,
                                  damping: 22,
                                }}
                                className="absolute inset-0"
                                style={{ zIndex: 30 - offset }}
                              >
                                <motion.div
                                  className="relative flex h-full flex-col overflow-hidden rounded-[34px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.14)] ring-1 ring-black/5"
                                  whileTap={isTop ? { scale: 0.985 } : undefined}
                                >
                                  <div className="relative h-[50%] w-full sm:h-[52%]">
                                    <img
                                      src={item.image || fallbackImage}
                                      alt={item.name}
                                      className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                                    {isTop && (
                                      <motion.div
                                        className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 shadow"
                                        initial={{ opacity: 0.8 }}
                                      >
                                        Drag Me
                                      </motion.div>
                                    )}

                                    <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/92 p-4 shadow-lg backdrop-blur-md">
                                      <div className="mb-2 flex items-center justify-between gap-3">
                                        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                                          {item.name}
                                        </h2>
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                          {item.type}
                                        </span>
                                      </div>
                                      <p className="text-sm leading-5 text-slate-700">
                                        {item.summary}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    <div className="mb-3 flex items-center justify-between">
                                      <p className="text-sm font-semibold text-slate-500">
                                        Works for
                                      </p>
                                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                        {getDecisionLabel(0)}
                                      </span>
                                    </div>

                                    <div className="mb-4 flex flex-wrap gap-2">
                                      {(item.diseases || []).map((disease) => (
                                        <span
                                          key={disease}
                                          className="rounded-full bg-gradient-to-r from-green-100 to-orange-100 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
                                        >
                                          {disease}
                                        </span>
                                      ))}
                                    </div>

                                    <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                                      <span className="font-semibold text-slate-800">
                                        Note:
                                      </span>{" "}
                                      {item.caution}
                                    </div>

                                    <div className="mt-auto pt-5 sm:pt-6">
                                      <div className="flex items-center justify-center gap-4">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleChoice("left", item);
                                          }} className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-700 shadow-md transition hover:scale-110 hover:bg-orange-200 active:scale-95"
                                        >
                                          <X className="h-6 w-6" />
                                        </button>

                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleChoice("right", item);
                                          }} className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700 shadow-lg transition hover:scale-110 hover:bg-green-200 active:scale-95"
                                        >
                                          <Heart className="h-7 w-7" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </motion.div>
                            );
                          })}
                      </AnimatePresence>
                    ) : (
                      <div className="flex h-full items-center justify-center rounded-[34px] border border-dashed border-slate-300 bg-white/85 p-6 text-center shadow-[0_20px_60px_rgba(16,24,40,0.10)]">
                        <div>
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                            <CheckCircle2 className="h-8 w-8" />
                          </div>
                          <h3 className="text-2xl font-bold">All cards reviewed</h3>
                          {/* <p className="mt-2 text-slate-600">
                      Reset karke dubara test kar sakte ho ya saved medicines
                      left panel me dekh sakte ho.
                    </p> */}
                          <button
                            onClick={resetDeck}
                            className="mt-5 rounded-2xl bg-gradient-to-r from-green-500 to-orange-400 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                          >
                            Start Again
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
            <footer className="relative mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
              <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 text-center shadow-sm backdrop-blur">
                <p className="text-sm text-slate-600">
                  © 2026 <span className="font-semibold text-slate-800">MediSwipe</span>. All rights reserved.
                </p>
                <Link
                  to="/privacy-policy"
                  className="mt-2 inline-block text-sm font-medium text-green-700 underline underline-offset-4 hover:text-green-800"
                >
                  Privacy Policy
                </Link>
              </div>
            </footer>
            {selectedSaved && (
              <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
                <div className="relative w-full max-w-md overflow-hidden rounded-[34px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.25)]">
                  <button
                    onClick={() => setSelectedSaved(null)}
                    className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="relative h-[280px] w-full">
                    <img
                      src={selectedSaved.image || fallbackImage}
                      alt={selectedSaved.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                          {selectedSaved.name}
                        </h2>
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
                          {selectedSaved.type}
                        </span>
                      </div>
                      <p className="text-sm text-white/90">{selectedSaved.summary}</p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-500">Works for</p>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        Saved
                      </span>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {(selectedSaved.diseases || []).map((disease) => (
                        <span
                          key={disease}
                          className="rounded-full bg-gradient-to-r from-green-100 to-orange-100 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
                        >
                          {disease}
                        </span>
                      ))}
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                      <span className="font-semibold text-slate-800">Note:</span>{" "}
                      {selectedSaved.caution}
                    </div>

                    <button
                      onClick={() => setSelectedSaved(null)}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-orange-400 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        }
      />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>

  );
}