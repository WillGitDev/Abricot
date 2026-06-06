const PRIORITY_SCORES = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

export function sortTasksByPriority(tasks) {
  if (!tasks || tasks.length === 0) return [];

  const tasksSort = tasks.sort((a, b) => {
    const taskA = PRIORITY_SCORES[a.priority] ?? 0;
    const taskB = PRIORITY_SCORES[b.priority] ?? 0;
    return taskB - taskA;
  });
  return tasksSort;
}
