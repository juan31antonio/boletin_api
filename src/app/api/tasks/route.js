let tasks = [
    { "id": 1, "title": "Estudiar React", "completed": false },
    { "id": 2, "title": "Leer documentación de Next.js", "completed": true }
]
  

export async function GET() {
    return new Response(
      JSON.stringify(tasks),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
}

export async function POST(request) {
    const body = await request.json();
    const newTask = { id: tasks.length + 1,
                        title: body.title,
                        completed: false };
    tasks.push(newTask);

    return new Response(
      JSON.stringify(newTask),
      { headers: { "Content-Type": "application/json" } }
    );
}

export async function PUT(request) {
    const body = await request.json();
    const { id } = body;
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        return new Response(
            JSON.stringify(task),
            { headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function DELETE(request) {
    const body = await request.json();
    const { id } = body;
    tasks = tasks.filter(task => task.id !== id);
    return new Response(
        JSON.stringify(tasks),
        { headers: { "Content-Type": "application/json" } }
    );
}
