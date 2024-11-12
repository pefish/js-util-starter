export default class StarterUtil {
  static startAsync(
    method: (abortSignal: AbortSignal) => Promise<void>,
    onExit?: (err: Error) => Promise<void>
  ): void {
    let shutDownCount = 0;
    const abortController = new AbortController();

    method(abortController.signal)
      .then(() => {
        onExit && onExit(null);
        process.exit(0);
      })
      .catch((err: Error) => {
        console.error(err);
        onExit && onExit(err);
        process.exit(1);
      });

    const cleanupAndExit = () => {
      if (shutDownCount > 3) {
        return;
      }
      if (shutDownCount < 3) {
        abortController.abort("Ctrl C");
        console.log(`Got interrupt, exiting... ${3 - shutDownCount}`);
        return;
      }
      console.log(`Got interrupt, exiting...`);
      onExit && onExit(null);
      process.exit(0);
    };

    process.on("SIGINT", () => {
      shutDownCount++;
      console.log("Received SIGINT (Ctrl+C). Cleaning up...");
      cleanupAndExit();
    });

    process.on("SIGTERM", () => {
      shutDownCount++;
      console.log("Received SIGTERM. Cleaning up...");
      cleanupAndExit();
    });
  }
}
