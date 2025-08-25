import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  large?: boolean;
  to: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  excerpt,
  category,
  author,
  date,
  large = false,
  to
}) => {
  return (
    <Link to={to}>
      <Card className={`bg-gray-900 border-red-600 border-2 hover:scale-105 transition-transform duration-300 ${large ? 'md:col-span-2' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="destructive" className="bg-red-600 text-white">
              {category}
            </Badge>
            <span className="text-sm text-gray-400">{date}</span>
          </div>
          <h3 className={`font-bold text-white ${large ? 'text-2xl' : 'text-lg'} leading-tight`}>
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-sm mb-3">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-yellow-400 font-medium">{author}</span>
            <span className="text-xs text-gray-500">Read more →</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
