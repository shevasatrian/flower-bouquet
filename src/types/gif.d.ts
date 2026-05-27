declare module "gif.js" {
  interface GIFOptions {
    workers?: number;
    quality?: number;
    width?: number;
    height?: number;
    workerScript?: string;
    repeat?: number;
    background?: string;
    transparent?: number | null;
    dither?: boolean | string;
  }

  interface FrameOptions {
    delay?: number;
    copy?: boolean;
    dispose?: number;
  }

  class GIF {
    constructor(options?: GIFOptions);
    addFrame(
      image: HTMLCanvasElement | CanvasRenderingContext2D | ImageData,
      options?: FrameOptions
    ): void;
    render(): void;
    abort(): void;
    on(event: "start", callback: () => void): void;
    on(event: "progress", callback: (percent: number) => void): void;
    on(event: "finished", callback: (blob: Blob, data: Uint8Array) => void): void;
    on(event: "error", callback: (error: Error) => void): void;
    on(event: "abort", callback: () => void): void;
  }

  export = GIF;
}
