'use client'

import React, { useState } from 'react';
import { Ticket, Copy, Check, Info, Sparkles } from 'lucide-react';
import { Paragraph } from './ui/paragraph';
import { Heading } from './ui/heading';

interface PromoCardProps {
    code: string;
    discountBadge: string;
    title: string;
    description: string;
    rules: string[];
    maxDiscount?: string;
    isPremium?: boolean;
}

const PromoCard: React.FC<PromoCardProps> = ({
    code,
    discountBadge,
    title,
    description,
    rules,
    maxDiscount,
    isPremium = false
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={`relative flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 bg-white dark:bg-zinc-900 ${isPremium
                ? 'border-orange-500/50 shadow-lg shadow-emerald-500/5 hover:border-lime/90'
                : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}>
            {/* Decorative Ticket Side Cuts */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-zinc-50 dark:bg-zinc-950 border-r border-orange-500 dark:border-zinc-800 transform -translate-y-1/2 hidden md:block" />
            <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-zinc-50 dark:bg-zinc-950 border-l border-orange-500 dark:border-zinc-800 transform -translate-y-1/2 hidden md:block" />

            <div>
                {/* Header Ribbon / Badges */}
                <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${isPremium ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
                            <Ticket className="w-4 h-4" />
                        </div>
                        <span className="font-mono font-bold tracking-wider text-zinc-800 dark:text-zinc-200 text-sm md:text-base">
                            {code}
                        </span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${isPremium
                            ? 'bg-orange-500/10 text-orange-500 dark:text-orange-400'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                        }`}>
                        {isPremium }
                        {discountBadge}
                    </span>
                </div>

                {/* Content Section */}
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1 leading-snug">
                    {title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Dynamic Bullet Points */}
                <ul className="space-y-2 mb-6">
                    {rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] md:text-xs text-zinc-600 dark:text-zinc-400">
                            <span className="mt-0.5 text-emerald-500 font-bold select-none">•</span>
                            <span>{rule}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer Call to Action Area */}
            <div className="pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {maxDiscount && (
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                        <Info className="w-3.5 h-3.5" />
                        <span>Max Cap: {maxDiscount}</span>
                    </div>
                )}
                <button
                    onClick={handleCopy}
                    className={`w-full sm:w-auto ml-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all active:scale-98 ${copied
                            ? 'bg-orange-50 dark:bg-emerald-950/30 border-orange-200 dark:border-emerald-800 text-black'
                            : 'bg-orange-400 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-lime dark:hover:bg-zinc-200 border-transparent shadow-sm'
                        }`}
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default function PromoGrid() {
    const offers = [
        {
            code: 'DSNBEAUTY',
            discountBadge: '100% OFF',
            title: 'Daily First-5 Beauty Deal',
            description: 'Exclusive daily offer tailored specifically for early-bird bookings on health & beauty packages.',
            rules: [
                'First 5 eligible female customers get 100% OFF up to NPR 500.',
                'Must book exclusively via Doorsteps Nepal App.',
                ' Kathmandu Valley service region limits apply.',
                'Subject to provider schedule and material availability.'
            ],
            maxDiscount: 'NPR 500',
            isPremium: true
        },
        {
            code: 'DSNFIRST',
            discountBadge: '5% OFF',
            title: 'Welcome First Booking Promo',
            description: 'Kickstart your service experience with standard flat reductions applied across all basic tiers.',
            rules: [
                'Get 5% OFF your first service request order.',
                'Applicable for first-time profile creation users only.',
                'One-time single redemption constraint per identity.'
            ],
            maxDiscount: 'NPR 2,000',
            isPremium: false
        }
    ];

    return (
        <section className="relative z-10 mt-40 w-full py-8 px-4 max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <Heading
                    as="h2"
                    margin="mb-4"
                >
                    Promo Codes & Saving Opportunities
                </Heading>

                <Paragraph
                    fontSize="text-lg"
                    className="max-w-2xl mx-auto"
                >
                    Copy your preferred offer voucher string to redeem instant discounts directly during standard booking checkout pipelines.
                </Paragraph>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                {offers.map((offer, idx) => (
                    <PromoCard key={idx} {...offer} />
                ))}
            </div>
        </section>
    );
}
