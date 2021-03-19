import nav from './nav.tpl';
import navItem from './navitem.tpl';
import './nav.scss'
import tools from '../../utils/tools.js'

export default () => {
    return {
        name: 'nav',
        tpl(newsType) {
            let navwrapperW = (newsType.length * 6) + 'rem'
            let navStr = nav().replace(tools.tplReplace(), navwrapperW)
            let navItemStr = '';
            newsType.forEach((item, index) => {
                navItemStr += navItem().replace(tools.tplReplace(), ($0, $1) => {
                    return {
                        isCurrent: index === 0 ? 'current' : '',
                        type: item.type,
                        typeName: item.chs
                    }[$1]
                })
            })
            return {
                navStr,
                navItemStr
            }
        }
    }
}