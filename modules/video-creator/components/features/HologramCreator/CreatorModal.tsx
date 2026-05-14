"use client";

import React from 'react';
import { useHologramCreator } from '../../../hooks/useHologramCreator';
import StepType from './steps/StepType';
import StepActions from './steps/StepActions';
import StepUpload from './steps/StepUpload';
import StepMusic from './steps/StepMusic';
import StepReview from './steps/StepReview';
import StepGenerating from './steps/StepGenerating';
import StepReady from './steps/StepReady';

interface Props {
    onClose: () => void;
}

export default function CreatorModal({ onClose }: Props) {
    const { state, nextStep, updateState, generateHologram } = useHologramCreator();

    const renderStep = () => {
        switch (state.step) {
            case 'type':
                return <StepType onNext={() => nextStep('actions')} onUpdate={updateState} value={state.type} />;
            case 'actions':
                return <StepActions 
                    onNext={() => nextStep('upload')} 
                    onBack={() => nextStep('type')} 
                    onUpdate={updateState} 
                    values={state.actions} 
                    type={state.type || 'persona'} 
                />;
            case 'upload':
                return <StepUpload 
                    onNext={() => nextStep('music')} 
                    onBack={() => nextStep('actions')} 
                    onUpdate={updateState} 
                    image={state.image} 
                    preparedImage={state.preparedImage}
                />;
            case 'music':
                return <StepMusic 
                    onNext={() => nextStep('review')} 
                    onBack={() => nextStep('upload')} 
                    onUpdate={updateState} 
                    value={state.music} 
                />;
            case 'review':
                return <StepReview 
                    onNext={generateHologram} 
                    onBack={() => nextStep('music')} 
                    state={state} 
                />;
            case 'generating':
                return <StepGenerating />;
            case 'ready':
                return <StepReady onClose={onClose} />;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
                onClick={state.step !== 'generating' ? onClose : undefined}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-surface border border-outline-variant/30 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header (only for first steps) */}
                {['type', 'actions', 'upload', 'music', 'review'].includes(state.step) && (
                    <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            {['type', 'actions', 'upload', 'music', 'review'].map((s, idx) => (
                                <div 
                                    key={s} 
                                    className={`h-1 rounded-full transition-all duration-500 ${
                                        state.step === s ? 'w-8 bg-tertiary' : idx < ['type', 'actions', 'upload', 'music', 'review'].indexOf(state.step) ? 'w-4 bg-tertiary/40' : 'w-4 bg-surface-container-highest'
                                    }`}
                                ></div>
                            ))}
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>
                )}

                <div className="p-8">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
}
