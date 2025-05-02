import { useState } from "react";
import "./Kanban.css";

// source des articles utilisés dans le fichier README.md

export type Task = {
    id: number;
    author: string;
    status: string; 
    title: string;
    description: string;
    date_start: string;
    date_end: string;
    priority: string;
};

function Kanban() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const todos = tasks.filter(task => task.status === "todo");
    const pending = tasks.filter(task => task.status === "in-progress");
    const finished = tasks.filter(task => task.status === "done");

    const handleColumnChange = (taskId: number, newStatus: string) => {                 
        setTasks(prevTasks =>
            prevTasks.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    const addTask = (newTask: Task) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        setShowForm(false);
    };

    const deleteTask = (taskId: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    return (
        <>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Masquer le formulaire" : "Ajoutez une tâche"}
            </button>
            
            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    {/* Le form se ferme quand on clique en dehors */}
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <Formulaire onAddTask={addTask} />
                    </div>
                </div>
            )}
            
            <div className="kanban-board">
                <div className="column">
                    <h2>À faire</h2>
                    {todos.map((task) => (
                        <div 
                            key={task.id} 
                            className="task" 
                            draggable 
                            onDragEnd={() => handleColumnChange(task.id, "in-progress")}
                        >
                            <button 
                                className="delete-task-btn" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask(task.id);
                                }}
                            >
                                ×
                            </button>
                            <h3 className={`priority-${task.priority}`}>{task.title}</h3>
                            <p className="task-author">Par : {task.author}</p>
                            <p>{task.description}</p>
                        </div>
                    ))}
                </div>
                <div className="column">
                    <h2>En cours</h2>
                    {pending.map((task) => (
                        <div 
                            key={task.id} 
                            className="task" 
                            draggable
                            onDragEnd={() => handleColumnChange(task.id, "done")}
                        >
                            <button 
                                className="delete-task-btn" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask(task.id);
                                }}
                            >
                                ×
                            </button>
                            <h3 className={`priority-${task.priority}`}>{task.title}</h3>
                            <p className="task-author">Par : {task.author}</p>
                            <p>{task.description}</p>
                        </div>
                    ))}
                </div>
                <div className="column">
                    <h2>Terminé</h2>
                    {finished.map((task) => (
                        <div 
                            key={task.id} 
                            className="task" 
                            draggable
                            onDragEnd={() => handleColumnChange(task.id, "todo")}
                        >
                            <button 
                                className="delete-task-btn" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask(task.id);
                                }}
                            >
                                ×
                            </button>
                            <h3 className={`priority-${task.priority}`}>{task.title}</h3>
                            <p className="task-author">Par : {task.author}</p>
                            <p>{task.description}</p>
                        </div>
                    ))}
                </div>
                    <div className = "instructions">
                <h3>Faites glisser la tâche pour changer son status</h3>
                </div>
            </div>
        </>
    );
}

export default Kanban;

function Formulaire({ onAddTask }: { onAddTask: (task: Task) => void }) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const newTask: Task = {
            id: Date.now(),
            author: formData.get("author") as string, 
            title: formData.get("title") as string,
            status: formData.get("status") as string,
            description: formData.get("description") as string,
            date_start: formData.get("date-start") as string,
            date_end: formData.get("date-end") as string,
            priority: formData.get("priority") as string,
        };
        
        onAddTask(newTask);
        event.currentTarget.reset();
    };

    return (
        <div className="task-form-container">
            <h2>Ajouter une tâche</h2>
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titre</label>
                    <input type="text" id="title" name="title" required />
                </div>

                <div className="form-group"> 
                    <label htmlFor="author">Auteur</label>
                    <input type="text" id="author" name="author" defaultValue="User" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" defaultValue="todo">  
                        <option value="todo">À faire</option>
                        <option value="in-progress">En cours</option>
                        <option value="done">Terminé</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="date-start">Date de début</label>
                    <input type="date" id="date-start" name="date-start" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="date-end">Date de fin</label>
                    <input type="date" id="date-end" name="date-end" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="priority">Niveau de priorité</label>
                    <select id="priority" name="priority" defaultValue="medium">  
                        <option value="low">Faible</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                    </select>
                </div>        
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}
