import tpl0 from './tpl/tpl0.tpl';
import tpl1 from './tpl/tpl1.tpl';
import tpl2 from './tpl/tpl2.tpl';
import tpl3 from './tpl/tpl3.tpl';
import tools from '../../utils/tools'
import './newsItem.scss';

export default () => {
    return {
        name: 'newsItem',
        tpl(newList, pageNum) {
            let str = '';
            newList.forEach((item, index) => {
                let tpl;
                if (item.hasOwnProperty('thumbnail_pic_s03')) {
                    tpl = tpl3();
                } else if (item.hasOwnProperty('thumbnail_pic_s02')) {
                    tpl = tpl2();
                } else if (item.hasOwnProperty('thumbnail_pic_s')) {
                    tpl = tpl1();
                } else {
                    tpl = tpl0();
                }
                str += tpl.replace(tools.tplReplace(), ($0, $1) => {
                    return {
                        pageNum: pageNum,
                        index: index,
                        title: item.title,
                        pic1: item.thumbnail_pic_s,
                        pic2: item.thumbnail_pic_s02,
                        pic3: item.thumbnail_pic_s03,
                        author: item.author_name,
                        date: item.date,
                        uniquekey: item.uniquekey,
                        url: item.url
                    }[$1]
                })
            })
            return str
        }
    }
}