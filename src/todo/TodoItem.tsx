import trash from '../assets/trash-bin.png';
import './TodoItem.css';

export default function TodoItem() {
  return (
    <li className="border shadow">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente iure
      expedita repellendus ducimus officiis consequatur, veniam facilis
      exercitationem, quaerat ipsa explicabo voluptates quam unde architecto
      velit commodi eos, accusantium tempora!
      <div>
        <button className="item-btn">
          <img src={trash} alt="supprimer" className="item-img" />
        </button>
      </div>
    </li>
  );
}
