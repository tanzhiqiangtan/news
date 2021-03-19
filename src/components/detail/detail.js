import tpl from './detail.tpl';
import './detail.scss';
import tools from '../../utils/tools.js'
export default () => {
    return {
        name: 'detail',
        tpl(url) {
            return tpl().replace(tools.tplReplace(), url)
        }

    }
}