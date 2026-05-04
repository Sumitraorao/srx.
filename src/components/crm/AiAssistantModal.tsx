import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AiAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = async () => {
        if (!query.trim()) return;
        setIsLoading(true);
        setResponse(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
            
            // Simulated CRM data for AI context
            const dummyData = {
                leads: [{ company: 'Initech', status: 'Qualified', value: 45000 }],
                deals: [{ name: 'Enterprise Cloud', stage: 'Negotiation', amount: 120000 }]
            };

            const prompt = `As a CRM Business Intelligence expert, analyze this data: ${JSON.stringify(dummyData)}. User Query: ${query}. Provide sharp, actionable business strategy in 3 bullet points.`;

            const res = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt
            });
            
            setResponse(res.text || "No insights generated.");
        } catch (error: any) {
            console.error("AI Error:", error);
            setResponse("I'm sorry, I couldn't process that request right now. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
                    >
                        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 animate-pulse" />
                                <h3 className="font-black tracking-tight">SrxAI CRM Assistant</h3>
                            </div>
                            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            {!response && !isLoading ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                                        <Sparkles className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-slate-900 font-bold mb-2">How can I help you today?</h4>
                                    <p className="text-slate-500 text-sm">Ask about your leads, revenue trends, or deal risks.</p>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                    {isLoading ? (
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                <p className="text-sm text-slate-600 animate-pulse">Analyzing CRM data and generating business strategy...</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                                                <Sparkles className="w-4 h-4" />
                                            </div>
                                            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                                <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{response}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex gap-2">
                                <input 
                                    type="text"
                                    placeholder="Type your question..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-blue-500/20"
                                />
                                <button 
                                    onClick={handleAsk}
                                    disabled={isLoading || !query.trim()}
                                    className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
