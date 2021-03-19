import tpl from './page_loading.tpl'
import './page_loading.scss'
export default () => {
    return {
        name: 'page_loading',
        tpl() {
            return tpl()
        }
    }

}
