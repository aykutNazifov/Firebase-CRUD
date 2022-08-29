import "./home.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { addData, deleteData, updateData, db } from "../../firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export interface ITask {
  id: any;
  task: string;
  uploadDate: any;
}

const Home = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const username = user?.email.split("@")[0];

  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");

  const handleClick = () => {
    if (input === "") {
      alert("Please type anything!");
    } else {
      addData(input, user.uid);
      setInput("");
    }
  };

  const handleDelete = (id: string) => {
    deleteData(id);
  };

  const handleClickUpdate = () => {
    updateData(input, updateId);
    setInput("");
    setUpdateMode(false);
  };

  const handleUpdate = (task: string, id: string) => {
    setUpdateMode(true);
    setInput(task);
    setUpdateId(id);
  };

  const q = user
    ? query(collection(db, "tasks"), where("uid", "==", user.uid))
    : collection(db, "tasks");

  useEffect(() => {
    const unsuscribe = onSnapshot(q, (doc) => {
      let arr: any[] = [];
      doc.docs.forEach((a) => {
        arr.push({ id: a.id, ...a.data() });
      });
      setTasks(arr);
    });
    return () => {
      unsuscribe();
    };
  }, [q]);

  return (
    <div className="home">
      {user ? (
        <>
          <h1 className="username">Hello, {user && username}</h1>
          <div className="input">
            <input
              type="text"
              placeholder="Your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {updateMode ? (
              <button onClick={handleClickUpdate}>Update</button>
            ) : (
              <button onClick={handleClick}>Add</button>
            )}
          </div>
          <div className="contentContainer">
            {tasks.map((task) => (
              <div key={task.id} className="singleContent">
                <p>{task.task}</p>
                <div>
                  <GrUpdate
                    color="green"
                    size={20}
                    onClick={() => handleUpdate(task.task, task.id)}
                    style={{ cursor: "pointer", marginRight: "20px" }}
                  />
                  <FaTrash
                    color="red"
                    size={20}
                    onClick={() => handleDelete(task.id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1>You need to login for continue!</h1>
      )}
    </div>
  );
};

export default Home;
