import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    code: {hex: ''},
    color: '',
  })
  const [count, setCount] = useState(0)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
          .put(`/colors/${colorToEdit.id}`, colorToEdit)
          .then(res=> {
            updateColors([...colors.filter(color=> color.id !== colorToEdit.id), res.data])
            setEditing(false);
          })
          .catch(err => {
            console.log(err)
          })
  };


  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/colors/${color.id}`)
            .then(res => {
              updateColors(colors.filter(color => color.id !== res.data))
            })
            .catch(err => {
              console.log(err)
            })

  };

  const addNewColor = e => {
    e.preventDefault();
    axiosWithAuth().post('/colors', newColor)
      .then(res => { 
      console.log(res)
      setCount(count + 1)
      setNewColor({
        code: {hex: ''},
        color: '',
      })
    })
      .catch(err => {
      console.log(err)
    })
  }

  const handleChange = e => {
      setNewColor({
        ...newColor,
        [e.target.name]: e.target.value
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
     
      {/* stretch - build another form here to add a color */}

      <div className="spacer" >
        <h2>Create new Color Balls</h2>
         <form onSubmit={addNewColor}>
          <legend>Add color</legend>
          <label>
            color name:
            <input
              name = 'color'
              onChange={handleChange}
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              name = 'code'
              onChange={ e => setNewColor({code: {hex: e.target.value}})}
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
          <button type="submit">Create!</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
