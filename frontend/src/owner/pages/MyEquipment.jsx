import { useEffect, useState } from "react";
import OwnerLayout from "../components/OwnerLayout";
import { getEquipment, addEquipment, deleteEquipment } from "../api/equipmentApi";

function MyEquipment({ user, onLogout }) {
  const ownerId = "owner123";

  const [list, setList] = useState([]);

  // form state
  const [name, setName] = useState("");
  const [totalQty, setTotalQty] = useState("");
  const [availableQty, setAvailableQty] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [deposit, setDeposit] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("Good");
  const [description, setDescription] = useState("");

  //  fetch equipment
  const fetchData = async () => {
    try {
      const res = await getEquipment(ownerId);
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();

    window.addEventListener("dataUpdated", fetchData);

    return () => {
      window.removeEventListener("dataUpdated", fetchData);
    };
  }, []);

  // ADD EQUIPMENT (FIXED )
  const handleAdd = async () => {
    try {
      await addEquipment({
        name,
        totalQuantity: Number(totalQty),
        availableQuantity: Number(availableQty),
        pricePerHour: Number(pricePerHour),
        pricePerDay: Number(pricePerDay),
        deposit: Number(deposit),
        location,
        condition,
        description,
        ownerId,
      });

      // clear form
      setName("");
      setTotalQty("");
      setAvailableQty("");
      setPricePerHour("");
      setPricePerDay("");
      setDeposit("");
      setLocation("");
      setDescription("");

      // refresh
      window.dispatchEvent(new Event("dataUpdated"));

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert("Error adding equipment");
    }
  };

  //  DELETE
  const handleDelete = async (id) => {
    await deleteEquipment(id);
    window.dispatchEvent(new Event("dataUpdated"));
  };

  return (
    <OwnerLayout user={user} onLogout={onLogout}>
      <h2>My Equipment</h2>

      {/* 🔹 FORM */}
      <div className="form">

        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Total Qty" value={totalQty} onChange={(e) => setTotalQty(e.target.value)} />
        <input placeholder="Available Qty" value={availableQty} onChange={(e) => setAvailableQty(e.target.value)} />
        <input placeholder="₹/hour" value={pricePerHour} onChange={(e) => setPricePerHour(e.target.value)} />
        <input placeholder="₹/day" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} />
        <input placeholder="Deposit" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
        <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option>Good</option>
          <option>Average</option>
          <option>Excellent</option>
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleAdd}>Add</button>
      </div>

      {/* 🔹 LIST */}
      <div className="list">
        {list.map((item) => (
          <div key={item._id} className="card">
            <h3>{item.name}</h3>
            <p>Total: {item.totalQuantity}</p>
            <p>Available: {item.availableQuantity}</p>
            <p>₹{item.pricePerHour}/hr | ₹{item.pricePerDay}/day</p>
            <p>Deposit: ₹{item.deposit}</p>
            <p>{item.location}</p>
            <p>{item.condition}</p>
            <p>{item.description}</p>

            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>

    </OwnerLayout>
  );
}

export default MyEquipment;
