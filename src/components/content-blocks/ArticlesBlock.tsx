import React from 'react';
import ArticleCard from "@/components/ArticleCard";

export default function ArticlesBlock() {
  const articles = [
    { title: "Episode 1 — Understanding Graves' disease", excerpt: "Stories from Black women living with Graves' disease, practical care tips, and what to expect.", category: "Featured", author: "Health Team", date: "Aug 8", large: true },
    { title: "Sleep and Thyroid: Finding a Rhythm", excerpt: "Small shifts for better rest when living with Graves' disease.", category: "Health", author: "Dr. R.", date: "Aug 8" },
    { title: "Community Support: How to Ask for Help", excerpt: "Practical templates and conversation starters for Black women.", category: "Support", author: "Peer Team", date: "Jul 21" }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((a, idx) => (
          <ArticleCard key={idx} title={a.title} excerpt={a.excerpt} category={a.category} author={a.author} date={a.date} large={a.large} to={`/article/${idx}`} />
        ))}
      </div>
    </div>
  );
}