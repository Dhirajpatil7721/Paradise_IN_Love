import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiSave,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLogOut,
  FiPlus,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [userdata, setUserdata] = useState({ name: "", email: "", mobile: "", avatar: "" });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [currentAddress, setCurrentAddress] = useState({
    userId: "",
    mobile: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editUser, setEditUser] = useState({ name: "", email: "", mobile: "" });

  // Validation states
  const [nameValid, setNameValid] = useState(true);
  const [userMobileValid, setUserMobileValid] = useState(true);
  const [addressMobileValid, setAddressMobileValid] = useState(true);

  const API_URL = import.meta.env.VITE_RENDER;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const addressResponse = await fetch(`${API_URL}/address/get`, {
          method: "GET",
          credentials: "include",
        });
        const addressData = await addressResponse.json();

        if (addressResponse.ok && addressData.data && addressData.data.length > 0) {
          setAddresses(addressData.data);
          setSelectedAddressIndex(0);
          setCurrentAddress(addressData.data[0]);
          await fetchUser(addressData.data[0].userId);
        } else {
          setAddresses([]);
          setCurrentAddress({
            userId: "",
            mobile: "",
            address_line: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
          });
          setEditMode(true);
          setIsAdding(true);

          try {
            const userResponse = await fetch(`${API_URL}/user/profile`, {
              method: "GET",
              credentials: "include",
            });
            const userData = await userResponse.json();
            if (userResponse.ok && userData.data) {
              setUserdata(userData.data);
              setEditUser({
                name: userData.data.name || "",
                email: userData.data.email || "",
                mobile: userData.data.mobile || "",
              });
            } else {
              console.log("No existing user data found, starting fresh.");
              setEditMode(true);
            }
          } catch (userErr) {
            console.error("Initial user fetch error:", userErr);
            setEditMode(true);
          }
        }
      } catch (err) {
        console.error("Initial data fetch error:", err);
        setEditMode(true);
        setIsAdding(true);
        setCurrentAddress({
          userId: "", mobile: "", address_line: "", city: "", state: "", pincode: "", country: "",
        });
        setUserdata({ name: "", email: "", mobile: "", avatar: "" });
        setEditUser({ name: "", email: "", mobile: "" });
      }
    };

    fetchInitialData();
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/user/getall`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUserdata(data.data);
      setEditUser({
        name: data.data.name || "",
        email: data.data.email || "",
        mobile: data.data.mobile || "",
      });
    } catch (error) {
      console.error("User fetch error:", error);
      toast.error("Failed to load user data.");
      setUserdata({ name: "", email: "", mobile: "", avatar: "" });
      setEditUser({ name: "", email: "", mobile: "" });
    }
  };

  const handleSelectAddress = (idx) => {
    setSelectedAddressIndex(idx);
    setCurrentAddress(addresses[idx]);

    if (addresses[idx]?.userId !== userdata?.id) {
      fetchUser(addresses[idx].userId);
    }
    setEditMode(false);
    setIsAdding(false);
    setSelectedFile(null);
  };


  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    // Validate address mobile
    if (name === "mobile") {
      const isValid = /^\d{10}$/.test(value);
      setAddressMobileValid(isValid);
    }

    setCurrentAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;

    // Validate user fields
    if (name === "name") {
      const isValid = /^[a-zA-Z\s]*$/.test(value);
      setNameValid(isValid);
    } else if (name === "mobile") {
      const isValid = /^\d{0,10}$/.test(value);
      setUserMobileValid(isValid);
    }

    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Reset validation states
    setNameValid(true);
    setUserMobileValid(true);
    setAddressMobileValid(true);

    // Name validation
    if (!/^[a-zA-Z\s]+$/.test(editUser.name)) {
      toast.error("Name should contain only letters and spaces");
      setNameValid(false);
      return;
    }

    // User mobile validation
    if (!/^\d{10}$/.test(editUser.mobile)) {
      toast.error("User mobile number should be exactly 10 digits");
      setUserMobileValid(false);
      return;
    }

    // Address mobile validation
    if (!/^\d{10}$/.test(currentAddress.mobile)) {
      toast.error("Address mobile number should be exactly 10 digits");
      setAddressMobileValid(false);
      return;
    }

    // Basic validation
    if (!editUser.name || !editUser.email || !editUser.mobile) {
      toast.error("Please fill in all user details (Name, Email, Mobile).");
      return;
    }
    if (!currentAddress.address_line || !currentAddress.city || !currentAddress.state || !currentAddress.pincode || !currentAddress.country) {
      toast.error("Please fill in all address details.");
      return;
    }

    try {
      // Update user data
      const userUpdateResponse = await fetch(
        `${API_URL}/user/update-user`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: userdata?._id || userdata?.id,
            name: editUser.name,
            email: editUser.email,
            mobile: editUser.mobile,
          }),
        }
      );
      const userUpdateResult = await userUpdateResponse.json();
      if (!userUpdateResponse.ok || !userUpdateResult.success) {
        toast.error(userUpdateResult.message || "Failed to update user info");
      } else {
        toast.success("User info updated successfully");
        setUserdata((prev) => ({
          ...prev,
          name: editUser.name,
          email: editUser.email,
          mobile: editUser.mobile,
        }));
      }
    } catch (error) {
      toast.error("Error updating user info: " + error.message);
    }
    const addressPayload = {
      ...currentAddress,
      userId: currentAddress.userId || userdata?._id || userdata?.id,
    };


    if (isAdding) {
      try {
        const response = await fetch(`${API_URL}/address/create`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressPayload),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          toast.success("Address added successfully");
          const newAddresses = [...addresses, result.data];
          setAddresses(newAddresses);
          setSelectedAddressIndex(newAddresses.length - 1);
          setCurrentAddress(result.data);
          setIsAdding(false);
          setEditMode(false);
        } else {
          toast.error(result.message || "Failed to add address");
        }
      } catch (error) {
        toast.error("Error adding address: " + error.message);
      }
    } else {
      try {
        const response = await fetch(`${API_URL}/address/update`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressPayload),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          toast.success("Address updated successfully");
          const updated = [...addresses];
          updated[selectedAddressIndex] = currentAddress;
          setAddresses(updated);
          setEditMode(false);
        } else {
          toast.error(result.message || "Failed to update address");
        }
      } catch (error) {
        toast.error("Error updating address: " + error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Logout successful");
        navigate("/signin");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Logout error: " + error.message);
    }
  };

  const handleAddNew = () => {
    const emptyAddress = {
      userId: userdata?._id || userdata?.id || "",
      mobile: userdata?.mobile || "",
      address_line: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    };
    setCurrentAddress(emptyAddress);
    setEditMode(true);
    setIsAdding(true);
    setSelectedFile(null);
  };

  const handleDeleteAddress = async (id, index) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      const res = await fetch(`${API_URL}/address/disable`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Address deleted successfully");
        const updated = addresses.filter((_, i) => i !== index);
        setAddresses(updated);
        if (updated.length > 0) {
          setSelectedAddressIndex(0);
          setCurrentAddress(updated[0]);
          if (userdata?.id !== updated[0].userId) fetchUser(updated[0].userId);
        } else {
          setCurrentAddress({
            userId: userdata?._id || userdata?.id || "",
            mobile: userdata?.mobile || "",
            address_line: "", city: "", state: "", pincode: "", country: "",
          });
          setEditMode(true);
          setIsAdding(true);
        }
      } else {
        toast.error(result.message || "Failed to delete address");
      }
    } catch (error) {
      toast.error("Delete error: " + error.message);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) return toast.error("No file selected");

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await fetch(`${API_URL}/user/upload-avatar`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();
      if (response.ok && result.success) {
        toast.success("Profile photo updated");
        setUserdata((prev) => ({ ...prev, avatar: result.data.avatar }));
        setSelectedFile(null);
      } else {
        toast.error(result.message || "Failed to upload avatar");
      }
    } catch (err) {
      toast.error("Upload error: " + err.message);
    }
  };

  return (
    <div className="max-w-full sm:max-w-4xl mx-auto mt-20 mb-10 p-4 sm:p-8 rounded-xl shadow-lg border bg-white space-y-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
        <div className="h-24 w-24 rounded-full bg-pink-600 text-white text-5xl flex items-center justify-center font-bold overflow-hidden">
          {userdata.avatar ? (
            <img src={userdata.avatar} alt={userdata.name} className="object-cover w-full h-full" />
          ) : (
            userdata.name ? userdata.name.charAt(0).toUpperCase() : <FiUser />
          )}
        </div>

        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl font-semibold">{editMode ? editUser.name : userdata.name || "New User"}</h2>
          <p className="text-gray-600">{editMode ? editUser.email : userdata.email || "No Email"}</p>
          <p className="text-green-600 font-medium">{userdata.status || "Status Not Set"}</p>
        </div>
      </div>

      {editMode && (
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={handlePhotoUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiUpload /> Update Photo
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-pink-600">My Profile</h1>
        <div className="flex gap-3 flex-wrap">
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-pink-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <FiEdit /> Edit
            </button>
          )}
          {!editMode && (
            <button
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <FiPlus /> Add Address
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* User Info Editable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="flex items-center text-sm text-gray-700 mb-1">
            <FiUser className="mr-2" /> Full Name
          </label>
          <input
            type="text"
            name="name"
            value={editMode ? editUser.name : userdata.name}
            disabled={!editMode && userdata.name !== ""}
            onChange={handleUserChange}
            className={`w-full px-3 py-2 border rounded-lg ${editMode || userdata.name === "" ? "bg-white" : "bg-gray-50"
              } ${!nameValid ? "border-red-500" : ""}`}
          />
          {!nameValid && (
            <p className="text-red-500 text-sm mt-1">
              Name should contain only letters and spaces
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label className="flex items-center text-sm text-gray-700 mb-1">
            <FiMail className="mr-2" /> Email
          </label>
          <input
            type="email"
            name="email"
            value={editMode ? editUser.email : userdata.email}
            disabled={!editMode && userdata.email !== ""}
            onChange={handleUserChange}
            className={`w-full px-3 py-2 border rounded-lg ${editMode || userdata.email === "" ? "bg-white" : "bg-gray-50"
              }`}
          />
        </div>

        <div className="col-span-2">
          <label className="flex items-center text-sm text-gray-700 mb-1">
            <FiPhone className="mr-2" /> Mobile
          </label>
          <input
            type="tel"
            name="mobile"
            value={editMode ? editUser.mobile : userdata.mobile || ""}
            disabled={!editMode && userdata.mobile !== ""}
            onChange={handleUserChange}
            maxLength={10}
            className={`w-full px-3 py-2 border rounded-lg ${editMode || userdata.mobile === "" ? "bg-white" : "bg-gray-50"
              } ${!userMobileValid ? "border-red-500" : ""}`}
          />
          {!userMobileValid && (
            <p className="text-red-500 text-sm mt-1">
              Mobile number should be exactly 10 digits
            </p>
          )}
        </div>

        {/* Address fields */}
        <div className="col-span-2">
          <label className="flex items-center text-sm text-gray-700 mb-1">
            <FiMapPin className="mr-2" /> Address Line
          </label>
          <input
            type="text"
            name="address_line"
            value={currentAddress.address_line || ""}
            disabled={!editMode}
            onChange={handleAddressChange}
            className={`w-full px-3 py-2 border rounded-lg ${editMode ? "bg-white" : "bg-gray-50"
              }`}
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="flex items-center text-sm text-gray-700 mb-1">
            <FiPhone className="mr-2" /> Mobile (for this address)
          </label>
          <input
            type="tel"
            name="mobile"
            value={currentAddress.mobile || ""}
            disabled={!editMode}
            onChange={handleAddressChange}
            maxLength={10}
            className={`w-full px-3 py-2 border rounded-lg ${editMode ? "bg-white" : "bg-gray-50"
              } ${!addressMobileValid ? "border-red-500" : ""}`}
          />
          {!addressMobileValid && (
            <p className="text-red-500 text-sm mt-1">
              Mobile number should be exactly 10 digits
            </p>
          )}
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm text-gray-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            value={currentAddress.city || ""}
            disabled={!editMode}
            onChange={handleAddressChange}
            className={`w-full px-3 py-2 border rounded-lg ${editMode ? "bg-white" : "bg-gray-50"
              }`}
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm text-gray-700 mb-1">State</label>
          <input
            type="text"
            name="state"
            value={currentAddress.state || ""}
            disabled={!editMode}
            onChange={handleAddressChange}
            className={`w-full px-3 py-2 border rounded-lg ${editMode ? "bg-white" : "bg-gray-50"
              }`}
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm text-gray-700 mb-1">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={currentAddress.pincode || ""}
            disabled={!editMode}
            onChange={handleAddressChange}
            className={`w-full px-3 py-2 border rounded-lg ${editMode ? "bg-white" : "bg-gray-50"
              }`}
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-700 mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={currentAddress.country || ""}
            disabled={!editMode}
            onChange={handleAddressChange}
            className={`w-full px-3 py-2 border rounded-lg ${editMode ? "bg-white" : "bg-gray-50"
              }`}
          />
        </div>
      </div>

      {(editMode || addresses.length === 0) && (
        <div className="flex justify-end gap-3">
          <button
            onClick={handleSave}
            className="bg-pink-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <FiSave /> Save
          </button>
          <button
            onClick={() => {
              if (addresses.length > 0) {
                setEditMode(false);
                setIsAdding(false);
                setSelectedFile(null);
                setCurrentAddress(addresses[selectedAddressIndex]);
                setEditUser({
                  name: userdata.name,
                  email: userdata.email,
                  mobile: userdata.mobile || "",
                });
              } else {
                setCurrentAddress({
                  userId: userdata?._id || userdata?.id || "",
                  mobile: userdata?.mobile || "",
                  address_line: "", city: "", state: "", pincode: "", country: "",
                });
                setEditUser({
                  name: userdata.name || "",
                  email: userdata.email || "",
                  mobile: userdata.mobile || "",
                });
                setEditMode(true);
                setIsAdding(true);
                toast.info("Please fill in your profile and address details.");
              }
            }}
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <FiX /> Cancel
          </button>
        </div>
      )}

      {/* Saved Addresses */}
      {addresses.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Saved Addresses</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {addresses.map((addr, idx) => (
              <div
                key={addr._id || idx}
                className={`cursor-pointer border rounded-lg p-4 relative ${idx === selectedAddressIndex
                  ? "border-pink-600 bg-pink-50"
                  : "border-gray-300 hover:bg-gray-100"
                  }`}
              >
                <div onClick={() => handleSelectAddress(idx)}>
                  <p className="font-semibold">{addr.address_line}</p>
                  <p>
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p>{addr.country}</p>
                  <p>Mobile: {addr.mobile}</p>
                </div>
                {!editMode && (
                  <button
                    onClick={() => handleDeleteAddress(addr._id, idx)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {addresses.length === 0 && !isAdding && (
        <p className="text-gray-500 text-center">No addresses found. Click "Add Address" to get started!</p>
      )}
    </div>
  );
}

