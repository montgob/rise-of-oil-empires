
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageSquare,
  Star,
  ThumbsUp,
  User,
} from "lucide-react";

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

export default function FeedbackSection({
  section,
  title = "Feedback",
}: FeedbackSectionProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get average rating for this section
  const { data: averageRating } = useQuery({
    queryKey: ["ratings", section, "average"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("visitor_ratings")
        .select("*")
        .eq("section", section);

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

  // Get comments for this section
  const { data: comments } = useQuery({
    queryKey: ["comments", section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("visitor_comments")
        .select("*")
        .eq("section", section)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return data as Comment[];
    },
  });

  // Submit comment mutation
  const submitCommentMutation = useMutation({
    mutationFn: async () => {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("visitor_comments")
        .insert([{ name, comment, section }]);
        
      if (error) throw error;
      
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "Your comment has been submitted.",
      });
      
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["comments", section] });
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit your comment. Please try again.",
        variant: "destructive",
      });
      
      console.error("Error submitting comment:", error);
      setIsSubmitting(false);
    },
  });

  // Submit rating mutation
  const submitRatingMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("visitor_ratings")
        .insert([{ rating, section }]);
        
      if (error) throw error;
      
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Rating submitted",
        description: "Thank you for your feedback!",
      });
      
      queryClient.invalidateQueries({ queryKey: ["ratings", section, "average"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit your rating. Please try again.",
        variant: "destructive",
      });
      
      console.error("Error submitting rating:", error);
    },
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user && !name) {
      toast({
        title: "Name required",
        description: "Please enter your name or sign in to submit a comment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please enter a comment.",
        variant: "destructive",
      });
      return;
    }
    
    submitCommentMutation.mutate();
  };

  const handleRatingSubmit = (newRating: number) => {
    setRating(newRating);
    submitRatingMutation.mutate();
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 cursor-pointer transition-colors ${
          i < rating ? "fill-amber-400 text-amber-400" : "text-slate-500"
        }`}
        onClick={() => handleRatingSubmit(i + 1)}
      />
    ));
  };

  return (
    <Card className="bg-slate-800/50 border-amber-900/30 text-slate-100">
      <CardHeader>
        <CardTitle className="text-amber-400 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" /> {title}
        </CardTitle>
        <CardDescription className="text-slate-300">
          Share your thoughts or rate this section
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-slate-300">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-amber-300">
                {averageRating?.average || "0.0"}
              </span>
              <span className="text-sm text-slate-400">
                ({averageRating?.count || 0} ratings)
              </span>
            </div>
            <div className="flex gap-1">{renderStars()}</div>
          </div>
          <div className="border-t border-amber-900/20 pt-4">
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              {!user && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-200">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-slate-700/50 border-amber-900/20 text-slate-100"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="comment" className="text-slate-200">Your Comment</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your feedback..."
                  className="min-h-[100px] bg-slate-700/50 border-amber-900/20 text-slate-100"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-600 hover:bg-amber-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Comment"}
              </Button>
            </form>
          </div>
        </div>

        {comments && comments.length > 0 && (
          <div className="space-y-4 pt-2">
            <h3 className="text-slate-200 font-medium">Recent Comments</h3>
            <div className="space-y-3">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-amber-900/20 rounded-md p-3 bg-slate-700/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-amber-300" />
                      <span className="font-medium text-amber-200">
                        {comment.name}
                      </span>
                    </div>
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
