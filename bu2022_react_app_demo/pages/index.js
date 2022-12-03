import { useCallback, useState, useEffect } from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import NoteCard from "../components/NoteCard";
import NavBar from "../components/NavBar";
import axios from "axios";

const current = new Date();
const { TextArea } = Input;

function HomePage() {
  const [noteList, setNoteList] = useState([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [plusColor, setPlusColor] = useState("gray");
  const [username, setUsername] = useState("");


  // noteList = [
  //   {
  //     value: '1',
  //     color: "pink",
  //     category: "Tag",
  //     date: current.toDateString(),
  //   },
  //   {
  //     value: '1',
  //     color: "pink",
  //     category: "Tag",
  //     date: current.toDateString(),
  //   },
  //   {
  //     value: '1',
  //     color: "pink",
  //     category: "Tag",
  //     date: current.toDateString(),
  //   }
  // ]


  const handleTextChange = (evt) => {
    console.log("text change", evt.target.value);
    setNewNoteText({
      value: evt.target.value,
      color: "pink",
      category: "Tag",
      date: current.toDateString(),
    });
  };

  const handleCreateNote = (evt) => {
    const submitData = { note: newNoteText, user: username };
    console.log("create note click", submitData);

    // axios.post(`http://localhost:5000` + `/notes`, submitData, { withCredentials: true }).then((res) => {
    //   console.log('post notes', res.data)
    //   if (res.data.message == 'login sucesss') {
    //     setUserLoggedIn(true)
    //     setUserLoggedInName(res.data.username)
    //   }
    // })

    setNoteList([...noteList, newNoteText]);
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

  const handleUserNameCallback = (username) => {
    setUsername(username);
  };

  const handleChangeColor = (i, color) => {
    const map = noteList.map((item, index) => {
      return index === i ? { ...item, color: color } : { ...item };
    });
    setNoteList(map);
  };

  const handleChangeCategory = (i, category) => {
    const map = noteList.map((item, index) => {
      return index === i ? { ...item, category: category } : { ...item };
    });
    setNoteList(map);
  };
  
  const handleDelete = (i) => {
    const map = noteList.filter((item, index) => {
      return index !== i
    });
    setNoteList(map);
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
                      {note.date}{" "}
                    </span>
                    <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                      {note.category}{" "}
                    </span>
                  </div>
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <p> {note.value} </p>
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
                    onClick={() => handleChangeCategory(i, "work")}
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
                    onClick={() => handleChangeCategory(i, "school")}
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
                    onClick={() => handleChangeCategory(i, "home")}
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
                    onClick={() => handleChangeColor(i, "#DD5353")}
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
                    onClick={() => handleChangeColor(i, "#FFE15D")}
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
                    onClick={() => handleChangeColor(i, "pink")}
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
                    onClick={() => handleChangeColor(i, "#5F8D4E")}
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
                    onClick={() => handleChangeColor(i, "#EF9A53")}
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
                    onClick={() => handleChangeColor(i, "#59C1BD")}
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
                    onClick={() => handleChangeColor(i, "#7743DB")}
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
                    onClick={() => handleDelete(i)}
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
