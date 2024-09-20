import React, { useEffect, useState } from "react";
import { fetchTasks, updateTask, createTask, deleteTask } from "../utils/api";
import TaskBoard from "../components/TaskBoard";
import { logout } from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const Dashboard = () => {
  console.log("ssssss");
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const taskData = {
      title: e.target.title.value,
      description: e.target.description.value,
    };

    try {
      if (isEditMode) {
        await updateTask(selectedTask._id, taskData);
      } else {
        await createTask(taskData);
      }
      await getTasks();
      setModalOpen(false);
      setEditMode(false);
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      await getTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setDetailsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleAddTask = () => {
    setEditMode(false);
    setSelectedTask(null);
    setModalOpen(true);
  };

  // Handle search filter
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Handle sorting
  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortType === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortType === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
      <div className="flex justify-between items-center mb-8 w-full max-w-4xl">
        <h1 className="text-4xl font-semibold text-gray-800">Task Dashboard</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-5 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Search and Sort Section */}
      <div className="mb-6 w-full max-w-4xl flex justify-between items-center space-x-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg"
          value={sortType}
          onChange={handleSort}
        >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="status">Status</option>
        </select>
      </div>

      <button
        onClick={handleAddTask}
        className="mb-6 py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
      >
        Add Task
      </button>

      {/* Centered TaskBoard */}
      <div className="w-full max-w-4xl flex justify-center">
        <TaskBoard
          setTasks={setTasks}
          tasks={filteredTasks} // Pass filtered and sorted tasks
          updateTask={updateTask}
          deleteTask={handleDeleteTask}
          viewDetails={handleViewDetails}
          editTask={handleEditTask}
          fetchTasks={getTasks}
        />
      </div>

      {/* Add/Edit Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {isEditMode ? "Edit Task" : "Create New Task"}
        </h2>
        <form onSubmit={handleCreateTask} className="space-y-6">
          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter task title"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              defaultValue={selectedTask?.title || ""}
              required
            />
          </div>

          {/* Task Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              placeholder="Enter task description"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              defaultValue={selectedTask?.description || ""}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out"
          >
            {isEditMode ? "Update Task" : "Create Task"}
          </button>
        </form>
      </Modal>
      {/* Task Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
      >
        {selectedTask && (
          <div className="p-6 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Task Details
            </h2>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">
                <span className="font-semibold">Title:</span>{" "}
                {selectedTask.title}
              </p>
              <p className="text-sm font-medium text-gray-600">
                <span className="font-semibold">Description:</span>{" "}
                {selectedTask.description}
              </p>
              <p className="text-sm font-medium text-gray-600">
                <span className="font-semibold">Status:</span>{" "}
                {selectedTask.status}
              </p>
            </div>
            <button
              onClick={() => setDetailsModalOpen(false)}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
