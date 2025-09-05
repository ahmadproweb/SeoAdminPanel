import  { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import "../css/accountStyle.css";
import toast from "react-hot-toast";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const ProvePopuForm = ({ togglePopup, onCreate  }) => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
  });

  const [images, setImages] = useState([]); // ✅ store multiple images
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Handle multiple image selection
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }
    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.desc) {
      toast.error("Please fill all fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();

      // append text fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // append images (multiple) using the correct backend field name
      images.forEach((img) => {
        formDataToSend.append("proveImages", img);
      });

      const response = await fetch(`${VITE_BASE_URL}/api/prove/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Prove created successfully");
        setFormData({ name: "", desc: "" });
          setImages([]);
    togglePopup();
    onCreate?.(); 
      } else {
        toast.error(data.message || "Failed to create prove");
      }
    } catch (error) {
      toast.error("Failed to create prove");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="youtubeFormFill">
        <h1>Fill Form Prove</h1>
        <RxCrossCircled className="CrossIcons" onClick={togglePopup} />
      </div>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="inputYoutube" key={key}>
            <label htmlFor={key}>{key} :</label>
            <input
              type="text"
              id={key}
              placeholder={`Enter ${key}`}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* ✅ Image upload field */}
        <div className="inputYoutube">
          <label htmlFor="images">Upload Images (max 10):</label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="inputYoutube">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProvePopuForm;
