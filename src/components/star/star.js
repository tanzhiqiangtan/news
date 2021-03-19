import tpl from './star.tpl';
import './star.scss';
import tools from '../../utils/tools.js'

export default () => {
    return {
        name: 'star-icon',
        tpl(isfull) {
            return tpl().replace(tools.tplReplace(), isfull ? 'full' : '')
        }
    }
}

