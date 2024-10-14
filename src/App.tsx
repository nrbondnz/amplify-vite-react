import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

// Generate client with Schema
const client = generateClient<Schema>();

function App() {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
    const [muscles, setMuscles] = useState<Array<Schema["Muscle"]["type"]>>([]);
    const { user, signOut } = useAuthenticator();

    useEffect(() => {
        if (client.models.Todo && client.models.Muscle) {
            const todoSubscription = client.models.Todo.observeQuery().subscribe({
                next: (data) => setTodos([...data.items]),
            });

            const muscleSubscription = client.models.Muscle.observeQuery().subscribe({
                next: (data) => setMuscles([...data.items]),
            });

            // Cleanup subscriptions on unmount
            return () => {
                todoSubscription.unsubscribe();
                muscleSubscription.unsubscribe();
            };
        } else {
            console.error('Model definitions for Todo or Muscle are not available.');
        }
    }, []);

    function createTodo() {
        const content = window.prompt("Todo content");
        if (content) {
            client.models.Todo.create({ content });
        }
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({ id });
    }

    return (
        <main>
            <h1>{user?.signInDetails?.loginId}'s todos</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {todos.map(todo => (
                    <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
                        {todo.content}
                    </li>
                ))}
            </ul>
            <h2>Muscles</h2>
            <ul>
                {muscles.map(muscle => (
                    <li key={muscle.id}>
                        {muscle.name} ({muscle.group})
                    </li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br/>
                <a href="https://docs.amplify.aws/react/start/quickstart/">Review next step of this tutorial.</a>
            </div>
            <button onClick={signOut}>Sign out</button>
        </main>
    );
}

export default App;