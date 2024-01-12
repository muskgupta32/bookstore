import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CheckoutForm = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let navigate = useNavigate();
  let user = useSelector((state) => state.user);
  const inputStyle = { marginBottom: '0' }; // Adjust the margin value as needed

  return (
    <>
      <Button variant="primary" onClick={function(){
        if(!user)
        {
          alert("You are not logged in")
          
          navigate('/login')
        }
        else
        {
          handleShow();
        }
      }}>
        Check Out
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3" onSubmit={(e) => {
            e.preventDefault();
          }}>
            <div className="col-md-6" style={inputStyle}>
              <label htmlFor="inputName4" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="inputName4" required/>
            </div>
            <div className="col-md-6" style={inputStyle}>
              <label htmlFor="inputnumber4" className="form-label">
                Contact Number
              </label>
              <input type="number" className="form-control" id="inputnumber4" required/>
            </div>
            <div className="col-12" style={inputStyle}>
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                required
              />
            </div>
            <div className="col-12" style={inputStyle}>
              <label htmlFor="inputAddress2" className="form-label">
                Address 2
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                required
              />
            </div>
            <div className="col-md-6" style={inputStyle}>
              <label htmlFor="inputCity" className="form-label">
                City
              </label>
              <input type="text" className="form-control" id="inputCity" required/>
            </div>
            <div className="col-md-4" style={inputStyle}>
              <label htmlFor="inputState" className="form-label">
                State
              </label>
              <select id="inputState" className="form-select" required>
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="col-md-2" style={inputStyle}>
              <label htmlFor="inputZip" className="form-label">
                Zip
              </label>
              <input type="text" className="form-control" id="inputZip" required/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              alert('Order Placed Successfully!');
              navigate('/');
            }}
          >
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CheckoutForm;
