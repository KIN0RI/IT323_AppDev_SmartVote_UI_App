import { useState } from 'react';

const initialProfile = {
  name:      'Student User',
  studentId: '2024-00001',
  email:     'student@gmail.com',
  course:    'BS Information Technology',
  year:      '3rd Year',
};

function useProfile() {
  const [profile,   setProfile]   = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [form,      setForm]      = useState({ ...initialProfile });
  const [saved,     setSaved]     = useState(false);


  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setProfile({ ...form });
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleEdit = () => {
    setForm({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm({ ...profile });
    setIsEditing(false);
  };

  return {
    profile,
    form,
    isEditing,
    saved,
    handleChange,
    handleSave,
    handleEdit,
    handleCancel,
  };
}

export default useProfile;
