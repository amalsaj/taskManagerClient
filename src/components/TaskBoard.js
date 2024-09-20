import React from "react";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const TaskBoard = ({
  tasks,
  updateTask,
  deleteTask,
  viewDetails,
  editTask,
  fetchTasks,
  setTasks,
}) => {
  const columns = {
    todo: tasks.filter((task) => task.status === "todo"),
    inProgress: tasks.filter((task) => task.status === "inProgress"),
    done: tasks.filter((task) => task.status === "done"),
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return; // No movement
    }

    // Update the task status
    const updatedTask = tasks.find((task) => task._id === draggableId);
    const updatedTasks = tasks.map((task) =>
      task._id === draggableId
        ? { ...task, status: destination.droppableId }
        : task
    );

    setTasks(updatedTasks);

    try {
      await updateTask(draggableId, {
        ...updatedTask,
        status: destination.droppableId,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="task-board" direction="horizontal" type="COLUMN">
        {(provided) => (
          <div
            className="flex space-x-6 p-6 bg-gray-50 min-h-screen"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Column
              id="todo"
              title="To Do"
              tasks={columns.todo}
              deleteTask={deleteTask}
              viewDetails={viewDetails}
              editTask={editTask}
            />
            <Column
              id="inProgress"
              title="In Progress"
              tasks={columns.inProgress}
              deleteTask={deleteTask}
              viewDetails={viewDetails}
              editTask={editTask}
            />
            <Column
              id="done"
              title="Done"
              tasks={columns.done}
              deleteTask={deleteTask}
              viewDetails={viewDetails}
              editTask={editTask}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskBoard;
