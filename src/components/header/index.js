import tpl from './index.tpl';
import './index.scss'
import tools from '../../utils/tools.js'
export default () => {
    return {
        name: 'header',
        tpl(option) {
            return tpl().replace(tools.tplReplace(), ($0, $1) => {
                return {
                    title: option.title,
                    showIconLeft: option.showIconLeft || 'none',
                    showIconRight: option.showIconRight || 'none'
                }[$1]
            })
        }
    }
}