
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { RiTruckLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiLogOut, FiArrowRight } from "react-icons/fi";
import { RiHomeLine } from "react-icons/ri";
import { FaBoxes } from "react-icons/fa";
import { RiRoadMapLine } from "react-icons/ri";
import { BsCalendar } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import "./MoveDetails.css";

const MoveDetails = () => {
  const [moveDetails, setMoveDetails] = useState([]);
  const [activeMove, setActiveMove] = useState(null);
  const [expandedMove, setExpandedMove] = useState(null);
  const [inventoryDetails, setInventoryDetails] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://test.api.boxigo.in/sample-data/")
      .then((response) => {
        const data = response.data.Customer_Estimate_Flow;
        setMoveDetails(data);
      })
      .catch((error) => {
        console.log("Error fetching move details:", error);
      });
  }, []);

  const handleViewDetails = (index) => {
    setActiveMove(index);
    if (expandedMove === index) {
      setExpandedMove(null); 
    } else {
      setExpandedMove(index);
      setInventoryDetails(moveDetails[index]?.items?.inventory || []); 
    }
  };

  const handleExpandItems = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  

  return (
    <Container className="movestyle">
      <Row>
        <Col>
          <Navbar>
            <Container>
              <Navbar.Toggle aria-controls="navbar-nav" />
              <Navbar.Collapse id="navbar-nav">
                <Nav>
                  <Nav.Link href="#home">
                    <RiTruckLine /> My Moves
                  </Nav.Link>
                  <Nav.Link href="#profile">
                    <AiOutlineUser /> My Profile
                  </Nav.Link>
                  <Nav.Link href="#quote">
                    <HiOutlineDocumentText /> Get Quote
                  </Nav.Link>
                  <Nav.Link href="#logout">
                    <FiLogOut /> Logout
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <Row className="move-details-row">
        <Col className="move-details-column">
          <div className="my-moves-section">
            <h4>My Moves</h4>
            {moveDetails.length > 0 ? (
              <ul className="move-list">
                {moveDetails.map((val, index) => (
                  <li
                    key={index}
                    className={`move-item ${expandedMove === index ? "active" : ""}`}
                  >
                    <div className="move-item-content">
                      <Row>
                        <Col>
                          <p>
                            <strong>From:</strong> {val.moving_from}
                          </p>
                        </Col>
                        <Col className="arrow-col">
                          <div className="arrow-wrapper">
                            <FiArrowRight className="arrow-icon" />
                          </div>
                        </Col>
                        <Col>
                          <p>
                            <strong>To:</strong> {val.moving_to}
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <strong>Request#:</strong>{" "}
                            <strong className="red-text">{val.estimate_id}</strong>
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            <RiHomeLine className="icon" /> {val.property_size}
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <FaBoxes className="icon" /> {val.total_items}
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <RiRoadMapLine className="icon" /> {val.distance}
                          </p>
                        </Col>
                        <Col>
                          <div className="icon-with-pencil">
                            <BsCalendar className="icon" />
                            <span>{val.date_created}</span>
                            <BiPencil className="pencil-icon" />
                          </div>
                        </Col>
                        <Col>
                          <input
                            type="checkbox"
                            name="Is flexible"
                            style={{ borderColor: "red", color: "red" }}
                          />
                          <label>Is flexible</label>
                        </Col>
                        <Col>
                          <button
                            className={`custom-button ${
                              expandedMove === index ? "active" : ""
                            }`}
                            onClick={() => handleViewDetails(index)}
                          >
                            {expandedMove === index ? "Hide Details" : "View Move Details"}
                          </button>
                        </Col>
                      </Row>
                      {expandedMove === index && (
                        <div className="move-details-section">
                          <h4>Move Details</h4>
  
                          <Row>
                            <Col>
                              <p>
                                <strong>Additional details:</strong>
                              </p>
                            </Col>
                            <Col>
                              <button
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                  marginLeft: "auto",
                                }}
                              >
                                Edit Additional Info
                              </button>
                            </Col>
                          </Row>
                          <Row>
                            <p>Test Data</p>
                          </Row>
                          <Row>
                            <Col>
                              <p>
                                <strong>House details:</strong>
                              </p>
                            </Col>
                            <Col>
                              <button
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                  marginLeft: "auto",
                                }}
                              >
                                Edit House Details
                              </button>
                            </Col>
                          </Row>
                          <Row>
                            <Row>
                              <p style={{ color: "red" }}>
                                <strong>Existing House Details</strong>
                              </p>
                            </Row>
                            <Col>
                              <strong>Floor No</strong>
                            </Col>
                            <Col>
                              <strong>Elevator Available</strong>
                            </Col>
                            <Col>
                              <strong>
                                Distance from Elevator/Staircase to truck
                              </strong>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>{val.old_floor_no}</p>
                            </Col>
                            <Col>
                              <p>{val.old_elevator_availability}</p>
                            </Col>
                            <Col>
                              <p>
                                {Math.floor(parseFloat(val.old_parking_distance) * 0.3048) +
                                  " meters"}
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Row>
                              <Row>
                                <p>
                                  <strong>New House Details</strong>
                                </p>
                              </Row>
                              <Col>
                                <strong>Floor No</strong>
                              </Col>
                              <Col>
                                <strong>Elevator Available</strong>
                              </Col>
                              <Col>
                                <strong>
                                  Distance from Elevator/Staircase to truck
                                </strong>
                              </Col>
                            </Row>
                            <Col>
                              <p>{val.new_floor_no}</p>
                            </Col>
                            <Col>
                              <p>{val.new_elevator_availability}</p>
                            </Col>
                            <Col>
                              <p>
                                {Math.floor(parseFloat(val.new_parking_distance) * 0.3048) +
                                  " meters"}
                              </p>
                            </Col>
                          </Row>
                        
                          {expandedMove === index && (
                            <Row>
                              <Col>
                                <h4>Inventory Details:</h4>
                                {inventoryDetails.length > 0 ? (
                                  <ul>
                                    {inventoryDetails.map(
                                      (inventoryItem, inventoryIndex) => (
                                        <li key={inventoryIndex}>
                                          <div className="dropdown">
                                            <button
                                              className="display-name-button"
                                              onClick={() =>
                                                handleExpandItems(inventoryIndex)
                                              }
                                            >
                                              <h5>{inventoryItem.displayName}</h5>
                                            </button>
                                            {expandedItems.includes(
                                              inventoryIndex
                                            ) && (
                                              <div className="dropdown-content">
                                                {inventoryItem.category.map(
                                                  (categoryItem, categoryIndex) => (
                                                    <div key={categoryIndex}>
                                                      <p>
                                                        {categoryItem.displayName}
                                                      </p>
                                                      <ul>
                                                        {categoryItem.items.map(
                                                          (item, itemIndex) => (
                                                            <li
                                                              key={itemIndex}
                                                              className="item"
                                                            >
                                                              {item.displayName}
                                                            </li>
                                                          )
                                                        )}
                                                      </ul>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <p>No inventory details available.</p>
                                )}
                              </Col>
                            </Row>
                          )}
                          {/* ... existing code */}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading move details...</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
  
};

export default MoveDetails;
