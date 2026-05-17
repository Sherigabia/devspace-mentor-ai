"use client";

import { X, Bot, CheckCircle2, AlertTriangle, ChevronRight, BookOpen, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface LearningModule {
  id: string;
  title: string;
  lessonContent: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

interface InteractiveLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: LearningModule | null;
  onComplete: (moduleId: string) => void;
}

export function InteractiveLearningModal({ isOpen, onClose, module, onComplete }: InteractiveLearningModalProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isOpen && module) {
      setMounted(true);
      document.body.style.overflow = "hidden";
      setSelectedAnswer(null);
      setFeedback(null);
      setIsCompleted(false);
      setIsEvaluating(false);
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen, module]);

  if (!mounted && !isOpen) return null;

  const handleSubmit = () => {
    if (selectedAnswer === null || !module) return;
    
    setIsEvaluating(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      setIsEvaluating(false);
      const isCorrect = selectedAnswer === module.quiz.correctAnswer;
      
      setFeedback({
        isCorrect,
        message: isCorrect 
          ? "Excellent! " + module.quiz.explanation
          : "Not quite. " + module.quiz.explanation
      });

      if (isCorrect) {
        setIsCompleted(true);
      }
    }, 1500);
  };

  const handleFinish = () => {
    if (module) {
      onComplete(module.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Modal Content */}
      <div 
        className={cn(
          "relative w-[98vw] h-[96vh] max-w-[1400px] bg-[#0a0a0b] border border-[#262626] rounded-2xl shadow-2xl transition-all duration-300 transform flex flex-col overflow-hidden",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626] bg-[#131314] shrink-0">
          <div className="flex items-center gap-4">
             <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#c0c1ff] to-[#6366f1] text-[#0a0a0b] shadow-[0_0_15px_rgba(192,193,255,0.3)]">
                <GraduationCap className="w-5 h-5" />
             </div>
             <div>
                <h2 className="text-lg font-bold text-[#e5e2e3]">Interactive Lesson</h2>
                <div className="flex items-center gap-2 text-sm text-[#c0c1ff]">
                   <span>{module?.title}</span>
                </div>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#262626] text-[#908fa0] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body - 2 Panels */}
        <div className="flex flex-1 overflow-hidden">
           
           {/* Left Panel: Lesson & Quiz Content */}
           <div className="flex-1 flex flex-col overflow-y-auto bg-[#0d0d0f] custom-scrollbar">
              <div className="max-w-3xl mx-auto w-full p-8 space-y-12">
                 
                 {/* Lesson Section */}
                 <section className="space-y-6 animate-fade-in">
                    <div className="flex items-center gap-2 text-[#4cd7f6] font-bold uppercase tracking-wider text-sm border-b border-[#262626] pb-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Reading Material</span>
                    </div>
                    <div className="prose prose-invert max-w-none text-lg text-[#908fa0] leading-relaxed">
                       {/* We split by paragraphs for visual separation */}
                       {module?.lessonContent.split('\n\n').map((paragraph, i) => (
                         <p key={i}>{paragraph}</p>
                       ))}
                    </div>
                 </section>

                 {/* Interactive Quiz Section */}
                 <section className="space-y-6 animate-fade-in">
                    <div className="flex items-center gap-2 text-[#c0c1ff] font-bold uppercase tracking-wider text-sm border-b border-[#262626] pb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Knowledge Check</span>
                    </div>
                    
                    <div className="bg-[#131314] border border-[#262626] rounded-2xl p-8 space-y-8 shadow-lg">
                       <h3 className="text-xl font-bold text-[#e5e2e3]">
                         {module?.quiz.question}
                       </h3>

                       <div className="space-y-3">
                         {module?.quiz.options.map((option, index) => (
                           <button
                             key={index}
                             onClick={() => !isCompleted && setSelectedAnswer(index)}
                             disabled={isCompleted || isEvaluating}
                             className={cn(
                               "w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
                               selectedAnswer === index 
                                 ? "border-[#c0c1ff] bg-[#c0c1ff]/10" 
                                 : "border-[#262626] bg-[#0a0a0b] hover:border-[#464554] disabled:opacity-50",
                               (isCompleted && index === module.quiz.correctAnswer) && "border-green-500 bg-green-500/10",
                               (isCompleted && selectedAnswer === index && index !== module.quiz.correctAnswer) && "border-red-500 bg-red-500/10"
                             )}
                           >
                              <div className={cn(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                                selectedAnswer === index ? "border-[#c0c1ff]" : "border-[#464554]",
                                (isCompleted && index === module.quiz.correctAnswer) && "border-green-500 bg-green-500 text-white",
                                (isCompleted && selectedAnswer === index && index !== module.quiz.correctAnswer) && "border-red-500 bg-red-500 text-white"
                              )}>
                                {isCompleted && index === module.quiz.correctAnswer && <CheckCircle2 className="w-4 h-4" />}
                                {isCompleted && selectedAnswer === index && index !== module.quiz.correctAnswer && <X className="w-4 h-4" />}
                                {(!isCompleted || (selectedAnswer !== index && index !== module.quiz.correctAnswer)) && (
                                   <span className="text-xs font-bold">{String.fromCharCode(65 + index)}</span>
                                )}
                              </div>
                              <span className={cn(
                                "text-base font-medium",
                                selectedAnswer === index ? "text-[#c0c1ff]" : "text-[#908fa0]",
                                (isCompleted && index === module.quiz.correctAnswer) && "text-green-400",
                                (isCompleted && selectedAnswer === index && index !== module.quiz.correctAnswer) && "text-red-400"
                              )}>
                                {option}
                              </span>
                           </button>
                         ))}
                       </div>

                       {!isCompleted && (
                         <button
                           onClick={handleSubmit}
                           disabled={selectedAnswer === null || isEvaluating}
                           className="w-full py-4 rounded-xl font-bold bg-[#c0c1ff] text-[#0a0a0b] hover:bg-[#a6a8fa] transition-all disabled:opacity-50 disabled:hover:bg-[#c0c1ff] flex justify-center items-center gap-2"
                         >
                           {isEvaluating ? (
                             <>
                               <div className="w-5 h-5 border-2 border-[#0a0a0b]/20 border-t-[#0a0a0b] rounded-full animate-spin" />
                               Evaluating...
                             </>
                           ) : (
                             "Submit Answer"
                           )}
                         </button>
                       )}
                    </div>
                 </section>

              </div>
           </div>

           {/* Right Panel: AI Mentor Assistant */}
           <div className="w-80 border-l border-[#262626] bg-[#0a0a0b] flex flex-col shrink-0">
              <div className="p-4 border-b border-[#262626] flex items-center gap-2 bg-[#131314]">
                 <Bot className="w-5 h-5 text-[#c0c1ff]" />
                 <h3 className="text-sm font-bold text-[#e5e2e3]">AI Mentor</h3>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                 
                 <div className="space-y-2">
                   <div className="inline-block px-4 py-3 rounded-2xl rounded-tl-sm bg-[#262626] text-sm text-[#e5e2e3] leading-relaxed">
                     Welcome to this interactive module! Read through the material on the left, then try to answer the knowledge check. I'll be right here to evaluate your answer!
                   </div>
                 </div>

                 {isEvaluating && (
                    <div className="space-y-2 animate-fade-in">
                      <div className="inline-block px-4 py-3 rounded-2xl rounded-tl-sm bg-[#c0c1ff]/10 border border-[#c0c1ff]/20 text-sm text-[#e5e2e3] flex items-center gap-3">
                         <div className="w-4 h-4 border-2 border-[#c0c1ff]/30 border-t-[#c0c1ff] rounded-full animate-spin" />
                         Thinking...
                      </div>
                    </div>
                 )}

                 {feedback && (
                    <div className="space-y-2 animate-fade-in">
                      <div className={cn(
                        "inline-block px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed border",
                        feedback.isCorrect 
                          ? "bg-green-500/10 border-green-500/20 text-green-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                      )}>
                        {feedback.message}
                      </div>
                    </div>
                 )}

              </div>

              {/* Action Footer */}
              {isCompleted && (
                 <div className="p-6 border-t border-[#262626] bg-[#131314] animate-fade-in">
                    <button 
                      onClick={handleFinish}
                      className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-gradient-to-r from-[#c0c1ff] to-[#4cd7f6] text-[#0a0a0b] font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(192,193,255,0.3)]"
                    >
                      Complete Module
                      <ChevronRight className="w-5 h-5" />
                    </button>
                 </div>
              )}
           </div>

        </div>
      </div>
    </div>
  );
}
