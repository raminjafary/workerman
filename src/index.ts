/**
 *  Creates a new inline worker
 *  @class
 *  @public
 */
export class Workerman {
  id: number = 0
  prosmiseKeeper: any = {}
  script: string = ''
  worker: Worker
  constructor(private asyncFn: any) {
    this.createScriptToComunicateWithWorker()
    this.createAndStartWorker()
  }

  createScriptToComunicateWithWorker() {
    this.script =
      '$=' +
      this.asyncFn +
      ';onmessage=' +
      ((e: any) => {
        Promise.resolve(e.data[1])
          //@ts-expect-error type
          .then((fn: any) => $.apply($, fn))
          .then(
            (transferable: string) => {
              postMessage(
                [e.data[0], 0, transferable],
                ([transferable] as any).filter(
                  (x: ArrayBuffer | any) =>
                    x instanceof ArrayBuffer ||
                    x instanceof MessagePort ||
                    (self.ImageBitmap && x instanceof ImageBitmap)
                )
              )
            },
            (error: any) => postMessage([e.data[0], 1, '' + error], null)
          )
      })
  }

  createAndStartWorker() {
    const workerURL = URL.createObjectURL(new Blob([this.script]))
    this.worker = new Worker(workerURL)
    this.worker.addEventListener('message', (e: any) => {
      this.prosmiseKeeper[e.data[0]][e.data[1]](e.data[2])
      this.prosmiseKeeper[e.data[0]] = null
    })
  }

  proxy(...args: any) {
    const _this = this
    return new Promise(function (...c) {
      _this.prosmiseKeeper[++_this.id] = c
      _this.worker.postMessage(
        [_this.id, args],
        args.filter(
          (x: ArrayBuffer | any) =>
            x instanceof ArrayBuffer ||
            x instanceof MessagePort ||
            (self.ImageBitmap && x instanceof ImageBitmap)
        )
      )
    })
  }
}
