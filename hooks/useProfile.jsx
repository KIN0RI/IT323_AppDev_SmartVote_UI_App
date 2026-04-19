import { useEffect, useState } from 'react';
import api from '../api';

function useProfile() {
  const [profile,   setProfile]   = useState({
    full_name: '', student_id: '', email: '', course: '', year_level: '',
  });
  const [form,      setForm]      = useState({ ...profile });
  const [isEditing, setIsEditing] = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    api.get('/auth/profile/')
      .then((res) => {
        setProfile(res.data);
        setForm(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    try {
      const res = await api.put('/auth/profile/', {
        full_name:  form.full_name,
        email:      form.email,
        course:     form.course,
        year_level: form.year_level,
      });
      setProfile(res.data);
      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Failed to update profile.');
    }
  };

  const handleEdit   = () => { setForm({ ...profile }); setIsEditing(true); };
  const handleCancel = () => { setForm({ ...profile }); setIsEditing(false); };

  // Map to keys used by profile.jsx
  const mappedProfile = {
    name:      profile.full_name,
    studentId: profile.student_id,
    email:     profile.email,
    course:    profile.course,
    year:      profile.year_level,
    has_voted: profile.has_voted,
  };

  const mappedForm = {
    name:      form.full_name,
    studentId: form.student_id,
    email:     form.email,
    course:    form.course,
    year:      form.year_level,
  };

  return {
    profile: mappedProfile,
    form: mappedForm,
    isEditing, saved, loading,
    handleChange, handleSave, handleEdit, handleCancel,
  };
}

export default useProfile;