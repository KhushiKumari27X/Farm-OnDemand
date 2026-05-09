import FarmerSidebar from "../components/FarmerSidebar";
import FarmerNavbar from "../components/FarmerNavbar";
import ReviewForm from "../components/ReviewForm";

const Feedback = () => {
  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <FarmerSidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <FarmerNavbar />

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-2">
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Platform Feedback</h1>
              <p className="text-gray-500 mt-2">Help us improve by rating your equipment and overall experience.</p>
            </div>

            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;