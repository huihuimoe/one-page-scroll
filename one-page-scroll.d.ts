declare namespace OnePageScroll {
  export interface OnePageScrollOption {
    el: NodeListOf<HTMLElement> | ArrayLike<HTMLElement> | HTMLElement[]
    time?: number
    easing?: string
    loop?: boolean
    throttling?: number
  }
  class OnePageScroll {
    constructor(option: OnePageScrollOption)
    goto(n: number): OnePageScroll
    next(): OnePageScroll
    prev(): OnePageScroll
    private handleEvent(e: Event): void
    private _goto(e: number): OnePageScroll
    time: number
    easing: string
    loop: boolean
    pageTotal: number
    active: number
    private _el: HTMLElement[]
    private _hash: string | number
  }
}

declare const onePageScroll: OnePageScroll.OnePageScroll
export = onePageScroll
