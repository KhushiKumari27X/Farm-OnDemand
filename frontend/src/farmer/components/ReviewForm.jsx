import { useState } from "react";
import { FiStar, FiMessageSquare } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../../utils/api";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a rating");
    
    setIsSubmitting(true);
    try {
      await API.post("/feedback", { rating, review });
      setIsSuccess(true);
      toast.success("Feedback submitted successfully!");
      setTimeout(() => {
        setIsSuccess(false);
        setRating(0);
        setReview("");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-xl mx-auto mt-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center text-green-600 text-xl shadow-sm">
          <FiMessageSquare />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Give Feedback</h2>
          <p className="text-sm text-gray-500">Rate your recent equipment rental experience.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Overall Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-3xl transition-transform ${
                  star <= (hoveredRating || rating) 
                    ? "text-yellow-400 drop-shadow-sm scale-110" 
                    : "text-gray-200 hover:scale-110"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Detailed Review</label>
          <textarea
            placeholder="Tell us about the equipment condition, owner communication, and overall experience..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all resize-none h-32"
          />
        </div>

        {isSuccess ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center font-bold border border-green-100">
            Thank you for your feedback!
          </div>
        ) : (
          <button 
            type="submit"
            disabled={isSubmitting || rating === 0}
            className={`w-full text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all ${
              isSubmitting || rating === 0
                ? "bg-gray-300 shadow-none cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-emerald-500 hover:shadow-green-200 hover:-translate-y-1"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;