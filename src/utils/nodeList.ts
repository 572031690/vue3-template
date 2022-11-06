// 定义单向链表的节点类
class NodeItem<T> {
    public data: T
    public next: NodeItem<T> | null
    constructor(data: T) {
        this.data = data // 节点的数据域(数据成员)
        this.next = null // 节点的指针域(指针成员)
    }
}
// 单项列表
export class SingleLinked<T> {
    private size: number
    private head: NodeItem<T> | null
    private lastNode: NodeItem<T> | null
    constructor() {
        this.size = 0 // 用记录链表中的节点个数
        this.head = null // 是链表的头指针：记录链表的起始地址
        this.lastNode = null // 用来记录当前最后一个节点
    }

    // 获取链表的长度
    length(): number {
        return this.size
    }

    // 判断链表是否为空
    isEmpty(): boolean {
        return this.size === 0
    }

    push(element: T): void {
        const newNode = new NodeItem(element) // 创建一个新的节点
        if (!this.lastNode)
            this.head = newNode

        else
            this.lastNode.next = newNode

        this.lastNode = newNode // 找到链表的最后一个节点
        this.size++ // 链表的长度加1
    }

    get() {
        const nodeArr = []
        let currentNode: NodeItem<string> | NodeItem<T> | null = this.head // 指向链表的头指针
        while (currentNode) { // 若当前节点不为空
            nodeArr.push(currentNode.data)
            currentNode = currentNode.next // 让指针指向当前节点的下一个节点
        }
        return nodeArr
    }

    clear(fn?: any): void {
        // 1.将每一个next域都置为空，JVM自动回收掉没有引用的节点
        while (this.head !== null) {
            fn(this.head.data)
            const currentNode = this.head.next
            this.head.next = null
            this.head = currentNode
        }
        this.size = 0
    }
    // remove(element:T) {
    //     if('head' === element) {
    //         console.log('整个链表将被删除')
    //         this.head.next = null
    //         this.size = 0
    //         return
    //     }
    //     let currNode = this.head
    //     if(!currNode) return
    //     while(currNode && currNode.next.data !== element) {
    //         currNode = currNode.next
    //     }
    //     currNode.next = currNode.next.next
    //     this.size--
    // }
}
