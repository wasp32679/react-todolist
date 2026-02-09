import './Filter.css';
import { useStore } from '../store';

export default function Filter() {
  const setFilter = useStore((state) => state.setFilter);

  return (
    <>
      <select
        onChange={(e) => setFilter(e.currentTarget.value)}
        name="filter"
        id="filter-select"
        className="border small-el shadow"
      >
        <option value={''}>All</option>
        <option value={'undone'}>Undone</option>
        <option value={'done'}>Done</option>
      </select>
    </>
  );
}
