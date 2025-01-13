const Whishlist = ({ show, onClose }) => {
    if (!show) return null;
    return (
      <div className="whishlist-popup" onClick={onClose}>
        <div
          className="whishlist-popup-container"
          onClick={(e) => e.stopPropagation()} // Prevent closing sidebar when clicking inside
        >
          <div className="whishlist-popup-header d-flex justify-content-between align-content-center align-items-center">
            <button className="sidebar-close-button" onClick={onClose}>
              &times;
            </button>
  
          </div>
          <div className="text-center mt-5 d-flex justify-content-center align-items-center flex-column"> 
            <div className="whishlist-header-banner d-flex justify-content-center align-items-center">
            <h3 className="whishlist-header-title">Your WhishList</h3>
            </div>
            <div className="whishlist-body-content mt-5 p-5 text-center">
            <p className="fw-semibold fs-3">
              Wishlist is empty.
            </p>
            <p>
              You don't have any products in the wishlist yet. You will find a lot of interesting products on our "Shop page".
            </p>
            </div>
          </div>
  
          <div>
  
          </div>
        </div>
      </div>
    )
  }
  export default Whishlist;