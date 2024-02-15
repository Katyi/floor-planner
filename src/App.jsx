import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import DesignItems from './components/designItems/DesignItems';
import Arrangements from './components/arrangements/Arrangements';
import Board from './components/board/Board';
import Footer from './components/footer/Footer';
import { exampleObjects } from './data/imagesFile';

function App() {
  const [objects, setObjects] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [arrangements, setArrangements] = useState([]);

  const handleObjectSelect = (object) => {
    setSelectedObjects((selectedObjects) => [
      ...selectedObjects,
      {
        id: selectedObjects.length,
        image: object.image,
        name: object.name,
      },
    ])
  };

  const handleSave = () => {
    const arrangement = selectedObjects.map((object) => ({
      id: object.id,
      image: object.image,
      name: object.name,
      x: object.x,
      y: object.y,
    }));
    setArrangements([...arrangements, arrangement]);
  };

  const handleDelete = (index) => {
    let newArr = arrangements.filter((object, i) => i+1 !== index);
    setArrangements(newArr);
    setSelectedObjects([])
  }
  const handleClear = (index) => {
    setArrangements([]);
    setSelectedObjects([])
  }

  const handleLoad = (index) => {
    const arrangement = arrangements[index];
    setSelectedObjects(arrangement);
  };

  useEffect(() => {
    setObjects(exampleObjects);
  }, []);

  return (
    <div className="App">
      <Header title='Simple floor planner'/>
      <div style={{display:'flex', flexDirection:"column", gap:"24px"}}>
        <DesignItems objects={objects} onSelect={handleObjectSelect} />
        <Arrangements arrangements={arrangements} handleSave={handleSave} handleDelete={handleDelete} handleClear={handleClear} handleLoad={handleLoad}/>
      </div>
      <Board objects={selectedObjects} setObjects={setSelectedObjects}/>
      <Footer/>
    </div>
  );
}

export default App;