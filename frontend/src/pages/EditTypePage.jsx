import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UnauthorizedPage from "./UnauthorizedPage";
import LoadingSpinner from "../components/LoadingSpinner";

export default function EditTypePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sampleType, setSampleType] = useState("");
    const [testType, seTestType] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSampleById(id).then(setSample);
    }, [id]);

    const handleChange = (e) =>
        setSample({ ...sample, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateSample(id, sample);
        navigate(`/samples/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this sample?")) {
        await deleteSample(id);
        navigate("/samples");
        }
    };

    if (loading) return <LoadingSpinner />;
  return (
    <div>
      
    </div>
  )
}
