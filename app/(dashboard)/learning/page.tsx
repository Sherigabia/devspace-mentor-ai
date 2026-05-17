"use client";

import { useState } from "react";
import { TrendingUp, Award, Brain } from "lucide-react";
import { LearningPathStep } from "@/components/learning/LearningPathStep";
import { InteractiveLearningModal, LearningModule } from "@/components/learning/InteractiveLearningModal";

const INITIAL_STEPS = [
  {
    id: "step-1",
    title: "Foundations of Neural Networks",
    description: "Core understanding of perceptrons, backpropagation, and activation functions.",
    status: "completed" as const,
  },
  {
    id: "step-2",
    title: "Transformers & LLM Architecture",
    description: "Deep dive into Attention mechanisms, Positional Encoding, and BERT/GPT architectures.",
    status: "current" as const,
    progress: 65,
    aiSuggestion: "Focus on multi-head attention labs.",
  },
  {
    id: "step-3",
    title: "Reinforcement Learning from Human Feedback (RLHF)",
    description: "Advanced alignment techniques, reward modeling, and proximal policy optimization for robust AI systems.",
    status: "locked" as const,
  },
  {
    id: "step-4",
    title: "System Design for Scalable AI Products",
    description: "Optimizing inference, vector database architecture, and building production-ready agentic workflows.",
    status: "locked" as const,
  },
];

const MOCK_MODULE_CONTENT: Record<string, LearningModule> = {
  "step-2": {
    id: "step-2",
    title: "Transformers & LLM Architecture",
    lessonContent: "The Transformer architecture, introduced in the paper 'Attention Is All You Need' (2017), revolutionized Natural Language Processing.\n\nUnlike traditional Recurrent Neural Networks (RNNs) that process data sequentially, Transformers use a mechanism called 'Self-Attention'. This allows the model to look at all words in a sentence simultaneously and determine which words are most relevant to each other, regardless of their distance.\n\nAnother key component is 'Positional Encoding'. Since Transformers process tokens in parallel, they have no inherent understanding of word order. Positional encodings are injected into the input embeddings to provide a mathematical representation of the token's position in the sequence.",
    quiz: {
      question: "Why does the Transformer architecture require Positional Encoding?",
      options: [
        "To reduce the overall parameter count of the model.",
        "Because it processes sequences in parallel and lacks an inherent sense of word order.",
        "To convert words into numerical vectors.",
        "To increase the learning rate during the fine-tuning phase."
      ],
      correctAnswer: 1,
      explanation: "Since Transformers process all tokens simultaneously (in parallel) via self-attention, they lose the sequential information that RNNs naturally capture. Positional encoding adds context about a word's position in the sequence."
    }
  }
};

export default function LearningPage() {
  const [learningSteps, setLearningSteps] = useState(INITIAL_STEPS);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overallProgress, setOverallProgress] = useState(65);

  const handleResume = (stepId: string) => {
    const moduleContent = MOCK_MODULE_CONTENT[stepId];
    if (moduleContent) {
      setSelectedModule(moduleContent);
      setIsModalOpen(true);
    }
  };

  const handleCompleteModule = (moduleId: string) => {
    setLearningSteps(prev => {
      const newSteps = [...prev];
      const currentIndex = newSteps.findIndex(s => s.id === moduleId);
      
      if (currentIndex !== -1) {
        // Mark current as completed
        newSteps[currentIndex] = { ...newSteps[currentIndex], status: "completed", progress: undefined, aiSuggestion: undefined };
        
        // Unlock next
        if (currentIndex + 1 < newSteps.length) {
          newSteps[currentIndex + 1] = { 
            ...newSteps[currentIndex + 1], 
            status: "current", 
            progress: 0,
            aiSuggestion: "New module unlocked! Let's start with the basics."
          };
        }
      }
      return newSteps;
    });
    setOverallProgress(100); // Just a visual mock update
  };
  const skills = [
    { name: "Python / PyTorch", progress: 88, color: "primary" },
    { name: "Neural Architectures", progress: 74, color: "primary" },
    { name: "Mathematics for ML", progress: 92, color: "primary" },
  ];

  const recommendedResources = [
    {
      type: "Article",
      title: "Attention Is All You Need: Paper Breakdown",
      color: "secondary",
    },
    {
      type: "Code Lab",
      title: "Building a GPT from Scratch in PyTorch",
      color: "secondary",
    },
    {
      type: "Video",
      title: "Backpropagation Calculus Visualization",
      color: "secondary",
    },
  ];

  const milestones = [
    {
      icon: "🎯",
      title: "Logic Architect",
      description: "Completed the Mathematics of Deep Learning core.",
      unlocked: true,
      count: 1,
    },
    {
      icon: "🔮",
      title: "Data Weaver",
      description: "First complex dataset preprocessing pipeline.",
      unlocked: true,
    },
    {
      icon: "⚡",
      title: "Tuning Master",
      description: "Unlocked after fine-tuning 10 separate LLMs.",
      unlocked: false,
    },
    {
      icon: "🌐",
      title: "System Sage",
      description: "Deploy first multi-agent collaborative environment.",
      unlocked: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight">
            Learning Paths
          </h1>
          <p className="text-gray-400 mt-2">
            Your personalized AI-powered learning journey
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#201f20] border border-[#262626] rounded-lg">
          <div className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
          <span className="text-sm text-gray-300">{overallProgress}% Complete</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Learning Path Steps */}
        <section className="lg:col-span-2">
          <div className="glass-surface p-10 rounded-xl relative flex flex-col gap-12 overflow-hidden">
            {/* Roadmap Vertical Line */}
            <div className="absolute left-[64px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#c0c1ff]/30 via-[#4cd7f6]/30 to-transparent" />

            {learningSteps.map((step, index) => (
              <LearningPathStep 
                key={step.id} 
                {...step} 
                onResume={step.status === "current" ? () => handleResume(step.id) : undefined}
              />
            ))}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="space-y-6">
          {/* Skill Progression */}
          <div className="glass-surface p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-100">Skill Progression</h4>
              <TrendingUp className="w-5 h-5 text-[#c0c1ff]" />
            </div>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400">{skill.name}</span>
                    <span className="text-[#c0c1ff] font-medium">{skill.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#2a2a2b] rounded-full overflow-hidden">
                    <div
                      className="bg-[#c0c1ff] h-full rounded-full shadow-[0_0_8px_rgba(192,193,255,0.4)] transition-all duration-500"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-[#464554]/30 rounded-lg text-sm text-gray-400 hover:border-[#c0c1ff]/50 hover:text-[#c0c1ff] transition-all">
              Detailed Skill Map
            </button>
          </div>

          {/* Recommended Study */}
          <div className="glass-surface p-6 rounded-xl">
            <h4 className="font-bold text-gray-100 mb-4">Recommended Study</h4>
            <div className="space-y-3">
              {recommendedResources.map((resource, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 rounded-lg bg-[#201f20] hover:bg-[#2a2a2b] transition-colors border border-transparent hover:border-[#464554]/30 group"
                >
                  <div className="text-xs text-[#4cd7f6] font-bold uppercase tracking-wider mb-1">
                    {resource.type}
                  </div>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-[#c0c1ff] transition-colors">
                    {resource.title}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Mentor Insights */}
          <div className="p-6 rounded-xl border border-[#c0c1ff]/20 bg-gradient-to-br from-[#c0c1ff]/10 to-transparent">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded bg-[#c0c1ff]/20">
                <Brain className="w-5 h-5 text-[#c0c1ff]" />
              </div>
              <h4 className="font-bold text-sm text-gray-100">Mentor Insights</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              "You are excelling in theoretical foundations. I suggest spending more time in
              the 'Repositories' section to apply these concepts in real-world environments."
            </p>
          </div>
        </aside>
      </div>

      {/* Milestones Section */}
      <section className="pt-8 border-t border-[#262626]/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-100">Unlocked Milestones</h2>
          <Award className="w-6 h-6 text-[#ffb783]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`glass-surface p-6 rounded-xl flex flex-col items-center gap-4 group hover:border-[#c0c1ff]/40 transition-all ${
                !milestone.unlocked && "opacity-50 grayscale"
              }`}
            >
              <div
                className={`w-20 h-20 rounded-full bg-[#2a2a2b] border-2 flex items-center justify-center relative text-4xl ${
                  milestone.unlocked ? "border-[#c0c1ff]/40" : "border-[#464554]/30"
                }`}
              >
                {milestone.icon}
                {milestone.count && (
                  <div className="absolute -right-2 -top-2 bg-[#c0c1ff] text-[#0a0a0b] text-[10px] px-2 py-0.5 rounded-full font-bold">
                    x{milestone.count}
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-100 mb-1">{milestone.title}</div>
                <p className="text-xs text-gray-400">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Module Modal */}
      <InteractiveLearningModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        module={selectedModule}
        onComplete={handleCompleteModule}
      />
    </div>
  );
}

// Made with Bob
