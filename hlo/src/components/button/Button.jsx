import { useNavigate } from 'react-router-dom';

export default function Button() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/createEvent');
  };

  return (
    <div className="fixed right-6 mb-6">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
      >
        Click Me
      </button>
    </div>
  );
}
