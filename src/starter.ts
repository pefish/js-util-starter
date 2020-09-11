export default class StarterUtil {
  static startAsync (method: () => Promise<void>, exitWhenFinish: boolean = true, errCb: () => Promise<void> = null): void {
    method().then(() => {
      exitWhenFinish && process.exit(0)
    }).catch(async (err) => {
      console.error(err)
      errCb && (await errCb())
      exitWhenFinish && process.exit(0)
    })
  }
}
