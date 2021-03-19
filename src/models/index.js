import { HTTP } from '../utils/http.js';

class IndexModel extends HTTP {
    getNewsList(field, showCount) {
        return new Promise((resolve, reject) => {
            this.ajax({
                type: 'post',
                data: {
                    field
                },
                dataType: 'JSON',
                url: 'Juhe/getNewsList',
                success: function (data) {
                    let list = data.result.data
                    let newList = [];
                    let index = 0;
                    while (index < list.length) {
                        newList.push(list.slice(index, index += showCount))
                    }
                    // console.log(newList)
                    // 抛出处理好的数据 promise 的用法
                    resolve(newList)
                }
            })

        })

    }
}


export { IndexModel };