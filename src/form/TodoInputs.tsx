import './TodoForm.css';

export default function TodoInputs() {
  return (
    <>
      <label htmlFor="title">Title :</label>
      <input type="text" id="title" className="shadow" />
      <label htmlFor="description">Description :</label>
      <textarea id="description" className="shadow"></textarea>
      <label htmlFor="due-date">Due-Date :</label>
      <input type="date" id="due-date" className="shadow" />
    </>
  );
}
