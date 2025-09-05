import { useState, useEffect } from "react";
import { MdOutlineAutoDelete } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import "../css/accountStyle.css";
import toast from "react-hot-toast";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const ProveList = ({ refreshTrigger }) => {
  const [proves, setProves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalData, setModalData] = useState(null); // for image modal

   

  const token = localStorage.getItem("token");

  const fetchProves = async () => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/api/prove/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setProves(data);
    } catch (error) {
      console.error("Error fetching proves:", error);
      toast.error("Failed to fetch proves");
    }
  };

  useEffect(() => {
    fetchProves();
  }, [refreshTrigger]);
  const handleDelete = async (id) => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/api/prove/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setProves(proves.filter((p) => p._id !== id));
      toast.success("Prove deleted successfully");
    } else {
      const data = await response.json();
      toast.error(data.message || "Failed to delete prove");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete prove");
  }
};


  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredData = proves.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <div className="searchBtn">
        <div className="inputMain">
          <input
            type="text"
            placeholder="Search by Name || Desc"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button>
            <IoSearch />
          </button>
        </div>
      </div>

      {/* Prove Table */}
      <div className="wrapper">
        <div className="table">
          <div className="row header">
            <div className="cell">Name</div>
            <div className="cell">Desc</div>
            <div className="cell">Images</div>
            <div className="cell">Created At</div>
            <div className="cell">Delete</div>
          </div>

          {filteredData.map((item) => (
            <div className="row" key={item._id}>
              <div className="cell">{item.name}</div>
              <div className="cell">{item.desc}</div>
              <div className="cell">
                <button className="button-hello" onClick={() => setModalData(item.images)}>
                  View Images
                </button>
              </div>
              <div className="cell">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
              <div
                className="cell Icon"
                onClick={() => handleDelete(item._id)}
              >
                <MdOutlineAutoDelete />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {/* Image Modal */}
{modalData && (
  <div className="imageModal">
    {/* Move Close button here, outside modal content */}
    <RxCrossCircled
      className="imageModalClose"
      onClick={() => setModalData(null)}
    />

    <div className="imageModalContent">
      {modalData.map((imgUrl, idx) => (
        <img
          key={idx}
          src={imgUrl}
          alt={`prove-${idx}`}
          className="modalImage"
        />
      ))}
    </div>
  </div>
)}

    </>
  );
};

export default ProveList;
