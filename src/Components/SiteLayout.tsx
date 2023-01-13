import { FC, useEffect, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import {
    SearchOutlined,
    LogoutOutlined,
    HomeOutlined,
    DatabaseOutlined,
} from '@ant-design/icons';
import "../styles.css"
import cmhg_logo from "../cmhg_logo.png"

export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
): MenuItem {
    return {
        key,
        icon,
        label,
    } as MenuItem;
}

type Props = {
    child: JSX.Element[];
    handleContent: (e: MenuItem) => void;
}

const SiteLayout: FC<Props> = ({ child, handleContent }) => {

    const [collapsed, setCollapsed] = useState(false);
    const [padLeft, setPadLeft] = useState("200px");
    const { Content, Sider } = Layout;
    const [fontSize, setFontSize] = useState("small");
    const menuItems: MenuItem[] = [
        getItem('Main Menu', '1', <HomeOutlined />),
        getItem('Query', '2', <DatabaseOutlined />),
        getItem('Prediction', '3', <SearchOutlined />),
        getItem('Log Out', '4', < LogoutOutlined />),
    ]
    useEffect(() => {

        if (collapsed) {
            setFontSize("small")
            setPadLeft("80px")
        } else {
            setFontSize("xx-large")
            setPadLeft("200px")
        }
    }, [collapsed]);
    return (
        <Layout className="content" style={{ minHeight: '100vh' }}>
            <Layout>
                <Sider style={{ height: "100vh", position: "fixed" }} theme={"dark"} collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    <div className="image-wrapper"><img id="cmhg-logo" src={cmhg_logo} alt="cmhg-logo" /></div>
                    <div className="menu-top-header" style={{ fontSize: fontSize }}>CMHG</div>
                    <Menu theme={"dark"} onClick={handleContent} defaultSelectedKeys={['1']} mode="inline" items={menuItems}
                    />
                </Sider>
                <Layout className="site-layout" style={{ paddingLeft: padLeft, transition: "all .2s" }}>
                    <Content >
                        {child}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default SiteLayout;