import React, { useState } from "react"; // Import React
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS for styling
import "./App.css"; // Import custom CSS for additional styling

function App() {
  // State variables to manage user inputs
  const [roomType, setRoomType] = useState("");
  const [numAdults, setNumAdults] = useState(0);
  const [children, setChildren] = useState([]);
  const [age, setAge] = useState("");
  const [numChildren, setNumChildren] = useState(0);

  // Function to handle adding a child
  const handleAddChild = () => {
    if (!age || !numChildren) {
      alert("Please enter both age and number of children.");
      return;
    }
    if (age < 0 || age > 18) {
      alert("Age must be between 0 and 18.");
      return;
    }
    // Add the child to the children array
    setChildren([...children, { age, numChildren }]);
    setAge("");
    setNumChildren(0);
  };

  // Function to handle removing a child from the list
  const handleRemoveChild = (index) => {
    const newChildren = [...children];
    newChildren.splice(index, 1);
    setChildren(newChildren);
  };

  // Function to reset the form inputs to their initial state
  const resetForm = () => {
    setRoomType("");
    setNumAdults(0);
    setChildren([]);
    setAge("");
    setNumChildren(0);
  };

  // Function to calculate the total price
  const calculatePrice = () => {
    let adultCost = 0;
    let childrenCost = 0;

    switch (roomType) {
      case "Standard Double City View":
        adultCost = numAdults * 30000;
        children.forEach((child) => {
          if (child.age >= 6 && child.age <= 12) {
            childrenCost += child.numChildren * 20000;
          } else if (child.age <= 5) {
            childrenCost += child.numChildren * 5000;
          }
        });
        break;
      case "Superior Twin City View":
        adultCost = numAdults * 40000;
        children.forEach((child) => {
          if (child.age >= 6 && child.age <= 12) {
            childrenCost += child.numChildren * 20000;
          } else if (child.age <= 5) {
            childrenCost += child.numChildren * 5000;
          }
        });
        break;
      case "Superior Twin Sea View":
        adultCost = numAdults * 50000;
        children.forEach((child) => {
          if (child.age >= 6 && child.age <= 12) {
            childrenCost += child.numChildren * 30000;
          } else if (child.age <= 5) {
            childrenCost += child.numChildren * 10000;
          }
        });
        break;
      default:
        break; // Do nothing if no valid room type is selected
    }

    const totalCost = adultCost + childrenCost; // Calculate total cost
    return { adultCost, childrenCost, totalCost };
  };

  const { adultCost, childrenCost, totalCost } = calculatePrice();

  return (
    
    <div className="container mt-5">
      <div className="row">
      
        {/* Form Panel */}
        <div className="col-md-6">
          <div className="card form-transparent">
            <div className="card-body">
              <h3 className="card-title">Room Price Calculator</h3>
              <button
                className="btn btn-link text-danger float-end"
                onClick={resetForm}
              >
                Reset
              </button>
              <form>
                <div className="mb-3">
                  <label className="form-label">Room Type</label>
                  <select
                    className="form-select"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                  >
                    <option value="">Select Room Type</option>
                    <option value="Standard Double City View">
                      Standard Double City View
                    </option>
                    <option value="Superior Twin City View">
                      Superior Twin City View
                    </option>
                    <option value="Superior Twin Sea View">
                      Superior Twin Sea View
                    </option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Number of Adults</label>
                  <input
                    type="number"
                    className="form-control"
                    value={numAdults}
                    onChange={(e) => setNumAdults(e.target.value)}
                    min="0"
                  />
                </div>

                <div className="row mb-3">
                <label className="form-label">Number of Children</label>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age"
                      min="0"
                    />
                  </div>

                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      value={numChildren}
                      onChange={(e) => setNumChildren(e.target.value)}
                      placeholder="No of Children"
                      min="1"
                    />
                  </div>
                </div>


                <button
                  type="button"
                  className="btn btn-outline-primary mb-3"
                  onClick={handleAddChild}
                >
                  Add Child
                </button>
              </form>

              {/* Children List */}
              {children.length > 0 && (
                <div className="table-responsive mb-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Age</th>
                        <th>No. of Children</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {children.map((child, index) => (
                        <tr key={index}>
                          <td>{child.age}</td>
                          <td>{child.numChildren}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleRemoveChild(index)}
                            >
                              <i className="bi bi-trash"></i> {/* Use an icon for remove */}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price Panel */}
        <div className="col-md-6">
          <div className="card form-transparent">
            <div className="card-body">
              <h3 className="card-title">Cost</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Adult Cost</td>
                    <td>{adultCost.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Children Cost</td>
                    <td>{childrenCost.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
              <h4>Total Price: {totalCost.toLocaleString()}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;