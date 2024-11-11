export default class StarterUtil {
  static startAsync(method: () => Promise<void>): void {
    method().catch((err) => {
      console.error(err);
      process.exit(1);
    });
  }
}
