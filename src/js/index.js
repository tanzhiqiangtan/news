import "babel-polyfill";
import '../scss/index.scss';
import Header from '../components/header/index';
import Nav from '../components/nav/nav';
import { news_type } from '../utils/data';
import tools from '../utils/tools'
import { IndexModel } from '../models/index';
import NewsItem from '../components/newsItem/newsItem'
import PageLoading from '../components/page_loading/page_loading.js'
import BottomTip from '../components/bottom_tip/bottomTip'
//获取组件对象
const header = Header(),
    nav = Nav(),
    newsItem = NewsItem(),
    page_loading = PageLoading(),
    bottomTip = BottomTip();
// 实列化首页数据实列
const indexModel = new IndexModel();


const App = ($) => {
    const $app = $('#app');
    const $list = $app.children('.list');
    const newScrollToButtom = tools.scrollToButtom.bind(null, loadingMoreNews)
    //当前nav选择的新闻类型

    let field = news_type[0].type;
    let showCount = 10;
    let pageNum = 0;
    let newsData = [];
    let lock = false;
    //缓存数据
    let cache_data = {};
    // {top:[[][]][],xinwen:[[][]][],}
    const init = () => {
        render(field, showCount, pageNum).then(bindEvent)

    }
    const render = () => {
        return new Promise((resolve, reject) => {
            _renderHeader()
            _renderNav()
            _renderPageLoading()
            getList(field, showCount, pageNum).then(() => {
                resolve()
            })
        })
    }
    //获取新闻列表数据
    const getList = async (field, showCount, pageNum) => {
        //先拿新闻列表的数据
        let listData = [];
        if (cache_data[field]) {
            listData = cache_data[field][pageNum]
        } else {
            listData = await indexModel.getNewsList(field, showCount);
            cache_data[field] = listData
            listData = listData[pageNum]
            console.log(listData)
        }

        _renderNewsItem('cover', listData, pageNum)
        scrollButtom()


    }
    function scrollButtom() {
        $(window).on('scroll', newScrollToButtom)

    }
    function loadingMoreNews() {
        console.log(1)
        if (pageNum < 2) {
            if (!lock) {
                lock = true
                pageNum++
                console.log('pagenum', pageNum)
                _renderBottomTip(true, '正在加载信息')
                console.log(cache_data[field][pageNum])

                setTimeout(() => {
                    $('.bottom').remove()
                    _renderNewsItem('append', cache_data[field][pageNum], pageNum)
                }, 1000);
            }

        } else {

            if (!lock) {
                console.log('xia')
                $('.bottom').remove()
                _renderBottomTip(false, '已加载完毕。。')

            }
        }
    }
    //绑定事件中心
    const bindEvent = () => {
        console.log(2)
        //nav事件代理
        $('.navwrapper').on('click', '.navitem', navSelectEvent)
        $('.list').on('click', '.news_item', toDetail)
    }
    //跳转详情
    function toDetail() {
        console.log(this)
        let $this = $(this);
        let uniquekey = $this.attr('data-uniquekey');
        let url = $this.attr('data-url');
        let index = $this.attr('data-index');
        let pageNum = $this.attr('data-pageNum');
        console.log(cache_data)
        console.log(cache_data[field][pageNum][index])
        localStorage.setItem('target', JSON.stringify(cache_data[field][pageNum][index]))
        window.location.href = `detail.html?uniquekey=${uniquekey}&url=${url}`;
    }
    //header组件
    const _renderHeader = () => {
        $app.append(header.tpl({
            title: 'JS++新闻头条',
            showIconLeft: false,
            showIconRight: true
        }))
    }
    //nav组件
    const _renderNav = () => {
        let tpls = nav.tpl(news_type)
        $app.append(tpls.navStr)
        $('.nav .navwrapper').append(tpls.navItemStr)
    }
    //newsItem组件
    const _renderNewsItem = (method, newsData, pageNum) => {
        let newsItemStr = newsItem.tpl(newsData, pageNum)
        if (method === 'cover') {
            $list.html(newsItemStr)
            setTimeout(() => {
                document.documentElement.scrollTop = 0
            }, 150);
        } else {
            $list.append(newsItemStr)
            lock = false;
        }
        afterReder()

    }
    const afterReder = () => {
        tools.picShow($('.pic_show'))
    }
    //绚烂页面PageLoading组件
    const _renderPageLoading = () => {
        $list.html(page_loading.tpl())
    }
    //渲染底部提示组件
    const _renderBottomTip = (boolean, info) => {
        const bottomTipDom = bottomTip.tpl({
            loading: boolean,
            bottemInfo: info
        })
        $list.append(bottomTipDom)

    }
    //nav组件加点击事件
    function navSelectEvent(e) {
        //接触滚动绑定
        lock = false
        $(window).off('scroll', newScrollToButtom)
        field = this.getAttribute('data-type');
        pageNum = 0
        _renderPageLoading()
        getList(field, showCount, pageNum)
        //切换当前点击的样式
        $(this).addClass('current').siblings().removeClass('current');
    }



    init()
}

App($)
