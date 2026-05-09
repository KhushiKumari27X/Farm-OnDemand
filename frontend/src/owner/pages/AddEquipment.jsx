import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerSidebar from "../components/OwnerSidebar";
import OwnerNavbar from "../components/OwnerNavbar";
import EquipmentForm from "../components/EquipmentForm";
import API from "../../utils/api";

export default function AddEquipment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("pricePerDay", data.pricePerDay);
      formData.append("location", data.location);
      formData.append("availableFrom", data.availableFrom);
      formData.append("availableTo", data.availableTo);
      formData.append("description", data.description);
      formData.append("stock", data.stock);
      
      if (data.image) {
        formData.append("image", data.image);
      }

      await API.post("/equipment", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setSuccess("Equipment successfully added!");
      setTimeout(() => navigate("/owner/manage"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add equipment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50/50">
      <OwnerSidebar />
      <div className="flex-1 min-h-screen">
        <OwnerNavbar />

        <div className="p-8 max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Add New Equipment</h1>
            <p className="text-gray-500 mt-1">List your machinery on the platform for farmers to rent.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100">
              {success} Redirecting...
            </div>
          )}

          <EquipmentForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
}