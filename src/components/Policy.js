import React, { useState } from "react";
import axios from "axios";

const Policy = () => {
  const [action, setAction] = useState(null);
  const [policyName, setPolicyName] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const [policies, setPolicies] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = (type) => {
    setAction(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setAction(null);
    setPolicyName("");
    setPolicyDescription("");
  };

  const handleAddPolicy = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/policy", {
        ply_name: policyName,
        ply_dsc: policyDescription,
      });
      setPolicies(response.data);
      setMessage("Policy added successfully!");
      closeModal();
    } catch (error) {
      console.error("Error Response:", error.response); // Debugging log
      setMessage(
        "Error adding policy: " + (error.response?.data || error.message)
      );
    }
  };

  const handleViewPolicy = async () => {
    try {
      const response = await axios.get("http://localhost:3000/policy");
      setPolicies(response.data);
      setAction("view");
      setShowModal(true);
    } catch (error) {
      setMessage("Error retrieving policies: " + error.response.data);
    }
  };

  const handleUpdatePolicy = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:3000/policy/update", {
        ply_name: policyName,
        ply_dsc: policyDescription,
      });
      setPolicies(response.data);
      setMessage("Policy updated successfully!");
      closeModal();
    } catch (error) {
      setMessage("Error updating policy: " + error.response.data);
    }
  };

  const handleDeletePolicy = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        "http://localhost:3000/policy/delete",
        {
          data: { ply_name: policyName },
        }
      );
      setPolicies(response.data);
      setMessage("Policy deleted successfully!");
      closeModal();
    } catch (error) {
      setMessage("Error deleting policy: " + error.response.data);
    }
  };

  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Policy</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => openModal("add")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Policy
          </button>
          <button
            onClick={handleViewPolicy}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            View Policy
          </button>
          <button
            onClick={() => openModal("update")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Update Policy
          </button>
          <button
            onClick={() => openModal("delete")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete Policy
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4 capitalize">
                {action} Policy
              </h2>
              {action !== "view" && (
                <form
                  onSubmit={
                    action === "add"
                      ? handleAddPolicy
                      : action === "update"
                      ? handleUpdatePolicy
                      : handleDeletePolicy
                  }
                >
                  <input
                    type="text"
                    placeholder="Policy Name"
                    value={policyName}
                    onChange={(e) => setPolicyName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    required
                  />
                  {(action === "add" || action === "update") && (
                    <textarea
                      placeholder="Policy Description"
                      value={policyDescription}
                      onChange={(e) => setPolicyDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2"
                      required
                    />
                  )}
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
              {action === "view" && policies.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2">Policy Name</th>
                        <th className="px-4 py-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.map((policy, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{policy.ply_name}</td>
                          <td className="px-4 py-2">{policy.ply_dsc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {message && <p className="mt-4 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default Policy;
