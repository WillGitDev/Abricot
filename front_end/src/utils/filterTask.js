export function filterTask(tasks, search) {
    const searchWord = search.trim().toLowerCase();
    if (!searchWord) {
        return tasks;
    }
    return tasks.filter((task) => {
        return (
            task.title.toLowerCase().includes(searchWord) ||
            task.description.toLowerCase().includes(searchWord)
        );
    });
}
