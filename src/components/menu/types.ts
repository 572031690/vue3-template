export interface listTypeTs {
    hidden: boolean, //菜单是否隐藏
    label: string, //菜单名称
    code: string, //菜单code，唯一
    id: string, //菜单id，唯一
    subs: listTypeTs[] //子菜单
}