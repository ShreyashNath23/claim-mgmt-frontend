import React, { useState } from "react";
import axios from "axios";
// const url = "http://localhost:3000";

const Policyholder = () => {
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState({
    ply_hld_name: "",
    email: "",
    ply_name: "",
    ply_amt: "",
  });
  const [policyData, setPolicyData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (type) => {
    try {
      let response;
      if (type === "add") {
        response = await axios.post(
          "http://localhost:3000/policyholder",
          formData
        );
      } else if (type === "update") {
        response = await axios.put(
          "http://localhost:3000/policyholder/update",
          formData
        );
      } else if (type === "delete") {
        response = await axios.delete(
          "http://localhost:3000/policyholder/delete",
          { 
            data: formData, // Using data propert to `data` send data property
          }
        );
      } else if (type === "view") {
        response = await axios.get(
          "http://localhost:3000/policyholder",
          formData
        );
        setPolicyData(response.data);
        return;
      }
      alert("Operation successful");
      setFormType(null);
    } catch (err) {
      alert("Error: " + err.response.data);
    }
  };

  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Policy Holder</h1>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setFormType("add")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Policy Holder
          </button>
          <button
            onClick={() => setFormType("view")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            View Policy Holder
          </button>
          <button
            onClick={() => setFormType("update")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Update Policy Holder
          </button>
          <button
            onClick={() => setFormType("delete")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete Policy Holder
          </button>
        </div>
      </div>

      {formType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 capitalize">
              {formType} Policy Holder
            </h2>

            {formType === "add" && (
              <>
                <input
                  type="text"
                  name="ply_hld_name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your eamil"
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="ply_name"
                  placeholder="Enter the policy you want"
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="ply_amt"
                  placeholder="Enter the amount you want"
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                  required
                />
              </>
            )}

            {formType === "update" && (
              <>
                <input
                  type="text"
                  name="ply_hld_name"
                  placeholder="Enter your updated name"
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your updated eamil"
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="ply_name"
                  placeholder="Enter the updated policy you want"
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="ply_amt"
                  placeholder="Enter the updated amount you want"
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                  required
                />
              </>
            )}

            {formType === "delete" && (
              <>
                <input
                  type="text"
                  name="ply_name"
                  placeholder="Policy Name"
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                  required
                />
              </>
            )}

            {formType === "view" && (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded"
                  required
                />
                {policyData && (
                  <pre className="text-left text-sm bg-gray-100 p-2 rounded">
                    {JSON.stringify(policyData, null, 2)}
                  </pre>
                )}
              </>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleSubmit(formType)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                onClick={() => setFormType(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Policyholder;
