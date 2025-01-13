import img1 from '../../assets/IMAGES/white-1.jpg';
import img2 from '../../assets/IMAGES/white-2.jpg';
import img3 from '../../assets/IMAGES/white-3.jpg';
import { IoSearch } from 'react-icons/io5';

const SearchSidebar = ({ show, onClose }) => {
    if (!show) return null;
  
    return (
      <div className="sidebar-overlay" onClick={onClose}>
        <div
          className="sidebar-container search-sidebar"
          onClick={(e) => e.stopPropagation()} // Prevent closing sidebar when clicking inside
        >
          <button className="sidebar-close-button" onClick={onClose}>
            &times;
          </button>
          <h3 className="sidebar-title">Search our site</h3>
          {/* Search Input */}
          <div className='search-bottom'>
            <div
              className="d-flex gap-2 search-input-container"
              style={{
                border: "1px solid #ddd",
                alignItems: "center", // Center items vertically
                padding: "5px", // Add padding for better spacing
              }}
            >
              <IoSearch
                style={{
                  marginLeft: "5px",
                  fontSize: "1.3rem", // Adjust icon size
                  // color: "gray", // Optional: Add a color for better visibility
                }}
              />
              <input
                style={{
                  border: "none",
                  outline: "none", // Remove the default input focus outline
                  flex: "1",
                  // Allow the input to take the remaining space
                }}
                type="text"
                placeholder="Search"
                className="search-input fw-bold"
              />
            </div>
          </div>
  
          {/* Quick Links */}
          <div className="quick-links">
            <h4>Quick links</h4>
            <ul>
              <li><a href="#fashion">Fashion</a></li>
              <li><a href="#men">Men</a></li>
              <li><a href="#women">Women</a></li>
              <li><a href="#accessories">Accessories</a></li>
            </ul>
          </div>
  
          {/* Need Some Inspiration */}
          <div className="inspiration-section">
            <h4>Need some inspiration?</h4>
            <div className="inspiration-item">
              <img src={img1} alt="Cotton jersey top" />
              <div>
                <p>Cotton jersey top</p>
                <p><s>$10.00</s> <strong>$8.00</strong></p>
              </div>
            </div>
            <div className="inspiration-item">
              <img src={img2} alt="Mini crossbody bag" />
              <div>
                <p>Mini crossbody bag</p>
                <p className='fw-bold'>$13.00</p>
              </div>
            </div>
            <div className="inspiration-item">
              <img src={img3} alt="Mini crossbody bag" />
              <div>
                <p>Mini crossbody bag</p>
                <p className='fw-bold'>$13.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default SearchSidebar;