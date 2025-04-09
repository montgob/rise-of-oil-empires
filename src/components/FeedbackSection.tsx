
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { MessageSquare, Star, StarIcon } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  comment: string;
  section: string;
  created_at: string;
}

interface Rating {
  id: string;
  rating: number;
  section: string;
  created_at: string;
}

interface FeedbackSectionProps {
  section: string;
  title?: string;
}

export default function FeedbackSection({ section, title = "Visitor Feedback" }: FeedbackSectionProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Fetch comments for this section
  const { data: comments, refetch: refetchComments } = useQuery({
    queryKey: ['comments', section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('visitor_comments')
        .select('*')
        .eq('section', section)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Comment[];
    },
  });

  // Fetch average rating
  const { data: ratingData, refetch: refetchRatings } = useQuery({
    queryKey: ['ratings', section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('visitor_ratings')
        .select('rating')
        .eq('section', section);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const total = data.reduce((sum, curr: Rating) => sum + curr.rating, 0);
        return {
          average: (total / data.length).toFixed(1),
          count: data.length
        };
      }
      
      return { average: "0.0", count: 0 };
    },
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('visitor_comments')
        .insert([
          { name, comment, section }
        ]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Comment Added",
        description: "Thank you for your feedback!",
      });
      setName("");
      setComment("");
      refetchComments();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add comment: " + error.message,
        variant: "destructive",
      });
    }
  });

  // Add rating mutation
  const addRatingMutation = useMutation({
    mutationFn: async (rating: number) => {
      const { error } = await supabase
        .from('visitor_ratings')
        .insert([
          { rating, section }
        ]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Rating Submitted",
        description: "Thank you for rating this section!",
      });
      refetchRatings();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit rating: " + error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both your name and comment",
        variant: "destructive",
      });
      return;
    }
    addCommentMutation.mutate();
  };

  const handleRating = (value: number) => {
    setRating(value);
    addRatingMutation.mutate(value);
  };

  return (
    <Card className="bg-slate-800/50 border-amber-900/30 text-slate-100">
      <CardHeader>
        <CardTitle className="text-amber-400">{title}</CardTitle>
        <CardDescription className="text-slate-300">
          Share your thoughts or rate this section
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-amber-300">Rate this section</h4>
            {ratingData && (
              <span className="text-sm flex items-center text-amber-200">
                <StarIcon className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                {ratingData.average} ({ratingData.count} {ratingData.count === 1 ? 'rating' : 'ratings'})
              </span>
            )}
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className="p-1 focus:outline-none"
                onClick={() => handleRating(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star 
                  className={`h-6 w-6 ${
                    (hoveredRating ? value <= hoveredRating : value <= rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-400"
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-amber-300" htmlFor="name">Your Name</Label>
            <Input
              id="name"
              className="bg-slate-700/70 border-amber-900/30 text-slate-100 placeholder:text-slate-400"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-amber-300" htmlFor="comment">Your Comment</Label>
            <Textarea
              id="comment"
              className="bg-slate-700/70 border-amber-900/30 text-slate-100 placeholder:text-slate-400 min-h-24"
              placeholder="Share your thoughts on this section..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            className="bg-amber-600 hover:bg-amber-700 text-white"
            disabled={addCommentMutation.isPending}
          >
            {addCommentMutation.isPending ? "Submitting..." : "Submit Comment"}
          </Button>
        </form>

        {/* Display Comments */}
        {comments && comments.length > 0 && (
          <div className="mt-8">
            <h4 className="font-medium text-amber-300 flex items-center gap-2 mb-4">
              <MessageSquare className="h-4 w-4" /> Visitor Comments
            </h4>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-slate-700/30 rounded-lg p-4 border border-amber-900/20">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-amber-200">{comment.name}</h5>
                    <span className="text-xs text-slate-400">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-300">{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
