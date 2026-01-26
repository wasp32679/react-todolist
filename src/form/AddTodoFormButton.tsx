import Button from '../components/Button';
import './TodoForm.css';

export default function AddTodoBtn() {
  return (
    <div className="form-btn">
      <Button
        className="border small-el add-btn shadow"
        title="Add"
        type="submit"
      />
    </div>
  );
}
