import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Profile() {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
  });

  const [editing, setEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch saved profile from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setProfile({
          name: snap.data().name || "",
          phone: snap.data().phone || "",
        });
      }
    };

    fetchProfile();
  }, [user]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      let photoURL = user.photoURL;

      // If new image selected → upload to Firebase Storage
      if (imageFile) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, imageFile);
        photoURL = await getDownloadURL(storageRef);
      }

      // Update Firebase Auth (name + photo)
      await updateProfile(auth.currentUser, {
        displayName: profile.name,
        photoURL: photoURL,
      });

      // Update Firestore (name + phone)
      await updateDoc(doc(db, "users", user.uid), {
        name: profile.name,
        phone: profile.phone,
      });

      setEditing(false);
      setImageFile(null);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!user) return null;

  const defaultAvatar = `https://ui-avatars.com/api/?name=${profile.name || "User"}&background=6b21a8&color=fff`;

  return (
    <div className="text-white">
      <h1 className="text-3xl text-purple-400 mb-6">My Profile</h1>

      <div className="bg-slate-900 p-6 rounded-xl max-w-md">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={preview || user.photoURL || defaultAvatar}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500"
          />

          {editing && (
            <input
              type="file"
              accept="image/*"
              className="mt-4 text-sm"
              onChange={handleImageChange}
            />
          )}
        </div>

        {/* Name */}
        <label className="text-gray-400 text-sm">Full Name</label>
        <input
          value={profile.name}
          disabled={!editing}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
          className="w-full p-2 mb-4 bg-slate-800 rounded"
        />

        {/* Email (Not Editable) */}
        <label className="text-gray-400 text-sm">Email</label>
        <input
          value={user.email}
          disabled
          className="w-full p-2 mb-4 bg-slate-800 rounded text-gray-400"
        />

        {/* Phone */}
        <label className="text-gray-400 text-sm">Mobile Number</label>
        <input
          value={profile.phone}
          disabled={!editing}
          onChange={(e) =>
            setProfile({ ...profile, phone: e.target.value })
          }
          className="w-full p-2 mb-6 bg-slate-800 rounded"
        />

        {/* Buttons */}
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="w-full bg-purple-600 py-2 rounded-xl hover:bg-purple-700"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="w-full bg-green-600 py-2 rounded-xl hover:bg-green-700"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;