import { useCallback, useState, useEffect } from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import NoteCard from "../components/NoteCard";
import NavBar from "../components/NavBar";
import axios from "axios";

const { TextArea } = Input;

function HomePage() {
  const [noteList, setNoteList] = useState([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [plusColor, setPlusColor] = useState("gray");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");


  const handleTextChange = (evt) => {
    // console.log("text change", evt.target.value);
    setNewNoteText({
      id: new Date(),
      note: evt.target.value,
      color: "pink",
      category: "Tag",
      date: new Date(),
    });
  };

  const handleCreateNote = (evt) => {
    const submitData = { ...newNoteText, user: 'aong' };
    console.log("create note click", submitData);
    
    axios.post(`http://localhost:5000/notes`, submitData, { withCredentials: true }).then((res) => {
      if (res.data.isError) {
        setError(res.data.message)
        setTimeout(() => {
          setError('')
        }, 3000);
      } else {
        setNoteList([...noteList, newNoteText]);
      }
    })
  };

  const handleMouseEnter = () => {
    console.log("mouse enter");
    setPlusColor("blue");
  };

  const handleMouseLeave = () => {
    console.log("mouse leave");
    setPlusColor("gray");
  };

  useEffect(() => {
    console.log("using effect");
    if (noteList.length == 100) {
      alert("You have 100 items in List!");
    }
  }, [noteList]);

  useEffect(() => {
    initListNote()
  }, []);

  const initListNote = async() => {
    const res = await axios.get(`http://localhost:5000/notes`)
    if(!res.data.isError) {
      setNoteList(res.data.data)
    }
  }

  const handleUserNameCallback = (username) => {
    setUsername(username);
  };

  const handleChangeColor = async (id, color ) => {
    const res = await axios.put(`http://localhost:5000/notes/color`,{ color, id})
    if (res.data.isError) {
      alert(res.data.message)
    } else {
      initListNote()
    }
    
  };

  const handleChangeCategory = async(id, category) => {
    const res = await axios.put(`http://localhost:5000/notes/category`,{ category, id})
    if (res.data.isError) {
      alert(res.data.message)
    } else {
      initListNote()
    }
  };
  
  const handleDelete = async(id) => {
    const res = await axios.delete(`http://localhost:5000/notes`,{ data: { id } })
    if (res.data.isError) {
      alert(res.data.message)
    } else {
      initListNote()
    }
  };

  return (
    <div
      style={{
        backgroundColor: "darkblue",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <NavBar userNameCallback={handleUserNameCallback}></NavBar>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div
          style={{
            backgroundColor: "cornsilk",
            width: "100%",
            margin: "20px",
            borderRadius: "20px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            {" "}
            {username ? username : "My"} Notes
          </h2>

          {noteList.length == 0 && (
            <p style={{ textAlign: "center" }}>
              {" "}
              You have no perviously created notes. Create a new note and it
              will appear here.{" "}
            </p>
          )}

          {noteList.map((note, i) => {
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 500px",
                  backgroundColor: note.color,
                  margin: "20px",
                  borderRadius: "4px",
                  paddingTop: "10px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ width: "20%" }}>
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      {new Date(note.date).toDateString()}{" "}
                    </span>
                    <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                      {note.category}{" "}
                    </span>
                  </div>
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <p> {note.note} </p>
              
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      border: "1px solid",
                      borderRadius: "10px",
                      height: "20px",
                      padding: "0 10px",
                      marginRight: "10px",
                      backgroundColor: "#B2B2B2",
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeCategory( note.id, "work")}
                  >
                    {" "}
                    work{" "}
                  </div>
                  <div
                    style={{
                      border: "1px solid",
                      borderRadius: "10px",
                      height: "20px",
                      padding: "0 10px",
                      marginRight: "10px",
                      backgroundColor: "#B2B2B2",
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeCategory(note.id,"school")}
                  >
                    {" "}
                    school{" "}
                  </div>

                  <div
                    style={{
                      border: "1px solid",
                      borderRadius: "10px",
                      height: "20px",
                      padding: "0 10px",
                      marginRight: "10px",
                      backgroundColor: "#B2B2B2",
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeCategory(note.id,"home")}
                  >
                    {" "}
                    home{" "}
                  </div>

                  <div
                    style={{
                      backgroundColor: "#DD5353",
                      width: "20px",
                      height: "20px",
                      borderColor: "#000",
                      border: "1px solid",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeColor(note.id, "#DD5353")}
                  ></div>
                  <div
                    style={{
                      backgroundColor: "#FFE15D",
                      width: "20px",
                      height: "20px",
                      borderColor: "#000",
                      border: "1px solid",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeColor(note.id,"#FFE15D")}
                  >
                    {" "}
                  </div>
                  <div
                    style={{
                      backgroundColor: "pink",
                      width: "20px",
                      height: "20px",
                      borderColor: "#000",
                      border: "1px solid",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeColor(note.id,"pink")}
                  >
                    {" "}
                  </div>
                  <div
                    style={{
                      backgroundColor: "#5F8D4E",
                      width: "20px",
                      height: "20px",
                      borderColor: "#000",
                      border: "1px solid",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeColor(note.id,"#5F8D4E")}
                  >
                    {" "}
                  </div>
                  <div
                    style={{
                      backgroundColor: "#EF9A53",
                      width: "20px",
                      height: "20px",
                      borderColor: "#000",
                      border: "1px solid",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeColor(note.id,"#EF9A53")}
                  >
                    {" "}
                  </div>
                  <div
                    style={{
                      backgroundColor: "#59C1BD",
                      width: "20px",
                      height: "20px",
                      borderColor: "#000",
                      border: "1px solid",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeColor(note.id,"#59C1BD")}
                  >
                    {" "}
                  </div>
                  <div
                    style={{
                      backgroundColor: "#7743DB",
                      width: "20px",
                      height: "20px",
                      borderColor: "#000",
                      border: "1px solid",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleChangeColor(note.id,"#7743DB")}
                  >
                    {" "}
                  </div>
                  <div
                    style={{
                      padding: "0 10px",
                      marginRight: "10px",
                      cursor: "pointer",
                      color: 'darkblue'
                    }}
                    onClick={() => handleDelete(note.id)}
                  >
                    delete
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            backgroundColor: "cornsilk",
            width: "100%",
            margin: "20px",
            borderRadius: "20px",
            paddingTop: "20px",
          }}
        >
          <h2 style={{ textAlign: "center" }}> Create New Note</h2>
          <h2  style={{ textAlign: "center", color: 'red' }} >{error}</h2>
          <div style={{ margin: "20px" }}>
            <TextArea rows={4} onChange={handleTextChange} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <PlusCircleOutlined
              onClick={handleCreateNote}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                color: plusColor,
                fontSize: "30px",
                width: "100px",
                textAlign: "center",
              }}
            />
          </div>
        </div>
      </div>
      {console.log("Notey List", noteList)}
    </div>
  );
}

export default HomePage;
