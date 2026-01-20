import './Filter.css';

export default function Filter() {
  return (
    <>
      <select
        name="filter"
        id="filter-select"
        className="border small-el shadow"
      >
        <option>All</option>
      </select>
    </>
  );
}
