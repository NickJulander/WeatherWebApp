import {useState} from 'react'

const AddCity = ({onAdd}) => {
  const [addText, setAddText] = useState('')
  const addClicked = async () => {
    if(!addText){
      alert('Please add a city')
    }
    else{
      onAdd({addText})
      setAddText('')
    }
  }
  return(
    <div>
      <button onClick={addClicked}>Add City</button>
      <label> Enter a city name (i.e., 'boulder,co' or 'london,uk') </label> <br/><br/>
      <input type='text' value={addText} onChange={(e) => setAddText(e.target.value)}></input>
    </div>
  )
}

export default AddCity
