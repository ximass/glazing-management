// ** Icon imports
import AccountMultiplePlus from 'mdi-material-ui/AccountMultiplePlus'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import CogOutline from 'mdi-material-ui/CogOutline'
import Cart from 'mdi-material-ui/Cart'
import Cog from 'mdi-material-ui/Cog'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Início',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Cadastros'
    },
    {
      title: 'Usuários',
      icon: AccountMultiplePlus,
      path: '/users',
      openInNewTab: false
    },
    {
      title: 'Grupos',
      icon: AccountMultiplePlus,
      path: '/groups',
      openInNewTab: false
    },
    {
      title: 'Permissões',
      icon: AccountMultiplePlus,
      path: '/permissions',
      openInNewTab: false
    },
    {
      title: 'Clientes',
      icon: AccountGroup,
      path: '/customers',
      openInNewTab: false
    },
    {
      title: 'Pedidos',
      icon: Cart,
      path: '/requests',
      openInNewTab: false
    },
    {
      title: 'Fornecedores',
      icon: AccountGroup,
      path: '/providers',
      openInNewTab: false
    },
    {
      title: 'Compras',
      icon: Cart,
      path: '/purchases',
      openInNewTab: false
    },
    {
      sectionTitle: 'Configurações'
    },
    {
      title: 'Seriais',
      icon: CogOutline,
      path: '/serials',
      openInNewTab: false
    },
    {
      title: 'Categorias',
      icon: Cog,
      path: '/categories',
      openInNewTab: false
    }
  ]
}

export default navigation
