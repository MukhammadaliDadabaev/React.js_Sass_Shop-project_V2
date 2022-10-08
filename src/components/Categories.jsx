import React, { useState } from "react";

function Categories() {
  // STATE
  const [activeIndex, setActiveIndex] = useState(0);

  // ITEM-MASSIV
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, ind) => (
          <li
            key={ind}
            onClick={() => setActiveIndex(ind)}
            className={activeIndex === ind ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
