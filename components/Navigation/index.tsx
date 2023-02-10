import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, MouseEvent, useEffect, useState } from 'react'

import Button from 'components/Button'
import Icon from 'components/Icon'
import Text from 'components/Text'

import useBreakpointDetect from 'hooks/useBreakpointDetect'

import Lenis from 'utils/scroll'

import styles from './styles.module.scss'

interface INavigation {
  className?: string
  logo: ILink
  list: Array<IItem>
}

interface IItem {
  link: ILink
}

interface ILink {
  title: string,
  url: string
}

const Navigation: FC<INavigation> = ({
  className,
  logo,
  list
}): JSX.Element => {
  const { isPhone } = useBreakpointDetect()

  const [isActive, setIsActive] = useState<boolean>(false)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)

  const route = useRouter()

  useEffect(() => {
    Lenis?.on('scroll', ({ scroll }: { scroll: number }) => {
      setIsScrolling(scroll > 1)
    })
  }, [])

  const onClick = () => setIsActive(!isActive)
  const onLinkClick = (event: MouseEvent) => {
    const element = event.target as HTMLLinkElement

    if (element.classList.contains(styles['link--active'])) {
      Lenis?.scrollTo(0)
    }
  }

  const [routePath] = route.asPath.split('#')

  return (
    <nav
      className={classNames(
        'Navigation',
        styles.element,
        isScrolling && styles['element--scrolling'],
        className
      )}
    >
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <Link
            className={styles.logo}
            href={logo.url}
            scroll={false}
          >
            <Icon
              className={styles.icon}
              icon="Yuri"
            />

            {logo.title}
          </Link>

          <Text
            className={classNames(
              styles.list,
              isActive && styles['list--active']
            )}
            tag="ul"
            type="text-16"
          >
            {list.map(({ link }: IItem, index: number) => {
              const isPresent = link.url.includes(routePath)
              const isActive = routePath === '/' ? link.url === '/' : isPresent

              return (
                <li
                  className={styles.item}
                  key={index}
                >
                  {index === list.length - 1 ? (
                    <Button
                      className={styles.contact}
                      href={link.url}
                      text={link.title}
                    />
                  ) : (
                    <Link
                      className={classNames(
                        styles.link,
                        isActive && styles['link--active']
                      )}
                      href={link.url}
                      onClick={onLinkClick}
                      scroll={false}
                    >
                      <span className={styles.text}>
                        <span className={styles.text__original}>
                          {link.title}
                        </span>

                        <span className={styles.text__hover}>
                          {link.title}
                        </span>
                      </span>
                    </Link>
                  )}
                </li>
              )
            })}
          </Text>

          {isPhone && (
            <Button
              className={styles.button}
              onClick={onClick}
              tag="button"
              text="Menu"
            />
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
