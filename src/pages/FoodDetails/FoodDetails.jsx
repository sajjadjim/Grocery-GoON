import axios from "axios";
import { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import Countdown from 'react-countdown';
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { IoArrowBack } from "react-icons/io5";
import Spinner from "../loading";


const FoodDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [food, setFood] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate(); 


  useEffect(() => {
    if (!user) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/foods/${id}`)
      .then(res => {
        setFood(res.data);
        if (res.data.userEmail === user.email) {
          setIsOwner(true);
        
        }
      })
      .catch(err => {
        console.error("Error fetching food:", err.message);
        Swal.fire('Error', 'Food not found or server error', 'error');
      });
  }, [id, user]);

  const handleAddNote = async () => {
    if (!noteText.trim()) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/foods/${id}/notes`, {
        note: noteText,
        userEmail: user.email
      }, {
        withCredentials: true
      });
      Swal.fire('Success', 'Note added successfully!', 'success');
      setNoteText('');
      const updatedFood = await axios.get(`${import.meta.env.VITE_API_URL}/foods/${id}`);
      setFood(updatedFood.data);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Could not add note', 'error');
    }
  };

  if (!food) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-gray-600">
        Loading food details...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow space-y-4 my-5">
      <Link onClick={() => navigate(-1)}className="flex"><IoArrowBack />Back</Link>
      <div>
        <img src={food.image} alt={food.title} className="w-full h-64 mx-auto  object-contain rounded" />
      </div>
      <h2 className="text-2xl font-bold">{food.title}</h2>
      <p><strong>Category:</strong> {food.category}</p>
      <p><strong>Quantity:</strong> {food.quantity}</p>
      <p><strong>Expiry Date:</strong> {new Date(food.expiryDate).toLocaleDateString()}</p>

      <div>
        <strong> Time Left:</strong>{' '}
        <Countdown date={new Date(food.expiryDate)} />
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Add Note</h3>
        <textarea
          className="w-full border p-2 rounded"
          rows="4"
          disabled={!isOwner}
          placeholder={isOwner ? 'Write your note here...' : 'You are not allowed to add note to this item'}
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
        />
        <button
          onClick={handleAddNote}
          disabled={!isOwner}
          className="mt-2 btn btn-primary"
        >
          Add Note
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Previous Notes:</h3>
        {food.notes?.length ? (
          <ul className="list-disc list-inside">
            {food.notes.map((n, i) => (
              <li key={i}>
                {n.note} <span className="text-sm text-gray-500">({new Date(n.postedAt).toLocaleString()})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes yet.</p>
        )}
      </div>
    </div>
  );
};


export default FoodDetails;