import './Filter.css';
import type { FilterProps } from '../types/todo';

export default function Filter({ filterValue }: FilterProps) {
  const setFiltering = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    filterValue(value);
  };

  return (
    <>
      <select
        onChange={setFiltering}
        name="filter"
        id="filter-select"
        className="border small-el shadow"
      >
        <option>All</option>
        <option value={'undone'}>Undone</option>
        <option value={'done'}>Done</option>
      </select>
    </>
  );
}
