import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-4 space-y-4">
      <h1 className="text-2xl font-bold">To-Do List</h1>
      <div className="flex gap-2">
        <Input
          placeholder="Add a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-black"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <Card key={todo.id}>
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.completed ? "line-through text-muted-foreground" : ""}>
                  {todo.text}
                </span>
              </div>
              <Button variant="ghost" onClick={() => deleteTodo(todo.id)}>
                ❌
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

export default App;
