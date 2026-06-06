export function sortTasksByStatus(tasks) {
  return Object.groupBy(tasks, (task) => task.status);
}
