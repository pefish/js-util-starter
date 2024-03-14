
export default class StarterUtil {
  static startAsync(
    method: () => Promise<void>,
    errCb: () => Promise<void> = null,
  ): void {
    method().catch(async (err) => {
      console.error(err)
      errCb && (await errCb())
    })
  }
}
