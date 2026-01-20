import trash from '../assets/trash-bin.png';

export default function TodoItem() {
  return (
    <li>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente iure
      expedita repellendus ducimus officiis consequatur, veniam facilis
      exercitationem, quaerat ipsa explicabo voluptates quam unde architecto
      velit commodi eos, accusantium tempora!
      <div>
        <button>
          <img src={trash} alt="supprimer" className="item-img" />
        </button>
      </div>
    </li>
  );
}
