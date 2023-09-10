// ** Icon imports
import AccountMultiplePlus from 'mdi-material-ui/AccountMultiplePlus'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Grupos',
      icon: AccountGroup,
      path: '/groups',
      openInNewTab: true
    },
    {
      title: 'Permissões',
      icon: AccountMultiplePlus,
      path: '/permissions',
      openInNewTab: true
    },
  ]
}

export default navigation
