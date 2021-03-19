import '../scss/detail.scss';
import Header from '../components/header/index';
import Detail from '../components/detail/detail';
import Star from '../components/star/star';
import tools from '../utils/tools'
const detail = Detail();
const header = Header();
const star = Star();
const App = ($) => {
    const $app = $('#app');
    let URL = window.location.href;
    let params = tools.queryURLParams(URL);
    let target = JSON.parse(localStorage.getItem('target'));

    let uniquekey = params.uniquekey || target.uniquekey;
    let url = params.rul || target.url
    let isfull = false;
    let collectionData;
    const init = () => {
        initStorageData()
        isCollections()
        render().then(bindEvent)
    }
    const render = () => {
        return new Promise((resolve, reject) => {
            _renderHeader()
            _renderDetail()
            _renderStar(isfull)
            resolve()
        })
    }
    //绑定事件
    const bindEvent = () => {
        $('.star').on('click', handleCollections)
    }
    //初始化存储数据
    function initStorageData() {
        getLocalstorage()
        if (!collectionData) {
            collectionData = {}
            setLocalstorage()
        }
    }
    //获取localstorage的收藏数据
    function getLocalstorage() {
        collectionData = JSON.parse(localStorage.getItem('collections'))
    }
    //设置localstorage的收藏数据
    function setLocalstorage() {
        localStorage.setItem('collections', JSON.stringify(collectionData))
    }
    //判断是否收藏
    function isCollections() {
        isfull = collectionData.hasOwnProperty(uniquekey) ? true : null


    }
    //
    //collections: {uk:{},uk:{}}
    // 点击星星
    function handleCollections() {
        //let uniquekey = params.uniquekey
        let uni_data = localStorage.getItem('target')
        if (!isfull) {
            getLocalstorage()
            collectionData[uniquekey] = JSON.parse(uni_data)
            setLocalstorage()
            $(this).addClass('full')
            isfull = true
        } else {
            getLocalstorage()
            delete collectionData[uniquekey]
            setLocalstorage()
            $(this).removeClass('full')
            isfull = false
        }
    }
    const _renderHeader = () => {
        $app.append(header.tpl({
            title: '新闻详情',
            showIconLeft: true,
            showIconRight: false
        }))
    }
    const _renderDetail = () => {
        $app.append(detail.tpl(url))
    }
    const _renderStar = (isfull) => {
        $app.append(star.tpl(isfull))
    }

    init()
}

App($)