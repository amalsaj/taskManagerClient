import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = ({ id, title, tasks, deleteTask, viewDetails, editTask }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          className="bg-gray-100 h-fit rounded-lg shadow-md p-6 min-w-96 transition-transform duration-300 ease-in-out hover:shadow-xl"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
            {title}
          </h2>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <Draggable
                key={task._id}
                draggableId={task._id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {task.title}
                          </h3>
                          <p className="text-gray-500 text-sm mt-1">
                            {task.description}
                          </p>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <button
                            onClick={() => editTask(task)}
                            className="bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out rounded-lg py-1 px-3 text-sm font-semibold transform hover:scale-105"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => viewDetails(task)}
                            className="bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transition duration-300 ease-in-out rounded-lg py-1 px-3 text-sm font-semibold transform hover:scale-105"
                          >
                            View
                          </button>
                          <button
                            onClick={() => deleteTask(task._id)}
                            className="bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transition duration-300 ease-in-out rounded-lg py-1 px-3 text-sm font-semibold transform hover:scale-105"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
