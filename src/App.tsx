
import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "amplify/data/resource";
import outputs from "./../amplify_outputs.json";
Amplify.configure(outputs)


const client = generateClient<Schema>();

function App() {
    //const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
    
    const [events, setEvents] = useState<Schema["events"]["type"][]>([])
    useEffect(() => {
        const sub = client.models.events.observeQuery().subscribe({
            next: (data) => {
                setEvents([...data.items])
            }
        })
        return () => sub.unsubscribe()
    }, [])
    const [_notes, _setNotes] = useState<Schema["notes"]["type"][]>([])
    useEffect(() => {
        const sub = client.models.events.observeQuery().subscribe({
            next: (data) => {
                setEvents([...data.items])
            }
        })
        return () => sub.unsubscribe()
    }, [])
    const { user, signOut } = useAuthenticator();

    useEffect(() => {
        console.log("client.models:", client.models);
        console.log("client.models.notes: ", client.models.notes);
        console.log("notes.list: ", client.models.notes.list);
        console.log("client.models.events: ", client.models.events);
        console.log("events.list: ", client.models.events.list);
        if (client.models.events || client.models.events) {
            const eventsSubscription = client.models.events.observeQuery().subscribe({
                next: (data) => setEvents([...data.items]),
            });

            /*const muscleSubscription = client.models.muscles?.observeQuery().subscribe({
                next: (data) => setMuscles([...data.items]),
            });*/

            // Cleanup subscriptions on unmount
            return () => {
                eventsSubscription.unsubscribe();
                //muscleSubscription.unsubscribe();
            };
        } else {
            console.error('Model definitions for Todo or Muscle are not available.');
        }
    }, []);

    function createEvents() {
        const content = window.prompt("Todo content");
        if (content) {
            client.models.events.create({ id:10, geom:"test", name: content });
        }
    }

    function deleteEvent(id: number) {
        client.models.events.delete({ id });
    }

    return (
        <main>
            <h1>{user?.signInDetails?.loginId}'s todos</h1>
            <button onClick={createEvents}>+ new</button>
            <ul>
                {events.map(todo => (
                    <li onClick={() => deleteEvent(todo.id)} key={todo.id}>
                        {todo.name}
                    </li>
                ))}
            </ul>
           
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br/>
                <a href="https://docs.amplify.aws/react/start/quickstart/">Review next step of this tutorial.</a>
            </div>
            (
            <>
                <h1>Events</h1>
                <ul>
                    {events?.map(note => (
                        <li key={note.id} onClick={async () => {
                            await client.models.events.delete({ id: note.id })
                        }}>
                            <div>{note.name}</div>
                        </li>
                    ))}
                </ul>
                <button onClick={async () => {
                    const res = window.prompt("New note?");
                    await client.models.events.create({id: 16, geom: "fred", name: res!})
                }}>Create Muscle</button>
            </>
            )
            <button onClick={signOut}>Sign out</button>
        </main>
    );
}

export default App;