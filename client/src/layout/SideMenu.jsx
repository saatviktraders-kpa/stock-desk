import { Menu } from "antd"
import { HomeOutlined, ProductOutlined, FundOutlined } from "@ant-design/icons"
import { useNavigate, useLocation } from "react-router-dom"

const items = [
  {
    key: '/',
    label: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    key: 'product',
    label: 'Products',
    icon: <ProductOutlined />,
  },
  {
    key: 'billing',
    label: 'Billing',
    icon: <FundOutlined />,
  },
]

function SideMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = items.find(i => location.pathname.split('/')?.[1] === i.key);

  return (
    <Menu selectedKeys={[(activeKey?.key || '/')]} items={items} theme="dark" mode="inline" onClick={({ key }) => navigate(key)} />
  )
}

export default SideMenu