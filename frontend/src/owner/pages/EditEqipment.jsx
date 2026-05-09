import { useParams, useNavigate } from "react-router-dom";
import OwnerSidebar from "../components/OwnerSidebar";
import OwnerNavbar from "../components/OwnerNavbar";
import EquipmentForm from "../components/EquipmentForm";
import { useState, useEffect } from "react";
import API from "../../utils/api";

export default function EditEquipment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const { data } = await API.get(`/equipment/${id}`);
        setEquipment(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load equipment details.");
      }
    };

    fetchEquipment();
  }, [id]);

  const handleUpdate = async (data) => {
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

      await API.put(`/equipment/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setSuccess("Equipment successfully updated!");
      setTimeout(() => navigate("/owner/manage"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update equipment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!equipment && !error) {
    return (
      <div className="flex bg-gray-50/50 min-h-screen">
        <OwnerSidebar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50/50 min-h-screen">
      <OwnerSidebar />

      <div className="flex-1">
        <OwnerNavbar />

        <div className="p-8 max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Edit Equipment</h1>
            <p className="text-gray-500 mt-1">Update the details or pricing of your listed equipment.</p>
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

          {equipment && (
            <EquipmentForm
              initialData={equipment}
              onSubmit={handleUpdate}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}