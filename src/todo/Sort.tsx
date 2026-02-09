import { useStore } from '../store';
import './Sort.css';

export default function SortBy() {
  const setSort = useStore((state) => state.setSort);

  return (
    <>
      <select
        onChange={(e) => setSort(e.currentTarget.value)}
        name="sort"
        id="sort-select"
        className="border small-el shadow"
      >
        <option value={''}>Sort</option>
        <option value={'name'}>Name</option>
        <option value={'due-date'}>Due date</option>
      </select>
    </>
  );
}
