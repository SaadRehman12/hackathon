import { useDispatch, useSelector } from "react-redux";
import Button from "../button/Button";
import { useEffect } from "react";
import { getData } from "../../store/slices/eventSlice";

export default function EventList() {
  // Fetch events data from Redux store
  const events = useSelector((store) => store.eventSlice.todos);
  const dispatch = useDispatch();
   console.log("events",events);
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <Button />
      {/* Flex container with gap and responsive wrapping */}
      <div className="flex mt-12 flex-wrap gap-6 justify-center">
        {events.map((event, index) => (
          <div
            key={index}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] h-[250px] bg-blue-500 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
          >
            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
              <p className="text-lg mb-4 opacity-90">{event.description}</p>
              <div className="text-sm mb-2 opacity-85">
                <strong>Category:</strong> {event.category}
              </div>
              <div className="text-sm mb-2 opacity-85">
                <strong>Location:</strong> {event.location}
              </div>
              <div className="text-sm mb-2 opacity-85">
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="text-sm mb-4 opacity-85">
                <strong>Visibility:</strong> {event.visibility ? "Visible" : "Hidden"}
              </div>
              <button className="w-full py-3 px-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
