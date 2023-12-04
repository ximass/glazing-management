// ** Next Imports
import Head from 'next/head'
import { useState, SyntheticEvent, Fragment } from 'react'
import { Router, useRouter } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useSession, getSession } from "next-auth/client"


//import { SessionProvider } from "next-auth/react"

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { React } from 'mdi-material-ui'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}


const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const router = useRouter();

  const session = getSession();

  session.then(response => {
    if(!response?.accessToken && router.pathname !== "/auth/login")
    {
      router.push("/auth/login");
    }
    else if(router.pathname == "/categories")
    {
      /*
      Validar se o usuário tem acesso a essa rota aqui
      */
    }
    else if(router.pathname == "/serials")
    {
      /*
      Validar se o usuário tem acesso a essa rota aqui
      */
    }
    else if(router.pathname == "/requests")
    {
      /*
      Validar se o usuário tem acesso a essa rota aqui
      */
    }
    else if(router.pathname == "/customers")
    {
      /*
      Validar se o usuário tem acesso a essa rota aqui
      */
    }
    else if(router.pathname == "/permissions")
    {
      /*
      Validar se o usuário tem acesso a essa rota aqui
      */
    }
    else if(router.pathname == "/groups")
    {
      /*
      Validar se o usuário tem acesso a essa rota aqui
      */
    }
    else if(router.pathname == "/users")
    {
      /*
      Validar se o usuário tem acesso a essa rota aqui
      */
    }
  });



  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Glazing management</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
