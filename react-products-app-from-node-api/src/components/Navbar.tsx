import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from './Link.tsx'
import { useAuthContext } from '../contexts/AuthContext.tsx'
import LogoutLink from './LogoutLink'
import styles from '../assets/css/navbar.module.css'

const baseUrl = '/src/';
const getStaticUrl = (filename: string) => `${baseUrl}assets/${filename}`;

const navigation = [
  { name: 'Categories', href: '/categories', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {

    const {IsAuth} = useAuthContext()

  return (
    <Disclosure as="nav" className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarInner}>
          <div className={styles.mobileMenuButtonContainer}>
            <DisclosureButton className={styles.mobileMenuButton}>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className={styles.menuIcon} />
              <XMarkIcon aria-hidden="true" className={styles.closeIcon} />
            </DisclosureButton>
          </div>
          <div className={styles.logoNavContainer}>
            <div className={styles.logoContainer}>
                <Link to="/" className={styles.profileMenuItem}><img
                alt="AIShop logo"
                src={ getStaticUrl('logo.svg') }
                className={styles.logo}
              /></Link>
              
            </div>
            <div className={styles.desktopNav}>
              <div className={styles.navList}>
                {navigation.map((item) => (

                    <Link to={item.href}  key={item.name} className={styles.navLink} > {item.name} </Link>
                  
                ))}
              </div>
            </div>
          </div>
          <div className={styles.profileActions}>
            <button type="button" className={styles.notificationButton}>
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className={styles.bellIcon} />
            </button>
            <Menu as="div" className={styles.profileMenu}>
              <div>
                <MenuButton className={styles.profileMenuButton}>
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                    className={styles.profileAvatar}
                  />
                </MenuButton>
              </div>
              <MenuItems className={styles.profileMenuItems}>
                
                {/* <MenuItem>
                  <a href="#" className={styles.profileMenuItem}>Settings</a>
                </MenuItem> */}
                { IsAuth () ? (
                    <>
                        <MenuItem>
                            <Link to="/cart" className={styles.profileMenuItem}>Your Cart</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/profile" className={styles.profileMenuItem}>Your Profile</Link>
                        </MenuItem>
                        <MenuItem>
                            <LogoutLink />{/* <a href="#" className={styles.profileMenuItem}>Sign out</a> */}
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem>
                            <Link to="/login" className={styles.profileMenuItem}>Login</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/register" className={styles.profileMenuItem}>Register</Link>
                        </MenuItem>
                    </>
                )  }
                
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <DisclosurePanel className={styles.mobileNavPanel}>
        <div className={styles.mobileNavList}>
          {navigation.map((item) => (
            // <DisclosureButton
            //   key={item.name}
            //   as="a"
            //   href={item.href}
            //   aria-current={item.current ? 'page' : undefined}
            //   className={classNames(
            //     styles.mobileNavLink,
            //     item.current ? styles.mobileNavLinkActive : ''
            //   )}
            // >
            //   {item.name}
            // </DisclosureButton>
            <Link to={item.href}  key={item.name} className={classNames(
                styles.mobileNavLink,
                item.current ? styles.mobileNavLinkActive : ''
              )} > {item.name} </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbar