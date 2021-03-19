import '../scss/collections.scss';
import Header from '../components/header/index'
import NewsItem from '../components/newsItem/newsItem'
import Collect from '../components/collect/collect'
import tools from '../utils/tools'
const header = Header();
const newsItem = NewsItem();
const collect = Collect();
const App = ($) => {
    const $app = $('#app');
    const $list = $app.children()
    let newsList;
    let collectionData;

    const init = () => {
        getLocalstorage();
        render().then(bindEvent);

    }
    const render = () => {
        return new Promise((resolve, reject) => {
            _renderHeader();
            _renderNewsList();
            resolve()
        })
    }
    const bindEvent = () => {
        $list.on('click', '.news_item', handleClick)
    }
    function handleClick() {
        let index = $(this).attr('data-index')
        localStorage.setItem('target', JSON.stringify(newsList[index]))
        location.href = 'detail.html'
    }
    const _renderHeader = () => {
        $app.append(header.tpl({
            title: '我的收藏',
            showIconLeft: true,
            showIconRight: false
        }))
    }
    // 获取数据
    //获取localstorage的收藏数据
    function getLocalstorage() {
        collectionData = JSON.parse(localStorage.getItem('collections')) || {};
        newsList = Object.values(collectionData);
    }
    const _renderNewsList = () => {
        if (!collectionData || Object.keys(collectionData).length == 0) {
            let NodeStr = collect.tpl();
            $app.append(NodeStr);
        } else {
            let NodeStr = newsItem.tpl(newsList)
            $list.append(NodeStr);
        }

        lazyLoadPic()
    }
    //lazy load pic 
    function lazyLoadPic() {
        tools.picShow($('.pic_show'))
    }
    init()
}

App($)