import tpl from './bottomTip.tpl';
import './bottomTip.scss'
import tools from '../../utils/tools'
export default () => {
    return {
        name: 'bottomTip',
        tpl(option) {
            return tpl().replace(tools.tplReplace(), ($0, $1) => {
                return {
                    loading: option.loading ? 'loading' : '',
                    bottemInfo: option.bottemInfo
                }[$1]
            })
        }
    }
}
