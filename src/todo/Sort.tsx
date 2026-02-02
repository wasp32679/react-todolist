import type { SortProps } from '../types/todo';
import './Sort.css';

export default function SortBy({ sortValue }: SortProps) {
  const setSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    sortValue(value);
  };

  return (
    <>
      <select
        onChange={setSorting}
        name="sort"
        id="sort-select"
        className="border small-el shadow"
      >
        <option>Sort</option>
        <option value={'name'}>Name</option>
        <option value={'due-date'}>Due date</option>
      </select>
    </>
  );
}
