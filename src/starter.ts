export default class StarterUtil {
  static startAsync (method: () => Promise<void>, errCb: () => Promise<void> = null, exitWhenFinish: boolean = false): void {
    method().then(() => {
      exitWhenFinish && process.exit(0)
    }).catch(async (err) => {
      console.error(err)
      errCb && (await errCb())
    })
  }
}
