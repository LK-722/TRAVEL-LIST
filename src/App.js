import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div>
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        handleDelete={handleDelete}
        toggleBtn={handleToggleItem}
        setItems={setItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((s) => (
          <option value={s} key={s}>
            {s}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, handleDelete, toggleBtn, setItems }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) + Number(b.packed));

  function reset() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all Items?"
    );
    if (confirmed) setItems((items) => []);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDelete={handleDelete}
            key={item.id}
            toggleBtn={toggleBtn}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={reset}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDelete, toggleBtn }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => toggleBtn(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to you packing list</em>
      </footer>
    );

  const itemLength = items.length;
  const itemPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((itemPacked / itemLength) * 100);

  return (
    <footer className="stats">
      <em>
        {" "}
        {percentage === 100
          ? "You got everything! Ready to go"
          : `You have ${itemLength} items on your list, and you already packed
        ${itemPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
