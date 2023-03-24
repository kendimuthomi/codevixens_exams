import React, { useState } from "react";

function ItemList({ items }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxClick = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleButtonClick = () => {
    alert(`Selected items: ${selectedItems.join(", ")}`);
  };

  return (
    <div>
      {items.length === 0 ? (
        <p>No items to display</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxClick(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={handleButtonClick}>Show selected items</button>
    </div>
  );
}

export default ItemList;
