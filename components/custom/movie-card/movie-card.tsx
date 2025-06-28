"use client";
import "./movie-card.scss";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Calendar, UndoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  title?: string;
  year?: string;
  genres?: string[];
  poster?: string;
  rating?: number;
  ref?: any;
}

export const MovieCard = ({
  title = "The Dark Knight",
  year = "2008",
  genres = ["Action", "Crime", "Drama"],
  poster = "/placeholder.svg?height=400&width=300",
  rating = 9.0,
  ref = undefined,
}: MovieCardProps) => {
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

  const handleLike = () => {
    setFeedback(feedback === "like" ? null : "like");
  };

  const handleDislike = () => {
    setFeedback(feedback === "dislike" ? null : "dislike");
  };

  return (
    <Card
      className="w-full max-w-sm overflow-hidden transition-all hover:shadow-lg bg-gray-900 border-gray-700 movie-card"
      ref={ref}
    >
      <CardHeader className="p-0">
        <div className="relative bg-gray-800">
          <img
            src={poster || "/placeholder.svg"}
            alt={`${title} poster`}
            className="w-full h-110 object-cover opacity-90"
          />
          <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-semibold">
            {rating}/10
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4 bg-gray-900">
        <div className="space-y-2">
          <h3 className="text-xl font-bold leading-tight text-white">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{year}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {genres.map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="text-xs bg-gray-700 text-gray-200 hover:bg-gray-600"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant={feedback === "like" ? "default" : "outline"}
            size="sm"
            onClick={handleLike}
            className={`flex-1 ${
              feedback === "like"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-800 text-green-400 border-green-600 hover:bg-green-900/50"
            }`}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Like
          </Button>
          <Button
            variant={feedback === "dislike" ? "default" : "outline"}
            size="sm"
            onClick={handleDislike}
            className={`flex-1 ${
              feedback === "dislike"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-800 text-red-400 border-red-600 hover:bg-red-900/50"
            }`}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            Dislike
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
