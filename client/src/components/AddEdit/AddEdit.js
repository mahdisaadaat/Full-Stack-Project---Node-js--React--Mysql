import "./addEdit.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const initialStore = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialStore);

  const { name, email, contact } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5001/api/get/${id}`).then((resp) => {
      setState({ ...resp.data[0] });
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please Provide Value Into Each Input Field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5001/api/post", {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: "", email: "", contact: "" });
          })
          .catch((error) => {
            toast.error(error.response.data);
          });
        toast.success("Contact Added Successfully");
      } else {
        axios
          .put(`http://localhost:5001/api/update/${id}`, {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: "", email: "", contact: "" });
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
        toast.success("contact updated successfully");
      }
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="AddEdit">
      <form onSubmit={handleSubmit}>
        <div className="name">
          <label>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name is ..."
            value={name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="email">
          <label>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Your Email is ..."
            value={email || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="contact">
          <label>Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Your Phone Number is ..."
            value={contact || ""}
            onChange={handleInputChange}
          />
        </div>
        <input
          className="save-btn"
          type="submit"
          value={id ? "Update" : "Save"}
        />
        <Link to="/">
          <input className="gb-btn" type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
