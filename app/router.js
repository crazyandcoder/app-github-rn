import React from 'react';
import {
    Scene,
    Router,
    Lightbox,
    Drawer
} from 'react-native-router-flux';
import {screenWidth, drawerWidth} from "./style/index";
import styles from './style';
import BackUtils from './utils/backUtils'
import WelcomePage from "./components/page/WelcomePage";
import LoginPage from "./components/page/LoginPage";
import * as Constant from './common/constant';
import Translate from './style/translates';
import TabIcon from './components/widget/TabIcon';
import ActivityPage from './components/page/ActivityPage';
import TrendPage from './components/page/TrendPage';
import SearchPage from './components/page/SearchPage';
import MyPage from './components/page/MyPage';

const getRouter = () => {
    return (
        <Router
            getSceneStyle={() => {
                return styles.routerStyle
            }}

            backAndroidHandler={
                BackUtils()
            }
        >

            <Lightbox>
                <Scene key="main">
                    <Scene key="WelcomePage" component={WelcomePage} hideNavBar hideTabBar hide/>
                </Scene>

                <Scene key={LoginPage}>
                    <Scene
                        component={LoginPage}
                        showLable={false}
                        hideNavBar
                    />
                </Scene>

                <Scene
                    key="root"
                    navigationBarStyle={styles.navigationBar}
                    titleStyle={{color: Constant.titleTextColor}}>

                    <Scene key="mainTabPage"
                           tabs
                           lazy
                           wrap={false}
                           showLabel={false}
                           tabBarPosition={"bottom"}
                           tabBarStyle={{
                               height: Constant.tabBarHeight,
                               alignItems: 'center',
                               justifyContent: 'center',
                               backgroundColor: Constant.tabBackgroundColor
                           }}>

                        <Scene key="ActivityPage"
                               component={ActivityPage}
                               icon={TabIcon}
                               title={Translate.transaction.en.tabActivity}
                               tabIconName={'tabDynamic'}
                        />


                        <Scene key="TrendPage"
                               component={TrendPage}
                               icon={TabIcon}
                               title={Translate.transaction.en.tabTrend}
                               tabIconName={'tabDynamic'}
                        />


                        <Scene key="SearchPage"
                               component={SearchPage}
                               icon={TabIcon}
                               title={Translate.transaction.en.tabSearch}
                               tabIconName={'tabDynamic'}
                        />

                        <Scene key="MyPage"
                               component={MyPage}
                               icon={TabIcon}
                               title={Translate.transaction.en.tabMy}
                               tabIconName={'tabDynamic'}
                        />
                    </Scene>

                </Scene>
            </Lightbox>
        </Router>
    )
}

export default getRouter;