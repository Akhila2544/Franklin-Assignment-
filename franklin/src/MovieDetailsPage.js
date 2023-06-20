import React from "react";

const MoveDetailsPage = ({ location }) => {
  const { move } = location.state;

  return (
    <div>
      <h1>Move Details</h1>
      <p>From: {move.moving_from}</p>
      <p>To: {move.moving_to}</p>
      {/* Display additional move details */}
      <h2>Furniture Details</h2>
      {move.category.map((item) => (
        <div key={item.id}>
          <h3>{item.displayName}</h3>
          {/* Display furniture items */}
          {item.items.map((furniture) => (
            <div key={furniture.id}>
              <p>Name: {furniture.name}</p>
              {/* Display more furniture details */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MoveDetailsPage;
