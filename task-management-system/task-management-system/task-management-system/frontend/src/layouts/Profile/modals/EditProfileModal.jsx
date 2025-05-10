import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditProfileModal({ isOpen, onClose, profileData, fetchProfile }) {
  const [formData, setFormData] = useState({ ...profileData });
  const [imagePreview, setImagePreview] = useState(profileData.avatar);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to update the profile
      await axios.put('/api/profile', formData);
      toast.success('Profile updated!');
      fetchProfile(); // Refetch profile data after updating
      onClose(); // Close modal after successful update
    } catch (err) {
      toast.error('Error updating profile.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Edit Profile</h3>
        <form onSubmit={handleSubmit}>
          <input 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            placeholder="First Name"
          />
          <input 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            placeholder="Last Name"
          />
          <input 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email"
          />
          <input 
            name="mobile" 
            value={formData.mobile} 
            onChange={handleChange} 
            placeholder="Mobile"
          />
          <input 
            name="dob" 
            type="date" 
            value={formData.dob} 
            onChange={handleChange} 
          />
          <input 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            placeholder="Address"
          />
          <input 
            name="avatar" 
            type="file" 
            accept="image/*" 
            onChange={handleChange} 
          />
          {imagePreview && <img src={imagePreview} alt="Preview" width={80} />}
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
