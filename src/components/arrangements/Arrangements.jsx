import './arrangements.css';

const Arrangements = ({arrangements, handleSave, handleDelete, handleClear, handleLoad}) => {

  return (
    <div className='Arrangements'>
      <button className="BigBtn" onClick={() => handleSave()}>Save Arrangement</button>
      <button className="BigBtn" onClick={() => handleClear()}>Clear All</button>
        <ul>
          {arrangements?.map((arrangement, index) => (
            <li key={index} className='ArrangementsLi'>
              <span onClick={() => handleLoad(index)}>Arrangement {index + 1}</span>
              <button className='smallBtn' onClick={() => handleDelete(index+1)}>X</button>
            </li>
            
          ))}
        </ul>  
    </div>
  )
}

export default Arrangements;