import { Menu } from "antd"
import { HomeOutlined, ProductOutlined, UnorderedListOutlined, AuditOutlined, BarcodeOutlined, ShoppingOutlined, TeamOutlined, ShoppingCartOutlined, WalletOutlined } from "@ant-design/icons"
import { useNavigate, useLocation } from "react-router-dom"

const items = [
  {
    key: '/',
    label: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    key: 'product',
    label: 'Product',
    icon: <ProductOutlined />,
    children: [
      {
        key: '/product',
        label: 'Product List',
        icon: <UnorderedListOutlined />,
      },
      {
        key: '/stock',
        label: 'Stock Report',
        icon: <AuditOutlined />,
      }
    ]
  },
  {
    key: '/billing',
    label: 'Billing',
    icon: <BarcodeOutlined />,
  },
  {
    key: '/purchase',
    label: 'Purchase',
    icon: <ShoppingOutlined />,
  },
  {
    key: 'traders',
    label: 'Traders',
    icon: <TeamOutlined />,
    children: [
      {
        key: '/buyer',
        label: 'Buyers',
        icon: <WalletOutlined />,
      },
      {
        key: '/vendor',
        label: 'Vendors',
        icon: <ShoppingCartOutlined />,
      },
    ]
  },
]

function SideMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const base = location.pathname;
  const first = base?.split('/')[1];

  return (
    <Menu defaultOpenKeys={['product', 'traders']} selectedKeys={[base || '/', first, '/' + first]} items={items} theme="dark" mode="inline" onClick={({ key }) => navigate(key)} />
  )
}

export default SideMenu