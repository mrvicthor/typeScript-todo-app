import React, { useState } from "react";

interface Props {
  toggleTheme: boolean;
  onItemSelect: (item: string) => void;
  selectedItem: string;
  items: any[];
}

const ListGroup: React.FC<Props> = ({
  toggleTheme,
  onItemSelect,
  selectedItem,
  items,
}) => {
  return (
    <nav className={toggleTheme ? "bg__dark" : ""}>
      <ul>
        {items.map((item) => (
          <li
            onClick={() => onItemSelect(item.value)}
            key={item.id}
            className={selectedItem === item.value ? "active" : ""}
          >
            {item.value}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ListGroup;
