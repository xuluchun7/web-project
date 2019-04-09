import constant from '../lang/zh/constant';
/**
 *
 * @param key 格式化性别
 */
export function sex(key: string) {
    let it = constant.sex.find((item: any) => {
        return item.key === key;
    });
    return it === undefined ? '' : it.value;
}
/**
 *
 * @param key 格式化布尔
 */
export function boolean(key: string) {
    let it = constant.boolean.find((item: any) => {
        return item.key === key;
    });
    return it === undefined ? '' : it.value;
}
