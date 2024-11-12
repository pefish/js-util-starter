import StartUtil from "../src/starter";

async function workerTask(taskName, signal) {
  console.log(`${taskName} started`);

  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (signal.aborted) {
        console.log(`${taskName} received abort signal`);
        // clearInterval(interval);
        // resolve(0);
      } else {
        console.log(`${taskName} is working...`);
      }
    }, 1000);
  });
}

StartUtil.startAsync(
  async (signal) => {
    const task1 = workerTask("Task1", signal);
    const task2 = workerTask("Task2", signal);

    await Promise.all([task1, task2]); // 等待所有任务退出
    console.log("All tasks exited");
  },
  async (err: Error) => {
    console.log("exited", err);
  }
);
