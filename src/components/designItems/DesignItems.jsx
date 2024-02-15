import './designItems.css';

const DesignItems = ({ objects, onSelect }) => {
  return (
    <div className="DesignItemsList">
      <ul>
        {objects.map((object) => (
          <li key={object.id} onClick={() => onSelect(object)}>
            <img src={object.image} alt={object.name} />
            <span>{object.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DesignItems;