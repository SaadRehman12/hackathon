import { useState } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../../store/slices/eventSlice";

export default function AddEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [visibility, setVisibility] = useState("");
  const [category, setCategory] = useState("");
const dispatch = useDispatch()
const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      date,
      location,
      visibility,
      category,
    };
    console.log("Form Data Submitted:", formData); // Check form data before dispatch
    dispatch(addData(formData));
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add Event</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Event Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Event Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter event title" 
              required 
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea 
              id="description" 
              name="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter event description" 
              required
            ></textarea>
          </div>

          {/* Date and Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Event Date</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Location</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter event location" 
                required
              />
            </div>
          </div>

          {/* Visibility and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="visibility" className="block text-gray-700 font-semibold mb-2">Visibility</label>
              <select 
                id="visibility" 
                name="visibility" 
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              >
                <option value="" disabled>Select visibility</option>
                <option value="visible">public</option>
                <option value="hidden">private</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
              <select 
                id="category" 
                name="category" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              >
                <option value="" disabled>Select a category</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Meetup">Meetup</option>
                <option value="Seminar">Seminar</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
